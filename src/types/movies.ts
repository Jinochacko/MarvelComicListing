export interface Url {
  type: string;
  url: string;
}
export interface Variant {
  resourceURI: string;
  name: string;
}
export interface DateItem {
  type: string;
  date: string;
}
export interface Price {
  type: string;
  price: number;
}
export interface Thumbnail {
  path: string;
  extension: string;
}
export interface Creators {
  available: number;
  collectionURI: string;
  items?: Creator[] | null;
  returned: number;
}
export interface Creator {
  resourceURI: string;
  name: string;
  role: string;
}
export interface CharactersOrEvents {
  available: number;
  collectionURI: string;
  items?: null[] | null;
  returned: number;
}
export interface Stories {
  available: number;
  collectionURI: string;
  items?: Story[] | null;
  returned: number;
}
export interface Story {
  resourceURI: string;
  name: string;
  type: string;
}

export interface MoviesItem {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects?: null[] | null;
  resourceURI: string;
  urls?: Url[] | null;
  series: Variant;
  variants?: Variant[] | null;
  collectedIssues?: null[] | null;
  dates?: DateItem[] | null;
  prices?: Price[] | null;
  thumbnail: Thumbnail;
  images?: Thumbnail[] | null;
  creators: Creators;
  characters: CharactersOrEvents;
  stories: Stories;
  events: CharactersOrEvents;
}
