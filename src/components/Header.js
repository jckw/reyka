import React from 'react'
import { Flex } from 'rebass'
import { Link } from '@reach/router'

export default () => (
    <Flex css={{ width: '100%' }} justifyContent="flex-end">
        <Link to="/create" style={{ color: '#727D65', padding: '8px 16px', margin: '8px', textDecoration: 'none', background: 'white', borderRadius: '4px', boxShadow: 'rgba(188, 188, 188, 0.5) 0px 2px 20px -8px' }}>
            Start a queue
        </Link>
    </Flex>
)
