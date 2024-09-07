export default async function fetcher(url, options = {}) {
  // console.log(`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`,
    options
  );

  const data = await response.json();

  if (!response.ok) {
    // console.log(data.error?.message);
    const errorMessage = data.error?.message || response.statusText;
    throw new Error(errorMessage);
  }

  return data;
}
