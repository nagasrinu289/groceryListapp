import ItemsList from "./ItemsList";

const Content = ({items,handlecheck,handledelete}) => {
    return (
    <>
      {items.length!==0 ? (
       <ItemsList 
       items={items}
       handlecheck = {handlecheck}
       handledelete = {handledelete}
       />
      ) : (
        <p style={{marginTop:"2rem"}}>Your list is empty</p>
      )}
      
    </>
  )
}

export default Content
