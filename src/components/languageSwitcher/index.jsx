"use client";

import Image from "next/image";
import {
  Link,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const LanguageSwitcher = ({ color, variant, location, className }) => {
  return (
    <div className={className ?? className}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            color="default"
            variant="solid"
            className="capitalize"
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-globe"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            }
          >
            Language
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Language switcher"
          color={color ? color : "primary"}
          variant={variant ? variant : "solid"}
          disabledKeys={["Turkish"]}
        >
          <DropdownItem
            className="flex flex-row text-white"
            key="Arabic"
            as={Link}
            href={`/ar/${location}`}
            startContent={
              <Image
                src="/images/flags/ksa.png"
                width={25}
                height={25}
                loading="lazy"
                alt="Flag"
                className="rounded-sm rtl:ml-2 ltr:mr-2"
              />
            }
            color="default"
          >
            العربية
          </DropdownItem>
          <DropdownItem
            className="flex flex-row text-white"
            as={Link}
            href={`/en/${location}`}
            key="English"
            endContent={
              <Image
                src="/images/flags/usa.png"
                width={25}
                height={25}
                loading="lazy"
                alt="Flag"
                className="rounded-sm rtl:ml-2 ltr:mr-2"
              />
            }
            color="default"
          >
            English
          </DropdownItem>
          <DropdownItem
            className="flex flex-row text-white"
            as={Link}
            href={`/tr/${location}`}
            key="Turkish"
            endContent={
              <Image
                src="/images/flags/tur.png"
                width={25}
                height={25}
                loading="lazy"
                alt="Flag"
                className="rounded-sm rtl:ml-2 ltr:mr-2"
              />
            }
            color="default"
          >
            Türkçe (Yakında gelecek)
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;
