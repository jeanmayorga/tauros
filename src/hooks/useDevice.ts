import { useEffect, useState } from "react";
import { isClient } from "../utils";

export function useDevice() {
  const [isIos, setIsIos] = useState(
    isClient && /iPad|iPhone|iPod/.test(navigator.userAgent)
  );

  useEffect(() => {
    if (isClient) {
      setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
    }
  }, []);

  return { isIos };
}
