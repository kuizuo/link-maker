import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import LinkMaker from "../islands/LinkMaker.tsx";

export default function Home() {
  return (
    <>
      <meta name="referrer" content="no-referrer"></meta>
      <Head>
        <title>Link Maker</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Header></Header>
        <LinkMaker></LinkMaker>
      </div>
    </>
  );
}
