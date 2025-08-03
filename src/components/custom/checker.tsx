'use client'
import React, { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader, WandSparkles } from 'lucide-react'
import { toast } from 'sonner'
import { RedirectEntry, RedirectStatus } from '@/lib/types'
import checkRedirect from '@/lib/results/checkRedirect'
import { nanoid } from 'nanoid'
import { CreateResult } from '@/lib/results/create'
import { useRouter } from 'next/navigation'
import ProgressBar from '@/components/custom/progressBar'
import { Result } from '@/payload-types'


export default function Checker() {
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const router = useRouter();


  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
    }
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

  async function checkURLs(){
    if(!baseUrl) {toast('Please enter a base URL');return;}
    if(!file){toast('Please select a CSV file');return;}
    setIsLoading(true);
    setInputDisabled(true);
    const urlsToCheck = await processFile(file);
    const newResults: RedirectEntry[] = [];
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
    const transformedResults:Omit<Result, 'id' | 'sizes' | 'createdAt' | 'deletedAt' | 'updatedAt'> = {
      title: nanoid(),
      redirects: newResults.map(item=>({
        source_url:item.sourceUrl,
        target_url:item.targetUrl,
        redirected_url:item.redirectedUrl,
        status_code:item.statusCode,
        status:item.status,
        message:item.message,
        needs_update:item.needsUpdate
      }))
    };
    const createResult = await CreateResult(transformedResults)
    router.push(`/result/${createResult.title}`);
  }

  return (
    <div>
      <Card className="w-full">
        <CardHeader className="text-center text-primary">
          <CardTitle className="text-left">301 checker</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="">
            <Input
              className="disabled:cursor-not-allowed"
              id="base_url"
              type="url"
              placeholder="Enter Base URL"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              disabled={inputDisabled}
              required
            />
            <p className="text-sm italic my-0">
              Please add base url without the forward slash (/) at the end
            </p>
          </div>
          <div className="">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className={'disabled:cursor-not-allowed'}
              disabled={inputDisabled}
              ref={fileInputRef}
            />
          </div>
          <div className="flex">
            <Button
              onClick={checkURLs}
              variant={'default'}
              disabled={isLoading}
              className={'disabled:cursor-not-allowed cursor-pointer'}
            >
              {
                isLoading
                  ?
                  <>
                    <Loader className="transition-all animate-spin" />
                    Checking
                  </>
                  :
                  <>
                    <WandSparkles />
                    Check Redirects
                  </>
              }
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="">
        {isLoading && <ProgressBar progress={progress} />}
      </div>
    </div>
  )
}
