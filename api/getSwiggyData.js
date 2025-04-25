// File: api/getSwiggyData.js (Updated with better logging)
// Purpose: Proxy for Swiggy's main page data (restaurants, categories)

const fetch = require('node-fetch');

const DEFAULT_LAT = "17.7517346";
const DEFAULT_LNG = "83.2178529";

export default async function handler(request, response) {
  const lat = request.query.lat || DEFAULT_LAT;
  const lng = request.query.lng || DEFAULT_LNG;
  const swiggyApiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  console.log(`[Proxy: getSwiggyData] Function called for URL: ${request.url}`); // Log which URL triggered this
  console.log(`[Proxy: getSwiggyData] Fetching from Swiggy URL: ${swiggyApiUrl}`);

  try {
    const res = await fetch(swiggyApiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'accept': 'application/json',
        // 'Origin': 'https://www.swiggy.com', // Keep commented unless needed
        // 'Referer': 'https://www.swiggy.com/', // Keep commented unless needed
      }
    });

    // Log Swiggy's response status BEFORE checking 'ok'
    console.log(`[Proxy: getSwiggyData] Received status from Swiggy: ${res.status}`);

    // Get the raw response body as text REGARDLESS of status code
    // This helps debug cases where Swiggy sends HTML with a 200 OK status
    const rawText = await res.text();
    console.log(`[Proxy: getSwiggyData] Raw text received from Swiggy (first 500 chars): ${rawText.slice(0, 500)}`);

    // Now check if Swiggy's response status was actually OK
    if (!res.ok) {
      console.error(`[Proxy: getSwiggyData] Swiggy API Error: Status ${res.status}. Body: ${rawText.slice(0, 500)}`);
      // Forward the error status and Swiggy's (likely non-JSON) response body details
      return response.status(res.status).json({
        error: `Swiggy API request failed`,
        status: res.status,
        details: `Swiggy returned status ${res.status}. Response body started with: ${rawText.slice(0, 100)}...` // Send snippet back
      });
    }

    // If Swiggy's status was OK, TRY to parse the raw text as JSON
    let data;
    try {
      data = JSON.parse(rawText); // Attempt to parse the text we already fetched
      console.log("[Proxy: getSwiggyData] Successfully parsed Swiggy response as JSON.");
    } catch (parseError) {
      // This catches errors if Swiggy sent a 200 OK but with invalid JSON (like HTML)
      console.error("[Proxy: getSwiggyData] Failed to parse Swiggy response as JSON even though status was ok:", parseError);
      console.error("[Proxy: getSwiggyData] Raw text that failed parsing (first 500 chars):", rawText.slice(0, 500));
      // Return a 'Bad Gateway' error to the frontend
      return response.status(502).json({
        error: "Bad Gateway: Received invalid JSON from Swiggy API",
        details: parseError.message,
        responseSnippet: rawText.slice(0, 100) // Send a snippet back
      });
    }

    // --- If parsing succeeded, send the JSON data back to the frontend ---
    console.log("[Proxy: getSwiggyData] Setting CORS headers and sending parsed data to frontend.");
    response.setHeader('Access-Control-Allow-Origin', 'https://cravings-ochre.vercel.app'); // Adjust if your Vercel URL changes
    // Allow localhost for vercel dev
    // response.setHeader('Access-Control-Allow-Origin', 'http://localhost:xxxx'); // Add your specific localhost port if needed for strict checking, or use '*' for dev
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (request.method === 'OPTIONS') {
      console.log("[Proxy: getSwiggyData] Responding to OPTIONS preflight request.");
      return response.status(200).end();
    }

    return response.status(200).json(data); // Send the successfully parsed Swiggy data

  } catch (error) {
    // Catch network errors during the fetch TO Swiggy, or other unexpected errors
    console.error('[Proxy: getSwiggyData] Internal proxy error:', error);
    return response.status(500).json({ error: 'Internal Server Error in proxy function', details: error.message });
  }
}