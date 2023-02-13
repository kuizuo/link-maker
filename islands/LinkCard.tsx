import LinkIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/link.tsx";
import LinkButton from "../components/LinkButton.tsx";
import { Link } from "../types/index.ts";
import { downloadImg } from "../utils/downloadImg.ts";

interface Props {
  link: Link;
}

export default function LinkCard({ link: { url, title, description, image } }: Props) {
  const handleDownload = () => {
    downloadImg(`div[data-url="${url}"]`, title + '.png');
  };

  return (
    <>
      <script src='/js/html2canvas.min.js'></script>
      <div class="flex flex-col items-center" >
        <div class="flex flex-col items-center w-64 bg-white rounded-lg shadow-md p-6" data-url={url}>
          <img class="w-full w-64" src={image} alt="" />
          <h2 class="text-xl font-bold mt-6">{title}</h2>
          <p class="text-gray-600 mt-2">{description}</p>
          <span class="inline-flex items-center text-gray-300 font-xs mt-2"><LinkIcon size={16}/><a href={url} target="_blank">{url}</a></span>
        </div>
        {/* <div class="mt-4 flex gap-2">
          <LinkButton href={url} target="_blank" class="text-sm">Preview</LinkButton>
          <LinkButton class="text-sm cursor-pointer" onClick={handleDownload}>Img</LinkButton>
          <LinkButton href={url} target="_blank" class="text-sm">Code</LinkButton>
        </div> */}
      </div>
    </>
  );
}
