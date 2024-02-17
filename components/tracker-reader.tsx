"use client"

import { useReadingProgress } from "@/hooks/use-reading-progress";

export default function TrackReader() {
    const completion = useReadingProgress();
    return <span
        style={{ transform: `translateX(${completion - 100}%)` }}
        className="fixed top-[150px] bottom-0 bg-gray-400 w-[200px] h-[50px] rounded"
    />

}

