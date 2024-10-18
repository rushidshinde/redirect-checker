import React from 'react';

interface ProgressBarProps {
    progress: number; // Progress percentage (0 to 100)
}

export default function ProgressBar({progress: progress}: ProgressBarProps) {
    return(
        <>
            <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-5">
                    <div
                        className="bg-teal-500 h-full rounded-full flex justify-end items-center transition-all duration-500 ease-linear"
                        style={{width: `${progress}%`}}
                    >
                        {progress >= 4 && <p className="text-white text-sm pr-5">{progress}%</p>}
                    </div>
                </div>
            </div>
        </>
    )
}