import { useState, useEffect } from "react";

interface Viewport {
  width: number;
  isMobile: boolean;
}

export const useViewport = (): Viewport => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    isMobile: width < 768,
  };
};