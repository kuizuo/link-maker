import { useCallback, useEffect, useState } from "preact/hooks";

export type ViewType = "image-up" | "image-left";

export function useViewType() {
  const [viewType, setViewType] = useState<ViewType>("image-up");

  useEffect(() => {
    setViewType((localStorage.getItem("viewType") as ViewType) || "image-up");
  }, []);

  const toggleViewType = useCallback((newViewType: ViewType) => {
    setViewType(newViewType);
    localStorage.setItem("viewType", newViewType);
  }, []);

  return {
    viewType,
    toggleViewType,
  };
}
