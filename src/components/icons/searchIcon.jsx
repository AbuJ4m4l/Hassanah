"use client";

import { Image } from "@nextui-org/react";
import nextImage from 'next/image'
const SearchIcon = ({ width, height, className }) => {
    return (
        <>
            <Image
                as={nextImage}
                src="/images/svg/icons/search.svg"
                width={width}
                height={height}
                alt="Search Icon"
                loading="lazy"
                className={className ?? className}
            />
        </>
    )
}

export default SearchIcon;