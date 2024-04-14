"use client";
import { useEffect } from "react";
import { useState } from "react";

export default function BodyTheme({ children, className, dir }) {
  const [font, setFont] = useState("__className_73938b");
  useEffect(() => {
    const loadData = () => {
      localStorage?.getItem("font")
        ? setFont(localStorage?.getItem("font"))
        : setFont("__className_73938b");
    };
    loadData();
  }, []);
  return (
    <body dir={dir} className={`${className ?? className} ${font}`}>
      {children}
    </body>
  );
}
