"use client";
import { useEffect } from "react";
import { useState } from "react";

export default function BodyTheme({ children, className, dir }) {
  const [theme, setTheme] = useState("dark");
  const [font, setFont] = useState("__className_73938b");
  useEffect(() => {
    const storedTheme = localStorage?.getItem("theme");
    localStorage?.getItem("font")
      ? setFont(localStorage?.getItem("font"))
      : setFont("__className_73938b");
    if (!storedTheme) {
      localStorage?.setItem("theme", "dark");
      setTheme("dark");
    } else {
      setTheme(storedTheme);
    }
  }, []);
  return (
    <body dir={dir} className={`${className ?? className} ${font} ${theme}`}>
      {children}
    </body>
  );
}
