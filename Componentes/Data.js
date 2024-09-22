import React from 'react'

const Data = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date().toLocaleDateString('pt-BR', options)

  
  const formattedDate = date.charAt(0).toUpperCase() + date.slice(1)

  return (
    <span>{formattedDate}</span> 
  )
}

export default Data
