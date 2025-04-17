// File: utils/constants.js

// --- Base URL for images (remains the same) ---
export const IMAGE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

// --- Define Coordinates ---
export const LATITUDE = "17.7711568";
export const LONGITUDE = "83.2358316";

// --- Define YOUR PROXY API Paths ---
// Path to your serverless function for getting the main Swiggy data (restaurants/categories)
// It includes the default lat/lng, but your proxy code can override if needed.
export const GET_SWIGGY_DATA_API = `/api/getSwiggyData?lat=${LATITUDE}&lng=${LONGITUDE}`;

// Base path to your serverless function for getting a restaurant menu.
// We will add the specific restaurant ID and coordinates dynamically in the component.
export const GET_MENU_API_BASE = `/api/getMenu`;

/*
// --- Original Swiggy URLs (Commented out - Keep for reference if needed, but NOT used by frontend anymore) ---
// export const SWIGGY_API_URL_ORIGINAL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LATITUDE}&lng=${LONGITUDE}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
// export const MENU_ITEMS_URL_ORIGINAL_BASE = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LATITUDE}&lng=${LONGITUDE}&restaurantId=`;
*/