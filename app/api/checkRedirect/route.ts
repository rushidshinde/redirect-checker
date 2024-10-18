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
            maxRedirects: 0,
            validateStatus: () => true
        })

        return NextResponse.json({ redirectedUrl: response.headers.location || '' })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'An error occurred while checking the redirect' }, { status: 500 })
    }
}