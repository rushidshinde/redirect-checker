"use client"
import React from 'react';
import {useTheme} from "next-themes";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import UploadInstructions from "@/components/custom/UploadInstructions";

export default function Header() {
    const { setTheme} = useTheme();
    return (
        <>
            <header className="fixed top-0 right-0 left-0 z-20">
                <div className="container">
                    <div className="w-full flex items-center justify-between h-20">
                        <div className="">
                            <div className="brand font-black">
                                <span>301 Checker</span>
                            </div>
                        {/*    Navigation links to add here   */}
                        </div>
                        <div className="flex gap-4 items-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                    >
                                        Instructions
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] rounded-lg">
                                    <UploadInstructions/>
                                </DialogContent>
                            </Dialog>
    
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>
            <div className="h-20"></div>
        </>
            
    );
}