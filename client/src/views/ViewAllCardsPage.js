import React, { useState } from 'react'
import CardList from '../components/CardList'

const ViewAllCardsPage = () => {
    console.log("rendering view all cards page")

    return (
        <div className='row'>
            <CardList />
        </div>
    )
}

export default ViewAllCardsPage
