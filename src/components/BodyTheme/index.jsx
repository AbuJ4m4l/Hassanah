"use client";
import { useEffect } from "react";
import { useState } from "react";

export default function BodyTheme({ children, className, dir }) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const storedTheme = localStorage?.getItem("theme");
    if (!storedTheme) {
      localStorage?.setItem("theme", "dark");
      setTheme("dark");
    } else {
      setTheme(storedTheme);
    }
  }, []);
  return (
    <body
      dir={dir}
      className={`${className ?? className} ${
        localStorage?.getItem("font")
          ? localStorage?.getItem("font")
          : "__className_73938b"
      } ${theme}`}
    >
      {children}
    </body>
  );
}
