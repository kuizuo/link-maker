import { useState } from "preact/hooks";
import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import LinkCard from "./LinkCard.tsx";

import { Link } from "../types/index.ts";

const defaultHistory: Link[] = [{
  title: "fresh - The next-gen web framework.",
  description: "Just in time edge rendering, island based interactivity, and no configuration TypeScript support usi...",
  image: "https://fresh.deno.dev/home-og.png?__frsh_c=c5xfm6hjab90",
  url: "https://fresh.deno.dev/"
}, {
  title: "Deno — A modern runtime for JavaScript and TypeScript",
  description: "Deno is a simple, modern runtime for JavaScript and TypeScript that uses V8 and is built in Rust.",
  image: "https://deno.land/og/image.png",
  url: "https://deno.land"
}, {
  title: "愧怍的小站",
  description: "愧怍的个人博客",
  image: "https://kuizuo.cn/img/logo.png",
  url: "https://kuizuo.cn",
}];

export default function LinkMaker() {
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState(
    IS_BROWSER
      ? JSON.parse(localStorage.getItem("history")!) || defaultHistory
      : []
  );

  const [loading, setLoading] = useState(false);

  const fetchLink = async (url: string) => {
    const response = await fetch(`/api/link?q=${url}`);
    const data = await response.json();
    return data;
  };

  const addLink = async () => {
    setLoading(true);

    try {

      const link = await fetchLink(url);
      setLoading(false);
      
      if (!link) {
        alert("link not found");
        return;
      }

      if (history.some((t) => t.url === link.url)) {
        return;
      }

      const newHistory = [...(history || []), link];
      setHistory(newHistory);

      localStorage.setItem("history", JSON.stringify(newHistory));

      setUrl("");
    } catch (error) {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addLink();
    }
  };

  function removeLink(link: Link) {
    const newHistory = history.filter((t) => t !== link);

    setHistory(newHistory);

    localStorage.setItem("history", JSON.stringify(newHistory));
  }

  return (
    <>
      <p class="my-4 text-center  text-base text-gray-500">
        This is a link maker, you can input your link and get a card-style
        preview.
      </p>
      <div class="flex flex-col items-center justify-start">
        <Input
          type="text"
          placeholder="pleace input your link"
          value={url}
          onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <Button loading={loading} onClick={addLink}>Make</Button>
      </div>
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <script src='/js/html2canvas.min.js'></script>
        {history.map((item: Link) => (
          <LinkCard link={item} key={item.url} removeLink={removeLink} />
        ))}
      </div>
    </>
  );
}
