import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Github = () => {
   const data =  useLoaderData()
  return (
    <div>Github Followers : {data.followers} </div>
  )
}

export default Github

export const infoLoader = async () =>{
    const response = await fetch('https://api.github.com/users/Fahad-kidwai')
    return response.json()
}