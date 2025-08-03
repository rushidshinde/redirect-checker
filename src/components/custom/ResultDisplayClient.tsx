'use client'
import React, { useEffect, useState } from 'react'
import { Result } from '@/payload-types'
import { RedirectStatus } from '@/lib/types'
import {DownloadIcon, ResetIcon} from "@radix-ui/react-icons";
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import StatFilter from '@/components/custom/StatFilter'
import ResultDisplay from '@/components/custom/resultDisplay'
import FormattedDate from '@/components/custom/dateFormatter'
import CopyButton from '@/components/custom/copyButton'
import { usePathname } from 'next/navigation'

export default function ResultDisplayClient({result, date}: {result: Result["redirects"], date: string}) {
  const path = usePathname();
  const [activeFilter, setActiveFilter] = useState<RedirectStatus | 'all'>('all');
  const [filteredResults, setFilteredResults] = useState<Result["redirects"]>(null);
  const [resultView, setResultView] = useState<'grid' | 'list'>('grid');
  const [absoluteUrl, setAbsoluteUrl] = useState("");

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
      + result?.map(result => `${result.source_url},${result.target_url},${result.redirected_url},${result.status_code},${result.status},${result.message},${result.needs_update ? 'Yes' : 'No'}`).join("\n");
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `redirect_results_${day}_${month}_${year}_${hours}_${minutes}_${seconds}.csv`);
    document.body.appendChild(link);
    link.click();
  }

  useEffect(() => {
    if (activeFilter === 'all'){
      setFilteredResults(result);
    } else {
      setFilteredResults(result?.filter(result => result.status === activeFilter));
    }
  }, [activeFilter, result]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setAbsoluteUrl(`${origin}${path}`);
    }
  }, [path]);

  return (
    <div>
      <div className="flex mb-10">
        <p className="text-xl">Report from <time dateTime={date}><FormattedDate isoDate={date}/></time></p>
      </div>
      <div className="flex justify-between items-center">
        <Button
          variant={'destructive'}
          disabled={result?.length === 0}
          asChild={true}
        >
          <Link href="/">
            <ResetIcon />
            Check new file
          </Link>
        </Button>
        <div className="flex flex-wrap gap-5">
          <CopyButton content={absoluteUrl}/>
          <Button
            variant={'default'}
            onClick={downloadResults}
            className="cursor-pointer"
            disabled={result?.length === 0}
          >
            <DownloadIcon />
            Download Results
          </Button>
        </div>
      </div>
      <hr className="my-8" />
      <StatFilter results={result} activeFilter={activeFilter} setActiveFilter={setActiveFilter} resultView={resultView} setResultView={setResultView} />
      <ResultDisplay results={filteredResults} resultView={resultView}/>

    </div>
  )
}
