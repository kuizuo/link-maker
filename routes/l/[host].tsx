import { Handlers, PageProps } from "$fresh/server.ts";
import LinkCard from "../../islands/LinkCard.tsx";
import { Link } from "../../types/index.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const host = ctx.params.host;
    const info = await (await fetch(`http://link-maker.deno.dev/api/link?q=http://${host}`)).json()

    const resp = await ctx.render({ info });
    return resp;
  },
};

export default function LinkEmbed(props: PageProps) {
  const linkInfo = props.data.info as Link;

  return (
    <>
      <meta name="referrer" content="no-referrer"></meta>
      <script src="/js/html2canvas.min.js"></script>
      <section class="w-full h-full flex flex-row justify-start items-start">
        <main class="w-full max-w-lg mx-auto my-auto ">
          <div class={`flex justify-center items-center w-50`}>
            <LinkCard
              link={linkInfo}
              key={linkInfo.url}
            />
          </div>
        </main>
      </section>
    </>
  );



}
