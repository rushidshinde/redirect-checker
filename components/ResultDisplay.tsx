import React from 'react'

interface ResultDisplayProps {
    results: {
        sourceUrl: string
        targetUrl: string
        redirectedUrl: string
        success: boolean
    }[]
}

export default function ResultDisplay({ results }: ResultDisplayProps) {
    return (
        <div className="mt-4">
            <h2 className="text-lg font-medium mb-4">Results:</h2>
            <ul className="list-none mb-0 flex flex-col gap-5">
                {results.map ((result, index) => (
                    <li key={index} className={`flex flex-col justify-between gap-2 p-4 rounded-lg ${result.success ? 'bg-emerald-200 text-emerald-600' : 'bg-red-200 text-red-600'}`}>
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
                            <span className="font-semibold">Success:</span> {result.success ? 'Yes' : 'No'}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}