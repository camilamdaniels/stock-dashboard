import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import ChartBox from './ChartBox'
import Indices from './indices'
import Stocks from './stocks'
import Stock from './stock'
import History from './history'

const gridTemplateLargeScreens = `
    "a a b b b"
    "a a b b b"
    "a a b b b"
    "c c b b b"
    "c c d d d"
    "c c d d d"
`

const gridTemplateSmallScreens = `
    "b"
    "b"
    "a"
    "c"
    "c"
    "d"
`

const Dashboard = () => {

    const isAboveMediumScreens = useMediaQuery("(min-width: 800px)")
  return (
        <Box
            width='100%'
            height='100%'
            display='grid'
            gap='1.5rem'
            padding='1rem 1rem'
            sx={
                isAboveMediumScreens ? {
                    gridTemplateColumns: "repeat(5, minmax(250px, 1fr))",
                    gridTemplateRows: "repeat(6, max(111px))",
                    gridTemplateAreas: gridTemplateLargeScreens
                } : {
                    gridAutoColumns: "600px",
                    gridAutoRows: "300px",
                    gridTemplateAreas: gridTemplateSmallScreens
                }
            }
        >
            <ChartBox gridArea='b'>
                <Stock />
            </ChartBox>

            <ChartBox gridArea='a'>
                <Indices />
            </ChartBox>

            <ChartBox gridArea='c'>
                <Stocks />
            </ChartBox>

            <ChartBox gridArea='d'>
                <History />
            </ChartBox>
        </Box>
  )
}

export default Dashboard