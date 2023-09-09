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
    {
        field: 'id',
        headerName: 'ID',
        width: 30,
    },
    {
        field: 'name',
        headerName: 'Short Name',
        width: 100,
        editable: true
    },
    {
        field: 'lastPrice',
        headerName: 'Reg Mkt Price',
        width: 100,
        editable: true
    },
    {
        field: 'previousPrice',
        headerName: 'Prv Close Price',
        width: 100,
        editable: true
    },
    {
        field: 'percentChange',
        headerName: '% Change',
        width: 100,
        editable: true
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
                height: 400, 
                "& .MuiDataGrid-root": {
                    color: '#7f7f7f',
                    border: 'none',
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: '1px solid #313232 !important'
                },
                "& .MuiDataGrid-columnSeparator": {
                    visibility: "hidden"
                },
                "& .MuiDataGrid-columnHeaders": {
                    color: '#fff',
                    backgroundColor: 'rgb(231, 84, 128, .3)'
                },
                "& .footer": {
                    color: '#e75480'
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
