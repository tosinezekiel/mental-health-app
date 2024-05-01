import { useEffect, useState } from 'react'

type HttpMethod = 'GET' | 'POST';

const useFetch = (url: string, method: HttpMethod = 'GET', body?: unknown, headers?: HeadersInit) => {

    const [data, setData] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const options: RequestInit = {
                    method,
                    headers,
                    body: JSON.stringify(body),
                };
                const response = await fetch(url, options);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const result : unknown = await response.json();
                setData(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData()
            .catch((error) => {
                setError(error as Error);
                setIsLoading(false);
            });
    }, [url, method, body, headers]);

    return { data, isLoading, error };
}

export default useFetch
