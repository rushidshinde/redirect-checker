import React from 'react'

export default function UploadInstructions() {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col gap-3 bg-zinc-800 border border-blue-700 shadow-md rounded-2xl p-8 md:p-4">
                <h2 className="text-lg font-medium text-center">File Upload Instructions</h2>
                <p className="">Please upload a CSV file (.csv) with the following format:</p>
                <ul className="text-md list-disc list-inside">
                    <li>Each row should contain two URLs separated by a comma</li>
                    <li>The first column is the source URL (URL to check)</li>
                    <li>The second column is the target URL (expected final URL)</li>
                    <li>Do not include a header row</li>
                </ul>
                <div className="">
                    <p className="font-medium">Example CSV content:</p>
                    <code className="text-sm text-yellow-300">
                        <p>
                            /source-url,/target-url<br/>
                            /old-page,/new-page<br/>
                            /oldsite,/newsite<br/>
                            /abc,/full-page<br/>
                        </p>
                    </code>
                </div>
            </div>
        </div>
    )
}