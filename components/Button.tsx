import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button(props: Props) {
  return (
    <button
      disabled={!IS_BROWSER || props.loading}
      {...props}
      class={`bg-yellow-300 text-white py-2 px-4 rounded-md duration-300 shadow-md text-lg mt-4 hover:(shadow-lg) focus:(shadow-lg outline-none) disabled:(opacity-50 cursor-not-allowed) ${props.class ?? ""
        }`}
    >
      {props.loading ? "Loading..." : props.children}
    </button>
  );
}