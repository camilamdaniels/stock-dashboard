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
    "a a b b b"
    "c c b b b"
    "c c b b b"
    "c c b b b"
    "c c d d d"
    "c c d d d"
    "c c d d d"
    "c c d d d"
`

const gridTemplateSmallScreens = `
    "b"
    "b"
    "b"
    "b"
    "b"
    "a"
    "a"
    "a"
    "a"
    "c"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "d"
`

const Dashboard = () => {

    const isAboveMediumScreens = useMediaQuery("(min-width: 600px)")
  return (
        <Box
            width='100%'
            height='100%'
            display='grid'
            gap='1rem'
            padding='1rem 1rem'
            sx={
                isAboveMediumScreens ? {
                    gridTemplaceColumns: "repeat(3, minmax(300px, 1fr))",
                    gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                    gridTemplateAreas: gridTemplateLargeScreens
                } : {
                    gridAutoColumns: "1fr",
                    gridAutoRows: "80px",
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