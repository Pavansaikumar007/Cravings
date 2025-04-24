// File: api/getMenu.js
// Purpose: Proxy for Swiggy's menu API for a specific restaurant

const fetch = require('node-fetch');

// Define default coordinates (menu API also needs them)
const DEFAULT_LAT = "17.7711568";
const DEFAULT_LNG = "83.2358316";

// This is the function Vercel will run when you call /api/getMenu
export default async function handler(request, response) {
  // Get restaurantId, lat, and lng from the request URL query parameters
  // (e.g., /api/getMenu?resId=12345&lat=...&lng=...)
  const { resId, lat = DEFAULT_LAT, lng = DEFAULT_LNG } = request.query;

  // --- Validate Input ---
  if (!resId) {
    console.error("[Proxy: getMenu] Missing 'resId' query parameter.");
    return response.status(400).json({ error: "Bad Request: 'resId' query parameter is required." });
  }

  // --- Construct the Swiggy Menu API URL ---
  // Note: Swiggy's actual URL might have more parameters; observe in browser dev tools if needed.
  const swiggyMenuApiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;

  console.log(`[Proxy: getMenu] Fetching Menu from Swiggy URL: ${swiggyMenuApiUrl}`);

  try {
    // --- Making the request FROM Vercel Server TO Swiggy ---
    const res = await fetch(swiggyMenuApiUrl, {
      headers: {
        // IMPORTANT: Use a realistic User-Agent
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'accept': 'application/json',
        // Menu API might be more strict, potentially add Origin/Referer if needed
        // 'Origin': 'https://www.swiggy.com',
        // 'Referer': `https://www.swiggy.com/restaurants/${resId}`, // Referer might be specific
      }
    });
    // --- Swiggy responds TO Vercel Server ---

    // Check if Swiggy returned an error
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Proxy: getMenu] Swiggy API Error: ${res.status} ${res.statusText}`, errorText);
      return response.status(res.status).json({
        error: `Swiggy Menu API request failed`,
        status: res.status,
        details: errorText
      });
    }

    // Parse the successful JSON response
    const data = await res.json();

    // --- Setting Headers for the response FROM Vercel Server TO Your Browser ---
    response.setHeader('Access-Control-Allow-Origin', 'https://cravings-ochre.vercel.app');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    // response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS requests
    if (request.method === 'OPTIONS') {
      console.log("[Proxy: getMenu] Responding to OPTIONS preflight request.");
      return response.status(200).end();
    }

    // --- Send the menu data received from Swiggy back to YOUR frontend ---
    console.log(`[Proxy: getMenu] Successfully fetched menu data for ${resId}. Sending back to frontend.`);
    return response.status(200).json(data);

  } catch (error) {
    console.error('[Proxy: getMenu] Internal proxy error:', error);
    return response.status(500).json({ error: 'Internal Server Error in menu proxy function', details: error.message });
  }
}