'use client'
import React, { useState } from 'react'
import checkRedirect from "@/lib/checkRedirect";
import UploadInstructions from "@/components/UploadInstructions";
import FileUpload from "@/components/FileUpload";
import ResultDisplay from "@/components/ResultDisplay";

interface RedirectResult {
    sourceUrl: string
    targetUrl: string
    redirectedUrl: string
    success: boolean
}

export default function RedirectChecker() {
    const [results, setResults] = useState<RedirectResult[]>([])
    const [baseUrl, setBaseUrl] = useState('')
    const [urlsToCheck, setUrlsToCheck] = useState<{ sourceUrl: string, targetUrl: string }[]>([])
    const [isLoading, setIsLoading] = useState(false); // New loading state

    function handleFileUpload(file: File) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target?.result as string
            const lines = text.split('\n')
            const newUrls: { sourceUrl: string, targetUrl: string }[] = []

            for (const line of lines) {
                const [sourceUrl, targetUrl] = line.split(',').map(url => url.trim())
                if (sourceUrl && targetUrl) {
                    newUrls.push({
                        sourceUrl: new URL(sourceUrl, baseUrl).toString(),
                        targetUrl: new URL(targetUrl, baseUrl).toString()
                    })
                }
            }

            setUrlsToCheck(newUrls)
        }
        reader.readAsText(file)
    }

    async function checkUrls() {
        setIsLoading(true); // Set loading state to true
        const newResults: RedirectResult[] = []

        for (const { sourceUrl, targetUrl } of urlsToCheck) {
            const redirectedUrl = await checkRedirect(sourceUrl);
            const absoluteRedirectedUrl = new URL(redirectedUrl, baseUrl).toString(); // Convert to absolute URL
            newResults.push({
                sourceUrl,
                targetUrl,
                redirectedUrl: absoluteRedirectedUrl,
                success: absoluteRedirectedUrl === targetUrl // Check if the redirected URL matches the target URL
            })
        }

        setResults(newResults)
        setIsLoading(false); // Set loading state to false
    }

    function downloadResults() {
        const header = "Source URL,Target URL,Redirected URL,Success\n"; // Header row
        const csvContent = header
            + results.map(result => `${result.sourceUrl},${result.targetUrl},${result.redirectedUrl},${result.success ? 'Yes' : 'No'}`).join("\n");
        const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "redirect_results.csv");
        document.body.appendChild(link);
        link.click();
    }

    return (
        <div>
            <UploadInstructions />
            <div className="mb-4">
                <label htmlFor="base-url" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Base URL:</label>
                <input
                    type="url"
                    id="base-url"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter base URL"
                />
            </div>
            <FileUpload onFileUpload={handleFileUpload} />
            <div className="flex gap-4 justify-start items-center mp:flex-col ">
                <button
                    onClick={checkUrls}
                    className={`mt-4 ${isLoading ? 'bg-gray-400' : 'bg-white text-black'} px-5 py-2 rounded-lg font-medium`}
                    disabled={urlsToCheck.length === 0 || isLoading} // Disable button if loading
                >
                    {isLoading ? 'Checking...' : 'Check Redirects'}
                </button>
                {results.length === 0 ? (
                    <></>
                ) : (
                    <button
                        onClick={downloadResults}
                        className ="mt-4 bg-white text-black px-5 py-2 rounded-lg font-medium"
                        disabled={results.length === 0}
                    >
                        Download Results
                    </button>
                )}
            </div>
            {isLoading && <p className="mt-2 text-gray-600">Loading, please wait...</p>} {/* Loading message */}
            <ResultDisplay results={results} />
        </div>
    )
}