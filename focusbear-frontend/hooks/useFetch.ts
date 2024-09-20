import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';

/**
 * A general hook for fetching data with React Query.
 * @param {string} path - The dynamic module/path for the API endpoint.
 * @param {object} options - Optional query options such as query parameters.
 */
const useFetch = (path: string, options = {}) => {
    const fetcher = async () => {
        const { data } = await axios.get(SERVER_URL + path, { params: options });
        return data;
    };

    // Using the useQuery hook with dynamic path and options
    return useQuery({ queryKey: [path, options], queryFn: fetcher });  // Provide the query key and the fetcher function
};

export default useFetch;
