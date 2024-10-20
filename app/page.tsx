import RedirectChecker from '@/components/custom/RedirectChecker'
import Header from "@/components/custom/Header";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function Home() {
    return (
        <>
            <div className="w-full max-w-full">
                <Header/>
                <main className="w-full">
                    <section className="">
                        <div className="container py-5">
                            <ScrollArea className="h-[calc(100vh-7.5rem)] w-full">
                                <div className="w-full px-4">
                                    <h1 className="text-center hidden">Redirect Checker</h1>
                                    <RedirectChecker />
                                </div>
                            </ScrollArea>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}