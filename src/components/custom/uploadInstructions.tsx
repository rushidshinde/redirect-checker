'use client'
import React from 'react'
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {DownloadIcon} from "@radix-ui/react-icons";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";

export default function UploadInstructions() {
    const downloadTemplate = () => {
        const link = document.createElement('a');
        link.href = '/file/redirection-checker-template-csv-file.csv';
        link.setAttribute('download', 'redirection-template.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const templateUrls = [
        {
            src: "/source-url",
            tar: "/target-url",
        },
        {
            src: "/old-page",
            tar: "/new-page",
        },
        {
            src: "/oldsite",
            tar: "/newsite",
        },
        {
            src: "/abc",
            tar: "/full-page",
        },
    ]
    return (
        <div className="w-full flex flex-col items-center">
            <Card className="w-full max-w-3xl">
                <CardHeader className="">
                    <CardTitle className="text-xl">File Upload Instructions (CSV Format)</CardTitle>
                    <CardDescription>
                        Please upload a .csv file that meets the following requirements:
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                    <h2 className="">Format Guidelines:</h2>
                    <ul className="list-disc list-inside">
                        <li className="">Each row must contain two relative URLs, separated by a comma:</li>
                        <ul className="list-[square] list-inside ms-5">
                            <li className="">First column: Source URL (the URL to be checked)</li>
                            <li className="">Second column: Target URL (the expected destination)</li>
                        </ul>
                        <li className="">Use only relative paths starting with a forward slash (/)</li>
                        <li className="">Do not include:</li>
                        <ul className="list-[square] list-inside ms-5">
                            <li className="">Domain names</li>
                            <li className="">A header row</li>
                        </ul>
                    </ul>
                </CardContent>
                <CardFooter>
                    <CardAction>
                        <Button variant={'default'} onClick={downloadTemplate}>
                            <DownloadIcon/>
                            Download Template CSV
                        </Button>
                    </CardAction>
                </CardFooter>
                <CardContent className="">
                    <Table>
                        <TableBody>
                            {
                                templateUrls.map((item, index)=>(
                                    <TableRow key={index}>
                                        <TableCell>{item.src}</TableCell>
                                        <TableCell>{item.tar}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
