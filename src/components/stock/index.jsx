import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar, BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts'
import { 
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@mui/material'
import Header from '../Header'
import FlexBetween from '../FlexBetween'

const Stock = () => {
    const [data, setData] = useState([])
    const [stock, setStock] = useState('AAPL')

    const handleChange = (e) => {
        setStock(e.target.value)
        setData([])
        console.log(stock)
    }

    const options = {
        method: 'GET',
        // url: `https://yfapi.net/v8/finance/chart/${symbol}`,
        url: `https://yfapi.net/v8/finance/chart/${stock}`,
        headers: {
            'x-api-key': 'eDwjmEGms52LdN07k1UCvawWqw7pHDFo86gE6xw8'
        },
        params: {
            range: '6mo',
            region: 'US',
            interval: '1d',
            // ticker: `${symbol}`
            ticker: stock
        }

    }

    const stocks = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'NVDA', 'TSLA', 'META', 'XOM', 'WMT', 'JPM', 'KO', 'BAC', 'CSCO', 'MCD', 'PFE', 'NFLX', 'AMD', 'DIS', 'INTC', 'GE']

    const menuItems = stocks.map(stock => <MenuItem key={stock} value={stock}>{stock}</MenuItem>)
    // recharts needs an array of objects - this method returns one object per timestamp

    // const formatData = (name, uv, pv) => {
    //     // structure of each object:
    //         // name: timestamp (converted to date)
    //         // uv: high
    //         // pv: low
    //     return { name, uv, pv, amt: 0 }
    // }

    const formatData = (name, high, low) => {
        // structure of each object:
            // name: timestamp (converted to date)
            // uv: high
            // pv: low
        return { name, high, low, amt: 0 }
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
                // setData(data => [...formatted])
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
    }, [stock])

    return (
        <div style={{ width: '100%' }}> 
            <Header />
            <FlexBetween
                mb='0.25rem'
                p='1rem 1rem'
            >
                <FlexBetween gap='2rem' color='lightgray'>
                    90-Day Summary
                </FlexBetween>

                <FlexBetween gap='2rem'>
                    <FormControl 
                        variant='standard' 
                        sx={{ 
                            m: 1, 
                            minWidth: 120, 
                            justifyContent: 'space-between'
                        }}
                    >
                        <InputLabel id='demo-simple-select-standard-label'>Stock</InputLabel>
                        <Select
                            labelId='demo-simple-select-standard-label'
                            id='demo-simple-select-standard'
                            value={stock}
                            onChange={handleChange}
                            label='Stock'
                            sx={{ color: 'white', float: 'right', position: 'relative' }}
                        >
                            {menuItems}
                        </Select>
                    </FormControl>
                </FlexBetween>
                
            </FlexBetween>
            
            <ResponsiveContainer width="100%" height={800}>
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
                        <YAxis stroke='white' domain={[100, 250]} axisLine={false} tickLine={false}/>
                        <Tooltip />
                        {/* <Legend /> */}
                        <Line type="monotone" dataKey="high" stroke='#8884d8' dot={false}/>
                        <Line type="monotone" dataKey="low" stroke="#aca9e4" dot={false} />
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
                        <XAxis dataKey="name" axisLine={false} tick={false}/>
                        <YAxis stroke='white' axisLine={false} tickLine={false}/>
                        <Tooltip />
                        <Bar dataKey="high" fill='#8884d8' />
                        <Bar dataKey="low" fill="#aca9e4" />
                    </BarChart>
                </ResponsiveContainer>
                {/* <ResponsiveContainer width="100%" height={200}>
                    <ComposedChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        bottom: 5,
                        left: 20,
                    }}
                    >
                    <CartesianGrid vertical={false} horizontal={false} />
                    <XAxis dataKey="name" scale="band" axisLine={false} tick={false} />
                    <YAxis stroke='white' axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="high" barSize={20} fill="#8884d8" />
                    <Line type="monotone" dataKey="high" stroke="#ff7300" />
                    </ComposedChart>
                </ResponsiveContainer> */}
        </div>
    )
}

export default Stock