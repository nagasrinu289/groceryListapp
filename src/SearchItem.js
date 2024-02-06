import React, { useState } from 'react'
import './index.css';
const SearchItem = ({search,setsearch}) => {
   
  return (
    <form  onSubmit={(e)=>e.preventDefault()}>
        <label 
         htmlFor='search'>search</label>
         <input
          className='search'
         id='search'
         type='text'
         role='searchbox'
         placeholder='Enter Item'
         value={search}
         onChange={(e)=>setsearch(e.target.value)}
         >
         </input>
         
    </form>
  )
}

export default SearchItem
