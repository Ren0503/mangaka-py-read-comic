import React from 'react'
import { Placeholder } from 'react-bootstrap'

const ReviewSkeleton = () => {
    return (
        <>
            <Placeholder xs={6} animation='glow' />
            <Placeholder className='w-75' animation='glow' />
            <Placeholder style={{ width: '25%' }} />
        </>
    )
}

export default ReviewSkeleton
