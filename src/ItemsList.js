import React from 'react'
import { FaBeer } from 'react-icons/fa'
import "./index.css"
const ItemsList = ({items,handleCheck,handleDelete}) => {
  return (
    <ul>
        {items.map((item)=>(
          <li className='item' key={item.id}>
           <input
           type='checkbox'
           id={`checkbox-${item.id}`}
           onChange={()=>handleCheck(item.id)}
           checked={item.checked} />
           <label
              htmlFor={`checkbox-${item.id}`}
              style={item.checked?{textDecoration: "line-through"}:null}
              onDoubleClick={()=>handleCheck(item.id)}
           >{item.item}</label>
           <FaBeer role='button' tabIndex={0} 
             className='delete-icon'
               onClick={()=>{handleDelete(item.id)}}
           />
          </li>
        ))}
       </ul>
  )
}

export default ItemsList
