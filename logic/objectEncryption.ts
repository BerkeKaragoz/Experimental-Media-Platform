import { MediaType, MediaSourceType, MediaInputType } from "../@types/media";
import { decrypt, encrypt } from "./database";

type EncMediaType = MediaType;
type EncMediaInputType = MediaInputType;

export function decryptMedia(object: EncMediaType): MediaType {
  const decSources: Array<MediaSourceType> = [];

  for (const s of object.sources) {
    decSources.push({
      name: s.name ? decrypt(s.name) : "",
      url: decrypt(s.url),
      isLocal: s.isLocal,
    });
  }

  return {
    ...object,
    name: decrypt(object.name),
    search: decrypt(object.search),
    sources: decSources,
  };
}

export function encryptMedia(object: MediaInputType): EncMediaInputType {
  const decSources: Array<MediaSourceType> = [];

  for (const s of object.sources) {
    decSources.push({
      name: s.name ? encrypt(s.name) : "",
      url: encrypt(s.url),
      isLocal: s.isLocal,
    });
  }

  return {
    ...object,
    name: encrypt(object.name),
    search: encrypt(object.search),
    sources: decSources,
  };
}
