import axios from 'axios';

export default async function checkRedirect(url: string): Promise<string> {
    try {
        const response = await axios.get(`/api/checkRedirect?url=${encodeURIComponent(url)}`);
        return response.data.redirectedUrl || url; // Return the original URL if no redirect
    } catch (error) {
        console.error(error);
        return url; // Return the original URL if an error occurs
    }
}