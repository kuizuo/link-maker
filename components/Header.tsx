import LinkIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/link.tsx";
import GithubIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";

export default function Header() {
  return (
    <div class="bg-white w-full max-w-screen-lg py-6 flex flex-col items-center md:flex-row gap-4">
      <div class="flex items-center flex-1">
        <LinkIcon color="#ffdb1e" />
        <div class="text-xl ml-1 font-bold">
          Link Maker
        </div>
      </div>
      <a href="https://fresh.deno.dev" target="_blank">
        <img
          width="200"
          height="32"
          src="https://fresh.deno.dev/fresh-badge.svg"
          alt="Made with Fresh"
        />
      </a>
      <a href={"https://github.com/kuizuo/link-maker"} target="_blank" class="">
        <GithubIcon />
      </a>
    </div>
  );
}
