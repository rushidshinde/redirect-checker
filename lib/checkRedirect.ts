import axios from 'axios';

interface RedirectCheckResult {
    redirectedUrl: string;
    statusCode: number;
    originalUrl: string;
}

export default async function checkRedirect(url: string): Promise<RedirectCheckResult> {
    try {
        const response = await axios.get<RedirectCheckResult>(`/api/checkRedirect?url=${encodeURIComponent(url)}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return {
            redirectedUrl: url,
            statusCode: 0,
            originalUrl: url
        };
    }
}