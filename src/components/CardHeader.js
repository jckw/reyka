import React from 'react'
import { Box } from 'rebass'

export default ({ children }) => (
    <Box bg="deepGreen" css={{ borderRadius: '38px 38px 0 0' }} py={3} px={4}>
        {children}
    </Box>
)
