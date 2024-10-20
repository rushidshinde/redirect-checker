'use client'
import React, {useEffect, useRef, useState} from 'react'
import checkRedirect from "@/lib/checkRedirect";
import FileUpload from "@/components/FileUpload";
import ResultDisplay from "@/components/ResultDisplay";
import ProgressBar from "@/components/ProgressBar";
import {RedirectResult, RedirectStatus} from "@/lib/types";
import StatFilter from "@/components/StatFilter";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader, WandSparkles} from "lucide-react";
import {DownloadIcon, ResetIcon} from "@radix-ui/react-icons";


export default function RedirectChecker() {
    const [results, setResults] = useState<RedirectResult[]>([]);
    const [baseUrl, setBaseUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activeFilter, setActiveFilter] = useState<RedirectStatus | 'all'>('all');
    const [filteredResults, setFilteredResults] = useState<RedirectResult[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [resultView, setResultView] = useState<'grid' | 'list'>('grid');
    const [inputDisabled, setInputDisabled] = useState(false);

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
        setInputDisabled(true);
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
        setInputDisabled(false);
    }


    return (
        <div>
            <div className="mb-4">
                <Label htmlFor={'base-url'} className="">Base URL:</Label>
                <Input
                    id="base-url"
                    type="url"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="https://redirect-checker.vercel.app"
                    className="disabled:cursor-not-allowed"
                    disabled={inputDisabled}
                />
                <p className="text-sm italic my-0">Please add base url without the forward slash (/) at the end</p>
            </div>
            <FileUpload onFileSelect={handleFileSelection} ref={fileInputRef} disabled={inputDisabled}/>
            <div className="flex gap-4 justify-between items-center mp:flex-col ">
                {results.length === 0 ? (
                    <>
                        <Button
                            onClick={checkUrls}
                            variant={'default'}
                            className="disabled:cursor-not-allowed cursor-pointer"
                            disabled={file === null || baseUrl === "" || isLoading} // Disable button if loading
                        >
                            {
                                isLoading ?
                                    <>
                                        <Loader className="transition-all animate-spin"/>
                                        Checking...
                                    </>
                                    :
                                    <>
                                        <WandSparkles/>
                                        Check Redirects
                                    </>
                            }
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant={'default'}
                            onClick={downloadResults}
                            disabled={results.length === 0}
                        >
                            <DownloadIcon/>
                            Download Results
                        </Button>
                        <Button
                            variant={'destructive'}
                            onClick={resetPage}
                            disabled={results.length === 0}
                        >
                            <ResetIcon/>
                            Reset
                        </Button>
                    </>
                )}
            </div>
            <div className="">
                {isLoading && <ProgressBar progress={progress}/>}
            </div>
            {results.length !== 0 && (
                <div className="w-full">
                    <hr className="my-8"/>
                    <div className="w-full flex flex-wrap justify-end items-center gap-4">
                    </div>
                    <StatFilter results={results} activeFilter={activeFilter} setActiveFilter={setActiveFilter} resultView={resultView} setResultView={setResultView} />
                    <ResultDisplay results={filteredResults} resultView={resultView}/>
                </div>
            )}
        </div>
    )
}