export const send = (filter: string) =>
  fetch(
    `https://gateway.marvel.com/v1/public/comics?${filter}&orderBy=-onsaleDate&ts=1&apikey=53d1ed562ba874c413843040d7abf40c&limit=42&hash=437758548ee233678ad580cb6250a203`,
    {
      method: "GET",
    }
  ).then((result) => {
    // if (result.status !== 200) this.handleError(result);
    return result.json();
  });
