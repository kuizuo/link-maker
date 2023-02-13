import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`p-2 w-full border-2 border-yellow-300 rounded-md text-lg mt-4 text-center duration-300 focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) ${
        props.class ?? ""
      }`}
    />
  );
}
