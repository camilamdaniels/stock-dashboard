import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Box
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ChartBox from '../ChartBox'
import clsx from 'clsx'

const columns = [
    // short name
    // reg mkt price
    // prv close price 
    // percent change
    // amt change
    // {
    //     field: 'id',
    //     headerName: 'ID',
    //     width: 30,
    // },
    {
        field: 'name',
        headerName: 'Name',
        width: 100,
        editable: true,
        cellClassName: 'super-app-theme--cell'
    },
    {
        field: 'lastPrice',
        headerName: 'Mkt Price',
        width: 100,
        editable: true
    },
    {
        field: 'previousPrice',
        headerName: 'Prv Close',
        width: 100,
        editable: true
    },
    {
        field: 'percentChange',
        headerName: '% Change',
        width: 100,
        editable: true,
        cellClassName: (params) => {
            if (params.value == null) return ''

            return clsx('super-app', {
                negative: parseFloat(params.value) < 0,
                positive: parseFloat(params.value) > 0
            })
        }
    },
    {
        field: 'priceChange',
        headerName: 'Amt Change',
        width: 100,
        editable: true
    }
]

const Indices = () => {

    const [data, setData] = useState([])

    const marketOptions = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote/marketSummary',
        headers: {
            'x-api-key': 'eDwjmEGms52LdN07k1UCvawWqw7pHDFo86gE6xw8'
        }
    }

    const formatData = (id, name, lastPrice, previousPrice, percentChange, priceChange) => {
        return { id, name, lastPrice, previousPrice, percentChange, priceChange }
    }

    // let formattedList = [];

    useEffect(() => {

        axios.request(marketOptions).then((res) => {
            let formattedList = [];

            if (res.data.marketSummaryResponse.error !== 'null') {
                const marketList = res.data.marketSummaryResponse.result;

                for (let i=0; i < marketList.length; i++) {
                    // console.log(marketList[i])
                    console.log(parseFloat(marketList[i].regularMarketChangePercent.fmt))
                    const formatted = formatData(i, marketList[i].shortName, marketList[i].regularMarketPrice.fmt, marketList[i].regularMarketPreviousClose.fmt, marketList[i].regularMarketChangePercent.fmt, marketList[i].regularMarketChange.fmt)
                    // console.log(formatted)
                    formattedList = [...formattedList, formatted]
                    setData(data => [...data, formatted])
                }
            }

            // console.log(formattedList)
            // setData([...data, formattedList])
            // console.log(data)
        })
            .catch(err => {
                console.error(err)
            })
        // console.log(formattedList)
    }, [])

    return (
        <ChartBox 
            sx={{ 
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
                    // color: '#fff',
                    // backgroundColor: 'rgb(231, 84, 128, .3)'
                    color: '#8884d8',
                    borderRadius: 0
                },
                "& .MuiDataGrid-footer": {
                    color: '#e75480'
                },
                '& .super-app-theme--cell': {
                    // backgroundColor: 'rgba(136, 132, 216, .7)',
                    color: '#c4c2ec',
                },
                '& .super-app.negative': {
                    backgroundColor: 'rgba(136, 132, 216, .3)',
                    color: '#fff',
                },
                '& .super-app.positive': {
                    backgroundColor: 'rgba(255, 255, 255, .1)',
                    color: '#c4c2ec',
                }
            }}
        >
            <DataGrid
                rows={data || []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </ChartBox>
    )
}

export default Indices
