import { JSX } from "preact";

export default function LinkButton(
  props: JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a
      {...props}
      class={`bg-yellow-300 text-white font-bold py-2 px-4 rounded transition hover:(shadow-md) focus:(shadow-md outline-none) ${
        props.class ?? ""
      }`}
    />
  );
}
