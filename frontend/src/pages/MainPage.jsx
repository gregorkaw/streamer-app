import React from 'react'
import StreamersList from '../components/StreamersList'
import AddStreamerForm from '../components/AddStreamerForm'

const MainPage = () => {
  return (
    <>
        <AddStreamerForm/>
        <StreamersList />
    </>
  )
}

export default MainPage