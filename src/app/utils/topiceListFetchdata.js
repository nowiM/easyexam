const topiceListFetchdata = async (url, cache) => {
    const response = await fetch(url, cache);
    const topices = await response.json();

    return topices;
}

export default topiceListFetchdata;