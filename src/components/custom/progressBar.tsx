import React from 'react';
import {Progress} from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
}

export default function ProgressBar({progress: progress}: ProgressBarProps) {
  return(
    <>
      <div className="mt-4 cursor-progress py-5">
        <div className="flex justify-end items-center">
          <p className="text-sm">{progress}% / 100%</p>
        </div>
        <Progress value={progress}/>
      </div>
    </>
  )
}