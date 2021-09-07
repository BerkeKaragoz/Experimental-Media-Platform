export interface MediaType {
  name: string;
  search: string;
  sources: Array<MediaSourceType>;
  _id: string;
}

export interface MediaInputType {
  name: string;
  search: string;
  sources: Array<MediaSourceType>;
}

export interface MediaSourceType {
  name?: string;
  url: string;
  isLocal: Boolean;
}
