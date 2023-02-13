import { HandlerContext } from "$fresh/server.ts";
import { DOMParser } from "deno-dom";
import { Link } from "../../types/index.ts";

export function isHttp(url:string) {
  return /^(https?:)?\/\//g.test(url)
}

export const fetchLinkInfo = async (url: string):Promise<Link | null> => {
  try {
    const { origin } = new URL(url)
    const response = await fetch(url);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    if(!doc) throw new Error("Could not parse HTML")
    
    const title = doc.querySelector("title")!.innerText;
    const description = doc.querySelector('meta[name="description"]')
      ?.getAttribute("content");

    let image = doc.querySelector('link[rel*="icon"]')?.getAttribute('href');
    
    image = image ? (!isHttp(image) ? new URL(image, origin).href : image) : new URL('favicon.ico', origin).href;
      
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

export const handler = {
  async GET(_req: Request, _ctx: HandlerContext): Promise<Response> {
    const url = new URL(_req.url);
    const target_url = url.searchParams.get("q") || "";
    
    const body = await fetchLinkInfo(target_url);

    console.log(target_url,body)
    return new Response(JSON.stringify(body));
  },
};