import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar, BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Box } from '@mui/material'

const Stock = () => {
    const [data, setData] = useState([])

    const options = {
        method: 'GET',
        // url: `https://yfapi.net/v8/finance/chart/${symbol}`,
        url: 'https://yfapi.net/v8/finance/chart/AAPL',
        headers: {
            'x-api-key': 'eDwjmEGms52LdN07k1UCvawWqw7pHDFo86gE6xw8'
        },
        params: {
            range: '6mo',
            region: 'US',
            interval: '1d',
            // ticker: `${symbol}`
            ticker: 'AAPL'
        }

    }

    // recharts needs an array of objects - this method returns one object per timestamp

    const formatData = (name, uv, pv) => {
        // structure of each object:
            // name: timestamp (converted to date)
            // uv: high
            // pv: low
        return { name, uv, pv, amt: 0 }
    }

    let formatted = []

    useEffect(() => {
        let timestamps = []
        let stockData = []
        // let formatted = []
        axios.request(options).then((res) => {
            // console.log(res)
            if (res.data.chart.error != 'null') {
                stockData = res.data.chart.result[0].indicators.quote[0]
                // console.log(stockData)
                // if you iterate through stockData and timestamps at the same time, you can retrieve data for each day from day0 - day128 
                timestamps = res.data.chart.result[0].timestamp;
                // console.log('timestamps: '+timestamps)

                for (let i = 0; i < 100; i++) {
                    const time = timestamps[i];
                    const date = new Date(timestamps[i] * 1000)
                    // console.log(date.getMonth())
                    // console.log(date.getDate())
                    const formattedDate = date.getMonth()+'-'+date.getDate()
                    const high = stockData.high[i];
                    const low = stockData.low[i];
                    const curr = formatData(formattedDate, high, low)
                    // console.log(curr)
                    formatted.push(curr)
                    setData(data => [...data, curr])
                }
                // setTimeout(() => {
                //     setData([...data, formatted])
                //     console.log('state during timeout: '+data)
                //     console.log(formatted)
                //   }, 5000);
                // setData(data => [...data, formatted])
                // console.log(data)
                // console.log(formatted)
            }
        })
        .catch(err => {
            console.error(err)
        })
        // setData([...data, formatted])
        console.log(data)
        console.log(formatted)
    }, [setData])

    return (
        <div style={{ width: '100%' }}> 
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                        <CartesianGrid vertical={false} horizontal={false} />
                        {/* <XAxis dataKey="name" axisLine={false} tickLine={false}/> */}
                        <YAxis domain={[100, 250]} axisLine={false} tickLine={false}/>
                        <Tooltip />
                        {/* <Legend /> */}
                        <Line type="monotone" dataKey="uv" stroke="#e75480" dot={false}/>
                        <Line type="monotone" dataKey="pv" stroke="#ee87a6" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false}/>
                        <YAxis axisLine={false} tickLine={false}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#ee87a6" />
                        <Bar dataKey="uv" fill="#e75480" />
                    </BarChart>
                </ResponsiveContainer>
        </div>
    )
}

export default Stock