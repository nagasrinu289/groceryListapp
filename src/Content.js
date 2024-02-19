import ItemsList from "./ItemsList";

const Content = ({items,handleCheck,handleDelete}) => {
    return (
    <>
      {items.length!==0 ? (
       <ItemsList 
       items={items}
       handleCheck = {handleCheck}
       handleDelete = {handleDelete}
       />
      ) : (
        <p style={{marginTop:"2rem"}}>Your list is empty</p>
      )}
      
    </>
  )
}

export default Content
