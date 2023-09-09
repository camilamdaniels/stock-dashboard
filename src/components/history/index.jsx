import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const History = () => {
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
        axios.request(options).then((res) => {
            if (res.data.chart.error != 'null') {
                stockData = res.data.chart.result[0].indicators.quote[0]
                timestamps = res.data.chart.result[0].timestamp;

                for (let i = 0; i < 100; i++) {
                    const time = timestamps[i];
                    const date = new Date(timestamps[i] * 1000)
                    const formattedDate = date.getMonth()+'-'+date.getDate()
                    const high = stockData.high[i];
                    const low = stockData.low[i];
                    const curr = formatData(formattedDate, high, low)
                    formatted.push(curr)
                    setData(data => [...data, curr])
                }
            }
        })
        .catch(err => {
            console.error(err)
        })
        console.log(data)
        console.log(formatted)
    }, [setData])

    return (
        <ResponsiveContainer width="100%" height="100%">
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
    )
}

export default History