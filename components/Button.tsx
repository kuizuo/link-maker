import { JSX } from "preact";

export default function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      class={`bg-yellow-300 text-white py-2 px-4 rounded-md duration-300 shadow-md text-lg mt-4 hover:(shadow-lg) focus:(shadow-lg outline-none) ${
        props.class ?? ""
      }`}
    />
  );
}
