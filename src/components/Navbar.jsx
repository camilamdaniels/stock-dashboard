import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import { Box, Typography } from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit'

const Navbar = () => {
    const [selected, setSelected] = useState('dashboard')

    const today = new Date()
    const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

  return (
    <FlexBetween
        mb='0.25rem'
        p='1rem 1rem'
        color='grey'
    >
        <FlexBetween gap='2rem'>
            <Typography variant='h4' fontSize='16px' color='lightgrey'>
                MarketWatcher
            </Typography>
            <Typography variant='h4' fontSize='16px' color='lightgrey'>
                {date}
            </Typography>
        </FlexBetween>

        <FlexBetween gap='2rem'>
            <Box sx={{ '&:hover': { color: '#8884d8' }}}>
                <Link
                    to='/'
                    onClick={() => setSelected('dashboard')}
                    style={{
                        color: selected === 'dashboard' ? 'inherit' : 'lightgrey',
                        textDecoration: 'inherit'
                    }}
                >
                    dashboard
                </Link>
            </Box>

            <Box sx={{ '&:hover': { color: '#8884d8' }}}>
                <Link
                    to='/regression'
                    onClick={() => setSelected('regression')}
                    style={{
                        color: selected === 'regression' ? 'inherit' : 'lightgrey',
                        textDecoration: 'inherit'
                    }}
                >
                    regression
                </Link>
            </Box>
        </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar