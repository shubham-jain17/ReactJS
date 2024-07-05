import Chart from 'react-apexcharts'
import GetOHCLdata from '../Api/OHLCService';
import { useEffect, useState } from 'react';



export default function CandleStickChart() {

    const now = new Date();

    // Set the time to midnight (00:00:00)
    now.setHours(0, 0, 0, 0);

    // Get the timestamp for today's date at midnight
    const todaysTimestamp = now.getTime().toString();

    const [candleData, setCandleData] = useState([]);
    const [shouldfetch, setShouldFetch] = useState(true);
    const [timeFrame, setTimeFrame] = useState('1h');
    const [startTime, setStartTime] = useState(todaysTimestamp);
    const [limit, setLimit] = useState('100');


    const handleClick = (e) => {

        setShouldFetch(true);

        const currentDate = new Date();
        switch (e.target.id) {
            case '3y':

                // Subtract three years from the current date
                const threeYearsAgo = new Date();
                threeYearsAgo.setFullYear(currentDate.getFullYear() - 3);

                // Get the timestamp (in milliseconds since the Unix epoch) for the date three years ago
                const threeYearsAgoTimestamp = threeYearsAgo.getTime().toString();
                setStartTime(threeYearsAgoTimestamp);
                setTimeFrame('1D');
                setLimit('1000');
                break;
            case '3m':


                // Subtract three years from the current date
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setFullYear(currentDate.getMonth - 3);

                // Get the timestamp (in milliseconds since the Unix epoch) for the date three years ago
                const threeMonthsAgoTimestamp = threeMonthsAgo.getTime().toString();
                setTimeFrame('1D');
                setStartTime(threeMonthsAgoTimestamp);
                setLimit('100');
                break;

            default:
                break;
        }

    }

    const series = [{
        data: [...candleData]

    }]

    const options = {
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: 'CandleStickChart',
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            opposite: true,
            tooltip: {
                enabled: true,

            }
        }
    }




    useEffect(() => {
        const fetchData = async () => {
            const data = await GetOHCLdata(timeFrame, startTime, limit);
            const formatedData = data.map((item) => {
                return {
                    x: new Date(item[0]),
                    y: [item[1], item[3], item[4], item[2]]
                }
            })
            setCandleData(formatedData);
            console.log(formatedData);

        }

        if (shouldfetch) {
            fetchData();
        }


    }, [shouldfetch, timeFrame, startTime, limit])




    return (
        <>
            <Chart
                options={options}
                series={series}
                type="candlestick"
                width="800"
            />
            <button onClick={handleClick} id='3y'>3y</button>
            <button onClick={handleClick} id='1y'>1y</button>
            <button onClick={handleClick} id='3m'>3m</button>
            <button onClick={handleClick} id='1m'>1m</button>
            <button onClick={handleClick} id='7d'>7d</button>
            <button onClick={handleClick} id='1d'>1d</button>
            <button onClick={handleClick} id='1h'>1h</button>
        </>
    );
}






