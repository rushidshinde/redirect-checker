'use client'
import {useEffect, useState} from 'react';

export default function ConsolePrint() {
    const [printed, setPrinted] = useState<boolean>(false);

    useEffect(() => {
        if (!printed) {
            console.log("%cHey there! 🎉 You've found me!", "color: #e11d48; font-size: 82px;");
            console.log("%cIf you're up for creating something awesome, check out my GitHub: https://github.com/rushidshinde. Let's make some magic! ✨", "color: #10b981; font-size: 20px;");
        }
        setPrinted(true);
    }, [printed]);

    return null;
}

