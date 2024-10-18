import React from 'react';

interface ProgressBarProps {
    progress: number; // Progress percentage (0 to 100)
}

export default function({progress: progress}: ProgressBarProps) {
    return(
        <>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div
                    className="bg-teal-500 h-full rounded-full"
                    style={{width: `${progress}%`}}
                />
            </div>
        </>
    )
}