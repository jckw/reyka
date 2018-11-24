import React from 'react'
import { Card as RebassCard } from 'rebass'

export default props => <RebassCard bg="white" mx="auto" {...props} variant="default" css={{maxWidth: 313, minHeight: 400, ...props.css}}/>