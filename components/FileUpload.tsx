import React, { ChangeEvent } from 'react'
import {Input} from "@/components/ui/input";

interface FileUploadProps {
    onFileSelect: (file: File) => void
    ref: React.RefObject<HTMLInputElement>
    disabled: boolean
}

export default function FileUpload({ onFileSelect, disabled, ref}: FileUploadProps) {
    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            onFileSelect(file)
        }
    }

    return (
        <div className="mb-4">
            <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="disabled:cursor-not-allowed"
                disabled={disabled}
                ref={ref}
            />
        </div>
    )
}