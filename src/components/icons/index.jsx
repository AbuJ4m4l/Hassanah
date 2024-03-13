"use client";

import { Image } from "@nextui-org/react";
import nextImage from 'next/image'
const HassanahIcon = ({ width, height, className, icon }) => {
    const src = `/images/svg/icons/${icon}.svg`;
    const alt = `${icon} Icon`
    return (
        <>
            <Image
                as={nextImage}
                src={src}
                width={width}
                height={height}
                alt={alt}
                loading="lazy"
                className={className ?? className}
            />
        </>
    )
}

export default HassanahIcon;