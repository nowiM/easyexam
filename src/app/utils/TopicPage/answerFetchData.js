const answerFetchData = async (id, url) => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    //data에 일치하는 data가 없는 경우 currentData에 어떻게 저장할 것인지
    const currentData = data.find(item => item.id === id) || { id, answers: [] };

    return currentData;
}

export default answerFetchData;