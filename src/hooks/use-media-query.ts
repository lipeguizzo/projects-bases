'use client';
import { useEffect, useState } from 'react';

interface MediaQuery {
  width: number;
  height: number;
  isMobile: boolean;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

export function useMediaQuery(): MediaQuery {
  const [mediaQuery, setMediaQuery] = useState<MediaQuery>({
    width: 0,
    height: 0,
    isMobile: false,
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  });

  useEffect(() => {
    const currentWidth: number = document.documentElement.clientWidth ?? 0;
    const currentHeight: number = document.documentElement.clientHeight ?? 0;
    setMediaQuery({
      width: currentWidth,
      height: currentHeight,
      isMobile: currentWidth <= 959,
      xs: currentWidth <= 599,
      sm: currentWidth >= 600 && currentWidth <= 959,
      md: currentWidth >= 960 && currentWidth <= 1279,
      lg: currentWidth >= 1280 && currentWidth <= 1919,
      xl: currentWidth >= 1920,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth: number = document.documentElement.clientWidth ?? 0;
      const currentHeight: number = document.documentElement.clientHeight ?? 0;
      setMediaQuery({
        width: currentWidth,
        height: currentHeight,
        isMobile: currentWidth <= 959,
        xs: currentWidth <= 599,
        sm: currentWidth >= 600 && currentWidth <= 959,
        md: currentWidth >= 960 && currentWidth <= 1279,
        lg: currentWidth >= 1280 && currentWidth <= 1919,
        xl: currentWidth >= 1920,
      });
    };

    window.addEventListener('resize', handleResize);
  }, []);

  return mediaQuery;
}
