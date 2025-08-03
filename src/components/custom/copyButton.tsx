import React, { useState } from 'react'
import { Copy, CopyCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CopyButtonProps {
  content: string;
}

export default function CopyButton({content}: CopyButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <Button
      variant={'default'}
      onClick={handleCopy}
      className="cursor-copy"
    >
      {copied ? <><CopyCheck />Copied</> : <><Copy />Copy Link</> }

    </Button>
  )
}
