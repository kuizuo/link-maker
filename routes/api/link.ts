import { HandlerContext } from "$fresh/server.ts";
import { fetchLinkInfo } from "../../utils/fetchLink.ts";

export const handler = {
  async GET(_req: Request, _ctx: HandlerContext): Promise<Response> {
    const url = new URL(_req.url);
    const target_url = url.searchParams.get("q") || "";

    const body = await fetchLinkInfo(target_url);

    console.log(target_url, body);
    return new Response(JSON.stringify(body));
  },
};
