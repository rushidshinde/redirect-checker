import React from 'react'
import {RedirectResult, RedirectStatus} from "@/lib/types";

interface ResultDisplayProps {
    results: RedirectResult[];
}

export default function ResultDisplay({ results }: ResultDisplayProps) {
    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 gap-5">
                {results.map((result, index) => (
                    <div key={index} className={`w-full flex flex-col justify-between gap-2 p-4 rounded-lg ${result.status === RedirectStatus.SUCCESS ? 'bg-emerald-200 text-emerald-600' : result.status === RedirectStatus.WARNING ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-600'}`}>
                        <div className="flex justify-end items-center gap-4">
                            <div className={`rounded-full text-xs px-3 py-1 font-semibold border ${result.statusCode === 200 ? 'border-emerald-600 text-emerald-600' : result.statusCode === 404 ? 'border-red-600 text-red-600' : 'border-yellow-800 text-yellow-800'}`}>
                                Code: {result.statusCode}
                            </div>
                            <div className={`rounded-full text-xs px-3 py-1 font-semibold border ${result.status === RedirectStatus.SUCCESS ? 'border-emerald-600' : result.status === RedirectStatus.FAILURE ? 'border-red-600' : 'border-yellow-800'}`}>
                                {result.status}
                            </div>
                            {result.needsUpdate && (
                                <div className={`rounded-full text-xs px-3 py-1 border font-semibold ${result.status === RedirectStatus.WARNING ? 'bg-red-200 text-red-600 border-red-600' : 'bg-yellow-200 text-yellow-800 border-yellow-800'}`}>
                                    Update Recommended
                                </div>
                            )}
                        </div>
                        <span className="">
                            <span className="font-semibold">Source URL:</span> {result.sourceUrl}
                        </span>
                        <span className="">
                            <span className="font-semibold">Target URL:</span> {result.targetUrl}
                        </span>
                        <span className="">
                            <span className="font-semibold">Redirected URL:</span> {result.redirectedUrl}
                        </span>
                        <span className="">
                            <span className="font-semibold">Message:</span> {result.message}
                        </span>
                    </div>
                ))}
                {results.length === 0 && (
                    <>
                        <div className="w-full flex flex-col justify-between items-center gap-2 p-4 rounded-lg bg-white text-black">
                            <div className="w-1/2 mp:w-4/5 flex justify-center items-center mb-3">
                                <svg className="w-full aspect-auto max-w-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" fill="none">
                                    <path d="M142.275 127.975L115.775 101.475C114.826 100.529 113.54 99.997 112.2 99.997C110.86 99.997 109.574 100.529 108.625 101.475L107.263 102.844L98.1063 93.6875L99.3063 92.4813C107.824 82.2084 112.057 69.0489 111.126 55.7366C110.194 42.4242 104.17 29.9824 94.3049 20.9956C84.4396 12.0088 71.4915 7.168 58.1502 7.47868C44.809 7.78936 32.1002 13.2277 22.6639 22.6639C13.2277 32.1002 7.78936 44.809 7.47868 58.1502C7.168 71.4915 12.0088 84.4396 20.9956 94.3049C29.9824 104.17 42.4242 110.194 55.7366 111.126C69.0489 112.057 82.2084 107.824 92.4813 99.3063L93.6875 98.1063L102.844 107.263L101.475 108.625C100.527 109.574 99.9938 110.861 99.9938 112.203C99.9938 113.545 100.527 114.832 101.475 115.781L127.975 142.269C128.444 142.738 129.001 143.11 129.614 143.364C130.227 143.618 130.883 143.749 131.547 143.749C132.21 143.749 132.867 143.618 133.48 143.364C134.093 143.11 134.65 142.738 135.119 142.269L142.275 135.125C143.22 134.175 143.75 132.89 143.75 131.55C143.75 130.21 143.22 128.925 142.275 127.975ZM59.35 105C53.3632 105.015 47.4328 103.843 41.9023 101.55C36.3718 99.2576 31.3512 95.8904 27.1313 91.6438C20.8732 85.3951 16.5662 77.4622 14.7346 68.8104C12.9029 60.1585 13.6255 51.1608 16.8145 42.9122C20.0034 34.6636 25.5212 27.5197 32.6963 22.3499C39.8714 17.1801 48.3945 14.2073 57.2284 13.7933C66.0623 13.3792 74.8261 15.5418 82.4533 20.0179C90.0805 24.4939 96.2423 31.0904 100.189 39.0046C104.135 46.9189 105.696 55.8095 104.682 64.5948C103.667 73.38 100.121 81.681 94.475 88.4875L88.0625 94.875C79.9415 101.448 69.7979 105.024 59.35 105ZM131.55 137.006L106.738 112.206L112.2 106.75L137.013 131.55L131.55 137.006ZM37.5 56.25H81.25V62.5H37.5V56.25Z"
                                        fill="currentColor"/>
                                </svg>
                            </div>
                            <p className="font-semibold text-lg">No matching result found</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}