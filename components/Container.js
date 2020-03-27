import React from 'react'

import Example from './Example'
import Title from './Title'

import './Styles/styles.css';

const Container = () => {
  return (
    <div className='MainContainer'>
      <Example />
      <Title />
      <Title />
      <Title />
      <Title />
      <Title />
      <Title />
    </div>
  )
}

export default Container;