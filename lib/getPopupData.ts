import { API_ENDPOINTS, APP_CONFIG } from "./constants";

export async function getPopupData() {
  try {
    const res = await fetch(
      API_ENDPOINTS.WELCOME_POPUP,
      { cache: APP_CONFIG.apiCacheMode as any }
    );
    console.log("res status:", res.status);
    if (!res.ok) return null;
    const json = await res.json();
    console.log("popup json:", json);
    return json.data || null;
  } catch (e) {
    console.log("fetch error:", e);
    return null;
  }
}