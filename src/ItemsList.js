import React from 'react'
import { FaBeer } from 'react-icons/fa'
const ItemsList = ({items,handlecheck,handledelete}) => {
  return (
    <ul>
        {items.map((item)=>(
          <li className='item' key={item.id}>
           <input
           type='checkbox'
           id={`checkbox-${item.id}`}
           onChange={()=>handlecheck(item.id)}
           checked={item.checked} />
           <label
              htmlFor={`checkbox-${item.id}`}
              style={item.checked?{textDecoration: "line-through"}:null}
              onDoubleClick={()=>handlecheck(item.id)}
           >{item.item}</label>
           <FaBeer role='button' tabIndex={0} 
               onClick={()=>{handledelete(item.id)}}
           />
          </li>
        ))}
       </ul>
  )
}

export default ItemsList
