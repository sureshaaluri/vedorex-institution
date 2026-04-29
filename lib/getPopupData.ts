export async function getPopupData() {
  try {
    const res = await fetch(
      `http://localhost:1337/api/welcome-popupe`, // hardcoded to test
      { cache: "no-store" } // disable cache for testing
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