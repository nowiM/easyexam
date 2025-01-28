export const fetchTopiceData = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            
            return data;
        } else {
            console.error('Failed to fetch topic');
        }
    } catch (error) {
        console.error('Error fetching topic:', error);
    }
};