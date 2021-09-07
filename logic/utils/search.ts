import deburr from "lodash.deburr";

export const searchSlugify = (text: string): string =>
  deburr(text).normalize().toLowerCase();
