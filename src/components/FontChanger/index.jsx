"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  Alexandria,
  Almarai,
  Amiri,
  Aref_Ruqaa,
  Changa,
  El_Messiri,
  IBM_Plex_Sans_Arabic,
  Katibeh,
  Kufam,
  Lateef,
  Marhey,
  Noto_Sans,
  Readex_Pro,
  Rubik,
  Scheherazade_New,
  Tajawal,
} from "next/font/google";

const changa = Changa({ subsets: ["arabic", "latin"], weight: ["400"] });
const noto_sans = Noto_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const aref_ruqa = Aref_Ruqaa({ subsets: ["arabic", "latin"], weight: ["400"] });
const readex_pro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["400"],
});
const marhey = Marhey({ subsets: ["arabic", "latin"], weight: ["400"] });
const amiri = Amiri({ subsets: ["arabic", "latin"], weight: ["400"] });
const katibeh = Katibeh({ subsets: ["arabic", "latin"], weight: ["400"] });
const rubik = Rubik({ subsets: ["arabic", "latin"], weight: ["400"] });
const lateef = Lateef({ subsets: ["arabic", "latin"], weight: ["400"] });
const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["400"] });
const kufam = Kufam({ subsets: ["arabic", "latin"], weight: ["400"] });
const ibm_plex_sans_arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400"],
});
const almarai = Almarai({ subsets: ["arabic"], weight: ["400"] });
const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["400"],
});
const el_messiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400"],
});
const scheherazade_new = Scheherazade_New({
  subsets: ["arabic", "latin"],
  weight: ["400"],
});

const FontSwitcher = ({ className }) => {
  const [selectedFont, setSelectedFont] = useState({
    value: localStorage?.getItem("font") || "changa",
    label: localStorage?.getItem("font_label")
      ? localStorage?.getItem("font_label")
      : "Changa",
    font: localStorage?.getItem("font")
      ? localStorage?.getItem("font")
      : changa.className,
  });

  const fonts = [
    { value: "changa", label: "Changa", font: changa.className },
    { value: "noto_sans", label: "Noto Sans", font: noto_sans.className },
    { value: "aref_ruqa", label: "Aref Ruqaa", font: aref_ruqa.className },
    { value: "readex_pro", label: "Readex Pro", font: readex_pro.className },
    { value: "marhey", label: "Marhey", font: marhey.className },
    { value: "amiri", label: "Amiri", font: amiri.className },
    { value: "katibeh", label: "Katibeh", font: katibeh.className },
    { value: "rubik", label: "Rubik", font: rubik.className },
    { value: "lateef", label: "Lateef", font: lateef.className },
    { value: "tajawal", label: "Tajawal", font: tajawal.className },
    { value: "kufam", label: "Kufam", font: kufam.className },
    {
      value: "ibm_plex_sans_arabic",
      label: "IBM Plex Sans Arabic",
      font: ibm_plex_sans_arabic.className,
    },
    { value: "almarai", label: "Almarai", font: almarai.className },
    { value: "alexandria", label: "Alexandria", font: alexandria.className },
    { value: "el_messiri", label: "El Messiri", font: el_messiri.className },
    {
      value: "scheherazade_new",
      label: "Scheherazade New",
      font: scheherazade_new.className,
    },
  ];

  useEffect(() => {
    const fontOption = fonts.find((f) => f.value === selectedFont.value);
    if (fontOption) {
      setSelectedFont({
        value: fontOption.value,
        label: fontOption.label,
        font: fontOption.font,
      });
    }
  }, [selectedFont.value]);

  useEffect(() => {
    localStorage.setItem("font", selectedFont.font);
    localStorage.setItem("font_label", selectedFont.label);
  }, [selectedFont]);

  return (
    <div className={className ?? className}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-type"
              >
                <polyline points="4 7 4 4 20 4 20 7"></polyline>
                <line x1="9" y1="20" x2="15" y2="20"></line>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
            }
            color="default"
            variant="solid"
            className="capitalize"
          >
            {selectedFont.label}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {fonts.map((fontOption) => (
            <DropdownItem
              key={fontOption.value}
              className={`text-white ${fontOption.font}`}
              onClick={() => setSelectedFont(fontOption)}
              as={Link}
              href=""
            >
              {fontOption.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default FontSwitcher;
