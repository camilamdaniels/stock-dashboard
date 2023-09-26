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
    "c c b b b"
    "c c b b b"
    "c c d d d"
    "c c d d d"
`

const gridTemplateSmallScreens = `
    "b"
    "b"
    "b"
    "a"
    "a"
    "a"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
`

const Dashboard = () => {

    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")
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
                    gridTemplateRows: "repeat(8, minmax(100px, 1fr))",
                    gridTemplateAreas: gridTemplateLargeScreens
                } : {
                    gridAutoColumns: "1fr",
                    gridAutoRows: "100px",
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