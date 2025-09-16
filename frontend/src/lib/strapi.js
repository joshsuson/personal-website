const strapiUrl = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const apiKey = import.meta.env.STRAPI_API_KEY;

export async function fetchHomePage() {
  const headers = {};
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  
  const response = await fetch(`${strapiUrl}/api/home-page?populate=*`, {
    headers
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch home page data: ${response.status}`);
  }
  
  const result = await response.json();
  return result.data;
}
