export async function getRandomQuoteApi(length) {
  const url = `https://api.quotable.io/random?maxLength=${length}`;
  return await fetch(url).then((result) => result.json());
}
