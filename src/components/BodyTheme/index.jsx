"use client"
import { useEffect } from 'react';
import { useState } from 'react';

export default function BodyTheme({ children, className, dir }) {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const storedTheme = localStorage?.getItem('theme');
    if (!storedTheme) {
      localStorage?.setItem('theme', 'dark')
      setTheme('dark')
    }
    setTheme(storedTheme)
  }, [])
  return (
    <body dir={dir} className={`${className ?? className} ${theme === "dark" ? "dark" : ""}`}>
      {children}
    </body>
  );
}
