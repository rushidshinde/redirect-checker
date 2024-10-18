import RedirectChecker from '@/components/RedirectChecker'
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-full">
            <section className="py-10 min-h-[calc(100vh-40px)]">
                <div className="container">
                    <div className="w-full">
                        <h1 className="font-bold text-4xl leading-tight text-white text-center mb-8">Redirect Checker</h1>
                        <RedirectChecker />
                    </div>
                </div>
            </section>
            <footer className="w-full bg-cyan-950">
                <div className="container">
                    <div className="w-full h-10 text-center flex justify-center items-center">
                        <p>Developed by <Link className="underline font-medium" href="https://github.com/rushidshinde">Rushi</Link></p>
                    </div>
                </div>
            </footer>
        </main>
    )
}