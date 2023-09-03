const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseUrl) throw new Error(`api base url not provided`);
export default baseUrl;
