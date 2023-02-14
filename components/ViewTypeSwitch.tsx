import { JSX } from "preact/jsx-runtime";
import IconFloatLeft from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/float-left.tsx";
import IconFloatCenter from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/float-center.tsx";
import IconFloatRight from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/float-right.tsx";

import { ViewType } from "../hooks/useViewType.ts";

type Props = {
  viewType: ViewType;
  toggleViewType: (viewType: ViewType) => void;
};

export default function ViewTypeSwitch(
  { viewType, toggleViewType }: Props,
): JSX.Element {
  return (
    <div class="mt-4 flex justify-center gap-2">
      <IconFloatCenter
        onClick={() => toggleViewType("image-up")}
        color={viewType === "image-up" ? "#fdcf2b" : "#ccc"}
      />
      <IconFloatLeft
        onClick={() => toggleViewType("image-left")}
        color={viewType === "image-left" ? "#fdcf2b" : "#ccc"}
      />
    </div>
  );
}
