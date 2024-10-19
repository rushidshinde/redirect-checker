import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    try {
        const response = await axios.head(url, {
            maxRedirects: 5, // Allow up to 5 redirects
            validateStatus: () => true
        })

        const redirectedUrl = response.request.res.responseUrl || url
        const statusCode = response.status

        return NextResponse.json({
            redirectedUrl,
            statusCode,
            originalUrl: url
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'An error occurred while checking the redirect' }, { status: 500 })
    }
}