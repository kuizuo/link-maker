import { Link } from "../types/index.ts";


export function genEmbedCode(link: Link) {
  const url = new URL(link.url)

  return `<iframe style="width:100%;height:100%;min-width:256px;" src="https://link-maker.deno.dev/l/${url.host}" frameBorder="0"></iframe>`;
}
