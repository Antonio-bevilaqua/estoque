"use client";

import { useEffect, useState } from "react";

interface windowSizeData {
  width: number;
  height: number;
  isMobile: boolean;
}

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<windowSizeData>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 768,
  });

  const windowResized = (event: UIEvent) => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= 768,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", windowResized.bind(this));
    return () => {
      window.removeEventListener("resize", windowResized.bind(this));
    };
  }, []);

  return {
    windowSize,
  };
};

export default useWindowResize;
