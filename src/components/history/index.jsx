import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
    BarChart, 
    Bar, 
    Cell, 
    XAxis, 
    YAxis, 
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Label
} from 'recharts'
import Header from '../Header'

const History = () => {
    const [data, setData] = useState([])
    const [change, setChange] = useState([])
    const [percent, setPercent] = useState([])

    const testData = [
        {
            name: 'TSLA',
            amt: 24,
        },
        {
            name: 'SBUX',
            amt: 13,
        },
        {
            name: 'GOOG',
            amt: 98,
        },
        {
            name: 'APO',
            amt: -39,
        },
        {
            name: 'META',
            amt: -48,
        },
        {
            name: 'AAPL',
            amt: -38,
        }
    ]

    const stockOptions = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote',
        headers: {
            'x-api-key': 'eDwjmEGms52LdN07k1UCvawWqw7pHDFo86gE6xw8'
        },
        params: {
            symbols: 'AAPL,META,APO,GOOG,SBUX,TSLA'
        }
    }

    const formatData = (name, amt) => {
        return { name, amt }
    }

    useEffect(() => {

        let fiftyDayAverage = []
        let fiftyDayAverageChange = []
        let fiftyDayAverageChangePercent = []

        axios.request(stockOptions).then((res) => {

            console.log(res)

            if (res.data.quoteResponse.error == null) {
                // console.log(res.data.quoteResponse.result)
                console.log(typeof res.data.quoteResponse.error)

                const resArray = res.data.quoteResponse.result
                for (let i=0; i<resArray.length; i++) {
                    // console.log(resArray[i].symbol) // ticker symbol
                    // console.log(resArray[i].fiftyDayAverage)
                    // console.log(resArray[i].fiftyDayAverageChange)
                    // console.log(resArray[i].fiftyDayAverageChangePercent)

                    const avg = formatData(resArray[i].symbol, resArray[i].fiftyDayAverage)
                    const avgChange = formatData(resArray[i].symbol, resArray[i].fiftyDayAverageChange)
                    const percentChange = formatData(resArray[i].symbol, resArray[i].fiftyDayAverageChangePercent)

                    fiftyDayAverage = [...fiftyDayAverage, avg]
                    fiftyDayAverageChange = [...fiftyDayAverageChange, avgChange]
                    fiftyDayAverageChangePercent = [...fiftyDayAverageChangePercent, percentChange]

                    // fiftyDayAverage.push()
                    // fiftyDayAverageChange.push()
                    // fiftyDayAverageChangePercent.push()
                }

                console.log(fiftyDayAverage)
                console.log(fiftyDayAverageChange)
                console.log(fiftyDayAverageChangePercent)

                setData(fiftyDayAverage)
                setChange(fiftyDayAverageChange)
                setPercent(fiftyDayAverageChangePercent)
            }

            console.log(data)
            console.log(change)
            console.log(percent)
        })
        .catch(err => {
            console.error(err)
        })
    }, [data])

    return (
        <>
            <ResponsiveContainer height='100%'>
                    <BarChart
                        data={data}
                        layout='vertical'
                    >
                        <XAxis type='number' tick={false} axisLine={false}>
                            <Label value="avg price" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis dataKey='name' stroke='white' type='category' tickLine={false} axisLine={false}/>
                        <Bar dataKey='amt' fill='#8884d8'/>
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer height='100%'>
                    <BarChart
                        data={change}
                        layout='vertical'
                    >
                        <XAxis type='number' tick={false} axisLine={false}>
                            <Label value="avg change" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis dataKey='name' stroke='white' type='category' tickLine={false} axisLine={false}/>
                        <Bar dataKey='amt' fill='#8884d8'/>
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer height='100%'>
                    <BarChart
                        data={percent}
                        layout='vertical'
                    >
                        <Tooltip />
                        <XAxis type='number' tick={false} axisLine={false}>
                            <Label value="% change" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis dataKey='name' stroke='white' type='category' tickLine={false} axisLine={false}/>
                        {/* <Bar dataKey='pv' fill='#884d8' label={{ position: 'left' }}/> */}
                        <Bar dataKey='amt' fill='#8884d8'/>
                    </BarChart>
                </ResponsiveContainer>
        </>
    )
}

export default History