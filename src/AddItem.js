import React from 'react'
import "./index.css";
const AddItem = ({newItem , setNewItem,addItem}) => {
  const handelsubmit = (e)=>{
    e.preventDefault();
    addItem(newItem);
    console.log(newItem);
  }
  return (
    <form onSubmit={handelsubmit}>
        <label htmlFor='addItem'>Add Item</label>
        <input
        className='search'
       
        autoFocus
        id='addItem'
        type='text'
        placeholder='Add Item'
        required
        value={newItem}
        onChange={(e)=> setNewItem(e.target.value)}
        />
        <button
        type='submit'
        aria-label='Add Item'>submit
        </button>
    </form>
  )
}

export default AddItem
