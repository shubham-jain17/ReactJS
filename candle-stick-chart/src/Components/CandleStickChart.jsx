import Chart from 'react-apexcharts'
import GetOHCLdata from '../Services/OHLCService';
import { useEffect, useState } from 'react';
import bitfinex from '../Images/bifinex.png';
import OHCLLabel from './OHCLLabel';

export default function CandleStickChart() {
    //#region States and variables 
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const todaysTimestamp = now.getTime().toString();
    const [candleData, setCandleData] = useState([]);
    const [shouldfetch, setShouldFetch] = useState(true);
    const [timeFrame, setTimeFrame] = useState('1m');
    const [startTime, setStartTime] = useState(todaysTimestamp);
    const [limit, setLimit] = useState('100');
    const [hoverData, setHoverData] = useState([]);
    //#endregion

    //#region Event Handler
    const handleClick = (e) => {
        setShouldFetch(true);
        const currentDate = new Date();
        switch (e.target.id) {
            case '3y':
                const threeYearsAgo = new Date();
                threeYearsAgo.setFullYear(currentDate.getFullYear() - 3);
                const threeYearsAgoTimestamp = threeYearsAgo.getTime().toString();
                setStartTime(threeYearsAgoTimestamp);
                setTimeFrame('1D');
                setLimit('1000');
                break;
            case '1y':
                const oneYearsAgo = new Date();
                oneYearsAgo.setFullYear(currentDate.getFullYear() - 1);
                const oneYearsAgoTimestamp = oneYearsAgo.getTime().toString();
                setStartTime(oneYearsAgoTimestamp);
                setTimeFrame('1D');
                setLimit('500');
                break;
            case '3m':
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setFullYear(currentDate.getMonth - 3);
                const threeMonthsAgoTimestamp = threeMonthsAgo.getTime().toString();
                setTimeFrame('1D');
                setStartTime(threeMonthsAgoTimestamp);
                setLimit('100');
                break;
            case '1m':
                const oneMonthsAgo = new Date();
                oneMonthsAgo.setFullYear(currentDate.getMonth() - 1);
                const oneMonthsAgoTimestamp = oneMonthsAgo.getTime().toString();
                setStartTime(oneMonthsAgoTimestamp);
                setTimeFrame('1h');
                setLimit('200');
                break;
            case '7d':
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setFullYear(currentDate.getDate() - 7);
                const sevenDaysAgoTimestamp = sevenDaysAgo.getTime().toString();
                setStartTime(sevenDaysAgoTimestamp);
                setTimeFrame('1h');
                setLimit('180');
                break;
            case '1d':
                const oneDaysAgo = new Date();
                oneDaysAgo.setFullYear(currentDate.getDate() - 1);
                const oneDaysAgoTimestamp = oneDaysAgo.getTime().toString();
                setStartTime(oneDaysAgoTimestamp);
                setTimeFrame('1h');
                setLimit('50');
                break;
            case '1h':
                const oneHoursAgo = new Date();
                oneHoursAgo.setFullYear(currentDate.getHours() - 1);
                const oneHoursAgoTimestamp = oneHoursAgo.getTime().toString();
                setStartTime(oneHoursAgoTimestamp);
                setTimeFrame('1m');
                setLimit('50');
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region Apex Chart Configuratio
    const series = [{
        data: [...candleData]
    }]

    const options = {
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#01a781',
                    downward: '#e44b44'
                },
                wick: {
                    useFillColor: true
                }
            }
        },

        chart: {
            type: 'candlestick',
            height: 350,
            background: '#172d3e',
            toolbar: {
                show: false,
            },
            events: {
                mouseMove: (event, chartContext, config) => {
                    if (config.seriesIndex !== -1) {
                        console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex].y);

                        setHoverData(config.config.series[config.seriesIndex].data[config.dataPointIndex].y);

                    }
                }
            }
        },
        title: {
            align: 'left',
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#fff'
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
                style: {
                    colors: '#74818b',
                    fontSize: '12px',
                    cssClass: 'apexcharts-xaxis-label',
                }
            },

        },
        yaxis: {
            opposite: true,
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    colors: '#74818b',
                    fontSize: '12px',
                    cssClass: 'apexcharts-yaxis-label',
                },
                formatter: function (val, index) {
                    return val.toFixed(0);
                }
            }
        }
    }
    //#endregion

    //#region UseEffect hook for api calling
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
    //#endregion

    //#region  JSX Code
    return (
        <div className='Chartblock'>
            <img src={bitfinex}></img>
            <OHCLLabel data={hoverData}></OHCLLabel>
            <Chart
                options={options}
                series={series}
                type="candlestick"
                width="800"
            />
            <button className='custom-button' onClick={handleClick} id='3y'>3y</button>
            <button className='custom-button' onClick={handleClick} id='1y'>1y</button>
            <button className='custom-button' onClick={handleClick} id='3m'>3m</button>
            <button className='custom-button' onClick={handleClick} id='1m'>1m</button>
            <button className='custom-button' onClick={handleClick} id='7d'>7d</button>
            <button className='custom-button' onClick={handleClick} id='1d'>1d</button>
            <button className='custom-button' onClick={handleClick} id='1h'>1h</button>
        </div>
    );
    //#endregion
}






