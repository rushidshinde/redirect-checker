'use client'
import React, {useEffect, useRef, useState} from 'react'
import checkRedirect from "@/lib/checkRedirect";
import UploadInstructions from "@/components/UploadInstructions";
import FileUpload from "@/components/FileUpload";
import ResultDisplay from "@/components/ResultDisplay";
import ProgressBar from "@/components/ProgressBar";
import {RedirectResult, RedirectStatus} from "@/lib/types";
import StatFilter from "@/components/StatFilter";


export default function RedirectChecker() {
    const [results, setResults] = useState<RedirectResult[]>([]);
    const [baseUrl, setBaseUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activeFilter, setActiveFilter] = useState<RedirectStatus | 'all'>('all');
    const [filteredResults, setFilteredResults] = useState<RedirectResult[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFileSelection(selectedFile: File) {
        setFile(selectedFile);
    }

    async function processFile(file: File): Promise<{ sourceUrl: string, targetUrl: string }[]> {
        return new Promise((resolve) => {
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

                resolve(newUrls);
            }
            reader.readAsText(file)
        });
    }

    async function checkUrls() {
        if (!baseUrl) {
            alert("Please enter a base URL");
            return;
        }

        if (!file) {
            alert("Please select a CSV file");
            return;
        }
        setIsLoading(true);
        const urlsToCheck = await processFile(file);
        const newResults: RedirectResult[] = [];
        for (let i = 0; i < urlsToCheck.length; i++) {
            const { sourceUrl, targetUrl } = urlsToCheck[i];
            const result = await checkRedirect(sourceUrl);
            const absoluteRedirectedUrl = new URL(result.redirectedUrl, baseUrl).toString();

            let status: RedirectStatus;
            let message: string;
            let needsUpdate = false;

            if (absoluteRedirectedUrl === targetUrl) {
                if (result.statusCode === 200) {
                    status = RedirectStatus.SUCCESS;
                    message = 'Redirected successfully';
                } else if (result.statusCode === 404) {
                    status = RedirectStatus.FAILURE;
                    message = 'Redirected successfully but target page not found';
                    needsUpdate = true;
                } else {
                    status = RedirectStatus.WARNING;
                    message = `Redirected successfully but received status code ${result.statusCode}`;
                }
            } else if (sourceUrl === absoluteRedirectedUrl) {
                if (result.statusCode === 200) {
                    status = RedirectStatus.SUCCESS;
                    message = 'Page not redirected but source exists';
                } else if (result.statusCode === 404) {
                    status = RedirectStatus.FAILURE;
                    message = 'Page not redirected and not found';
                    needsUpdate = true;
                } else {
                    status = RedirectStatus.WARNING;
                    message = `Page not redirected received status code ${result.statusCode}`;
                }
            } else {
                if(result.statusCode === 404) {
                    status = RedirectStatus.FAILURE;
                    message = 'Redirected to a different URL than expected and page not found';
                    needsUpdate = true;
                } else {
                    status = RedirectStatus.WARNING;
                    message = 'Redirected to a different URL than expected';
                }
            }

            newResults.push({
                sourceUrl,
                targetUrl,
                redirectedUrl: absoluteRedirectedUrl,
                statusCode: result.statusCode,
                status,
                message,
                needsUpdate
            });

            const newProgress = Math.round(((i + 1) / urlsToCheck.length) * 100);
            setProgress(newProgress);
        }

        setResults(newResults);
        setIsLoading(false);
    }

    function downloadResults() {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const header = "Source URL,Target URL,Redirected URL,Status Code,Status,Message,Needs Update\n";
        const csvContent = header
            + results.map(result => `${result.sourceUrl},${result.targetUrl},${result.redirectedUrl},${result.statusCode},${result.status},${result.message},${result.needsUpdate ? 'Yes' : 'No'}`).join("\n");
        const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `redirect_results_${day}_${month}_${year}_${hours}_${minutes}_${seconds}.csv`);
        document.body.appendChild(link);
        link.click();
    }

    useEffect(() => {
        if (activeFilter === 'all'){
            setFilteredResults(results)
        } else {
            setFilteredResults(results.filter(result => result.status === activeFilter));
        }
    }, [activeFilter, results]);

    function resetPage(){
        setResults([]);
        setBaseUrl('');
        setProgress(0);
        setFile(null);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }


    return (
        <div>
            <UploadInstructions />
            <div className="mb-4">
                <label htmlFor="base-url"
                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Base
                    URL:</label>
                <input
                    type="url"
                    id="base-url"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="https://redirect-checker.vercel.app"
                />
                <p className="text-sm italic">Please add base url without the forward slash (/) at the end</p>
            </div>
            <FileUpload onFileSelect={handleFileSelection} ref={fileInputRef}/>
            <div className="flex gap-4 justify-between items-center mp:flex-col ">
                {results.length === 0 ? (
                    <>
                        <button
                            onClick={checkUrls}
                            className={`mt-4 ${isLoading ? 'bg-gray-400' : 'bg-white text-black'} px-5 py-2 rounded-lg font-medium disabled:cursor-not-allowed cursor-pointer`}
                            disabled={file === null || baseUrl === "" || isLoading} // Disable button if loading
                        >
                            {isLoading ? 'Checking...' : 'Check Redirects'}
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={downloadResults}
                            className="mt-4 bg-white text-black px-5 py-2 rounded-lg font-medium"
                            disabled={results.length === 0}
                        >
                            Download Results
                        </button>
                        <button
                            onClick={resetPage}
                            className="mt-4 bg-rose-700 text-white px-5 py-2 rounded-lg font-medium flex justify-center items-center gap-2"
                            disabled={results.length === 0}
                        >
                            <svg className="w-4 aspect-square" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path fill="currentColor" d="M386.3 160L336 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
                            </svg>
                            Reset
                        </button>
                    </>
                )}
            </div>
            <div className="">
                {isLoading && <ProgressBar progress={progress}/>}
            </div>
            {isLoading && <p className="mt-2 text-gray-600">Loading, please wait...</p>} {/* Loading message */}
            {results.length !== 0 && (
                <div className="w-full">
                    <h2 className=" my-10 text-2xl font-bold mb-5 py-2 px-5 leading-none bg-gradient-to-r from-0% from-transparent via-50% via-white to-100% to-transparent text-black flex justify-center items-center">
                        <span>Report</span>
                    </h2>
                    <div className="w-full flex flex-wrap justify-end items-center gap-4">
                        <StatFilter results={results} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                    </div>
                    <ResultDisplay results={filteredResults} />
                </div>
            )}
        </div>
    )
}