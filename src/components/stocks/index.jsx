import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import ChartBox from '../ChartBox'

const columns = [
    // name
    // close
    // high
    // open
    // volume*
    // {
    //     field: 'id',
    //     headerName: 'ID',
    //     width: 30
    // },
    {
        field: 'name',
        headerName: 'Symbol',
        width: 100,
        editable: true,
        cellClassName: 'super-app-theme--cell'
    },
    {
        field: 'close',
        headerName: 'Close',
        width: 100,
        editable: true
    },
    {
        field: 'high',
        headerName: 'High',
        width: 100,
        editable: true
    },
    {
        field: 'open',
        headerName: 'Open',
        width: 100,
        editable: true
    },
    {
        field: 'volume',
        headerName: 'Volume',
        width: 100,
        editable: true
    }
]

const Stocks = () => {
    const [data, setData] = useState([])

    const options = {
        method: 'GET',
        url: 'https://yfapi.net/v1/finance/trending/US',
        headers: {
            'x-api-key': 'eDwjmEGms52LdN07k1UCvawWqw7pHDFo86gE6xw8'
        }
    }

    const formatData = (id, name, close, high, open, volume) => {
        return { id, name, close, high, open, volume }
    }

    useEffect(() => {
        axios.request(options).then((res) => {
            // if (res.finance.error !== 'null') 
            if (res.data.finance.error !== 'null '){
                // console.log(res.data.finance.result[0].quotes)
                const symbols = res.data.finance.result[0].quotes;
                // console.log(symbols)

                let currTicker = '';

                let stockOptions = {
                    method: 'GET',
                    url: '',
                    headers: {
                        'x-api-key': 'eDwjmEGms52LdN07k1UCvawWqw7pHDFo86gE6xw8'
                    },
                    params: {
                        range: '1d',
                        region: 'US',
                        interval: '1d',
                        ticker: ''
                    }
                };


                for (let i=0; i<symbols.length; i++) {
                    // console.log('symbol: ' + symbols[i].symbol)
                    currTicker = symbols[i].symbol;
                    stockOptions.url = `https://yfapi.net/v8/finance/chart/${currTicker}`
                    stockOptions.params.ticker = currTicker;

                    // console.log(stockOptions.params.ticker)

                    axios.request(stockOptions).then((res) => {
                        let timestamps = [];
                        let formattedList = [];
                        if (res.status == 200) {
                            // name
                            // close
                            // high
                            // open
                            // volume*
                            // console.log('volume: '+res.data.chart.result[0].indicators.quote[0].volume.length)
                            let stockData = res.data.chart.result[0].indicators.quote[0]
                            // console.log(stockData.close[0])
                            // console.log(stockData.high[0])
                            // console.log(stockData.open[0])
                            // console.log(stockData.volume[0])
                            // timestamps = res.data.chart.result[0].timestamp;
                            // console.log('timestamps: '+timestamps.length)
                            // console.log(symbols[i].symbol)
                            const formatted = formatData(i, symbols[i].symbol, stockData.close[0], stockData.high[0], stockData.open[0], stockData.volume[0])
                            // console.log('formatted data: '+formatted.name)
                            formattedList = [...formattedList, formatted];
                            setData(data => [...data, formatted])
                        }

                        // console.log(data)
                    })
                    .catch(err => {
                        console.error(err)
                    })
                }
            }
        })
            .catch(err => {
                console.error(err)
            })
    }, [])
    
    return (
        <ChartBox
            sx={{ 
                borderRadius: 0,
                height: '100%', 
                width: '100%',
                "& .MuiDataGrid-root": {
                    color: '#fff',
                    border: 'none',
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: '1px solid #313232 !important'
                },
                "& .MuiDataGrid-columnSeparator": {
                    visibility: "hidden"
                },
                "& .MuiDataGrid-columnHeaders": {
                    color: '#ff80ff',
                    // backgroundColor: '#8884d8',
                    borderRadius: 0
                },
                "& .footer": {
                    color: '#fff'
                },
                '& .super-app-theme--cell': {
                    // backgroundColor: 'rgba(136, 132, 216, .7)',
                    color: '#ffccff',
                },
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box width='100%' height='20px' sx={{ ml: '2rem', mt: '1rem', color: 'lightgrey', textAlign: 'left', fontStyle: 'italic' }}>Stocks</Box>
            <DataGrid 
                rows={data || []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10
                        }
                    }
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
            />
        </ChartBox>
    )
}

export default Stocks