import React from 'react';
import {Progress} from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader } from 'lucide-react'

interface ProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
}

export default function ProgressBar({progress: progress}: ProgressBarProps) {
  return(
    <>
      <div className="">
        <div className="absolute inset-0 z-50 w-full min-w-screeen h-full min-h-screen flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs">
          <div className="container">
            <div className="w-full max-w-[600px] cursor-progress py-5 mx-auto">
              <Card>
                <CardHeader className="flex flex-col justify-center items-center">
                  <CardTitle className="text-lg">Generating report</CardTitle>
                  <CardDescription>
                    <p className="mb-5">Please wait a moment while we compile your data.</p>
                    <div className="w-full flex flex-col justify-center items-center">
                      <Loader className="transition-all animate-[spin_2s_linear_infinite] w-20" width={'100%'} height={'100%'} />
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full flex justify-end items-center">
                    <p className="text-sm">{progress}% / 100%</p>
                  </div>
                  <Progress value={progress}/>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <style>{`body { overflow: hidden; }`}</style>
      </div>
    </>
  )
}