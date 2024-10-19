import React from 'react'
import {RedirectResult, RedirectStatus} from "@/lib/types";

interface ResultDisplayProps {
    results: RedirectResult[];
}

export default function ResultDisplay({ results }: ResultDisplayProps) {
    return (
        <div className="mt-4">
            <h2 className="text-lg font-medium mb-4">Results:</h2>
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
            </div>
        </div>
    )
}