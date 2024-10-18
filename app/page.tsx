import RedirectChecker from '@/components/RedirectChecker'

export default function Home() {
    return (
        <main className="w-full">
            <section className="py-10 min-h-screen">
                <div className="container">
                    <div className="w-full">
                        <h1 className="font-bold text-4xl leading-tight text-white text-center mb-8">Redirect Checker</h1>
                        <RedirectChecker />
                    </div>
                </div>
            </section>
        </main>
    )
}