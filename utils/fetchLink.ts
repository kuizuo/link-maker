import { DOMParser } from "deno-dom";
import { Link } from "../types/index.ts";

export function isHttp(url: string) {
  return /^(https?:)?\/\//g.test(url);
}

export const fetchLinkInfo = async (url: string): Promise<Link | null> => {
  try {
    const { origin } = new URL(url);
    const response = await fetch(url, {
      headers: {
        accept: "text/html",
      },
    });
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    if (!doc) throw new Error("Could not parse HTML");

    const title = doc.querySelector("title")!.innerText;
    const description =
      doc.querySelector('meta[property="og:description"]')?.getAttribute(
        "content",
      ) || doc.querySelector('meta[name="description"]')
        ?.getAttribute("content");

    let image =
      doc.querySelector('meta[property="og:image"]')?.getAttribute("content") ||
      doc.querySelector('link[rel*="icon"]')?.getAttribute("href");

    image = image
      ? (!isHttp(image) ? new URL(image, origin).href : image)
      : new URL("favicon.ico", origin).href;

    return {
      title,
      description,
      image,
      url,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
