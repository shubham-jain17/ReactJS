const options = { method: 'GET', headers: { accept: 'application/json' } };

async function GetOHCLdata(timeFrame = '1h', startTime, limit = '100') {
    try {
        const response = await fetch('https://api-pub.bitfinex.com/v2/candles/trade%3A' + timeFrame + '%3AtBTCUSD/hist' + '?start=' + startTime + '&limit=' + limit, options);
        const data = await response.json();
        return data; // Return the fetched data
    } catch (err) {
        console.error(err);
        //throw err; // Re-throw the error to be handled by the caller
    }
}

export default GetOHCLdata;