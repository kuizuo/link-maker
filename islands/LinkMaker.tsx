import { useState } from "preact/hooks";
import { signal } from '@preact/signals'
import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import { Link } from "../types/index.ts";
import LinkCard from "./LinkCard.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function LinkMaker() {
  const [url, setUrl] = useState("");

  const history = signal<Link[]>(
    IS_BROWSER ? JSON.parse(localStorage.getItem("history")!) || [] : []
  );

  const fetchLink = async (url: string) => {
    const response = await fetch(`/api/link?q=${url}`);
    const data = await response.json();
    return data;
  };

  const addLink = async () => {
    const link = await fetchLink(url);

    if (!link) {
      return
    }

    history.value = [...history.value, link]

    localStorage.setItem("history", JSON.stringify(history.value));
    setUrl("");
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addLink();
    }
  };

  function removeLink(link: Link) {
    history.value = history.value.filter(t => t !== link);
  }

  return (
    <>
      <p class="my-4 text-center  text-base text-gray-500">
        This is a link maker, you can input your link and get a card-style preview.
      </p>
      <div class="flex flex-col items-center justify-start">
        <Input
          type="text"
          placeholder="pleace input your link"
          value={url}
          onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <Button onClick={addLink}>Make</Button>
      </div>
      <div class="mt-4 flex gap-4">
        {history.value.map((item: Link) => (
          <LinkCard link={item} key={item.url} />
        ))}
      </div>
    </>
  )
}
