import React, { useMemo, useState, useEffect }from 'react'
import ChartBox from './ChartBox'
import {
  Box,
  useMediaQuery,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'
import FlexBetween from './FlexBetween'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ScatterChart,
  Scatter
} from 'recharts'
import regression, { DataPoint } from 'regression'
import axios from 'axios'

const Regression = () => {
  const [isPredictions, setIsPredictions] = useState(false)
  const [data, setData] = useState([])
  const [stock, setStock] = useState('AAPL')

  const handleChange = (e) => {
    setStock(e.target.value)
    setData([])
  }

  const options = {
    method: 'GET',
    url: `https://yfapi.net/v8/finance/chart/${stock}`,
    headers: {
      'x-api-key': 'eDwjmEGms52LdN07k1UCvawWqw7pHDFo86gE6xw8'
    },
    params: {
      range: '6mo',
      region: 'US',
      interval: '1d',
      ticker: stock
    }
  }

  const stocks = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'NVDA', 'TSLA', 'META', 'XOM', 'WMT', 'JPM', 'KO', 'BAC', 'CSCO', 'MCD', 'PFE', 'NFLX', 'AMD', 'DIS', 'INTC', 'GE']
  const menuItems = stocks.map(stock => <MenuItem key={stock} value={stock}>{stock}</MenuItem>)

  const formatData = (date, high) => {
    return { date, high}
  }

  let formatted = []

  useEffect(() => {
    let timestamps = []
    let stockData = []

    axios.request(options).then((res) => {
      if (res.data.chart.error != 'null') {
        stockData = res.data.chart.result[0].indicators.quote[0]
        timestamps = res.data.chart.result[0].timestamp

        for (let i=0; i<100; i++) {
          const time = timestamps[i]
          const date = new Date(timestamps[i]*1000)

          const formattedDate = date.getMonth()+'-'+date.getDate()
          const high = stockData.high[i]
          const low = stockData.low[i]
          const curr = formatData(formattedDate, high)

          formatted.push(curr)
          setData(data => [...data, curr])
        }
      }
    })
    .catch(err => {
      console.error(err)
    })
  }, [stock])

  return (
    <div width='100%'>
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

            <ResponsiveContainer width="95%" height={800}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <XAxis type="category" dataKey="date" name="date" axisLine={false} tick={false}/>
                <YAxis type="number" dataKey="high" name="high" unit=" USD" tickLine={false} axisLine={false}/>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name={stock} data={data} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
    </div>
  )
}

export default Regression