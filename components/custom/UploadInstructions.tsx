'use client'
import React from 'react'
import {Button} from "@/components/ui/button";
import {DownloadIcon} from "@radix-ui/react-icons";


export default function UploadInstructions() {

    const downloadTemplate = () => {
        const link = document.createElement('a');
        link.href = '/file/redirection-checker-template-csv-file.csv';
        link.setAttribute('download', 'redirection-template.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-center text-2xl mb-2">File Upload Instructions</h2>
            <p className="mb-1">Please upload a CSV file (.csv) with the following format:</p>
            <div className="text-sm mb-4">
                <ul className="list-disc mb-2">
                    <li>Each row should contain two URLs separated by a comma</li>
                    <li>The first column is the source URL (URL to check)</li>
                    <li>The second column is the target URL (expected final URL)</li>
                    <li>Use relative paths starting with a forward slash (/)</li>
                    <li>Do not include the domain name in the URLs</li>
                    <li>Do not include a header row</li>
                </ul>
                <p className="my-1 font-medium">Example CSV content:</p>
                <code className="text-yellow-700 dark:text-yellow-300">
                    /source-url,/target-url<br/>
                    /old-page,/new-page<br/>
                    /oldsite,/newsite<br/>
                    /abc,/full-page<br/>
                </code>
            </div>
            <Button variant={'default'} onClick={downloadTemplate}>
                <DownloadIcon/>
                Download Template CSV
            </Button>
        </div>
    )
}