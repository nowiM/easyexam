const answerFetchData = async (id, url) => {
    const response = await fetch(url);
    const data = await response.json();
    const currentData = data.find(item => item.id === id) || { id, answers: [] };

    return currentData;
}

export default answerFetchData;