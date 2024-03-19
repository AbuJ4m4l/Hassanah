"use client";
import NextNProgress from "nextjs-progressbar";

function NextNProgressProvider() {
    return (
        <NextNProgress color='#0093FD' startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
    )
}

export default NextNProgressProvider