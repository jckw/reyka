import React from 'react'
import { Flex } from 'rebass'

export default ({ children }) => (
    <Flex justifyContent="space-between" mt={-70}>
        {children}
    </Flex>
)
