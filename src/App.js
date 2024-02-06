import './App.css';
import Header from './Header';
import Content from './Content';
import Fotter from './Fotter';
import { useState } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
function App() {
  const setAndSaveItems  = (listitems)=>{
    setItems(listitems);
    localStorage.setItem("shopinglist",JSON.stringify(listitems));
  }
  const [items,setItems] = useState(JSON.parse(localStorage.getItem("shopinglist")));
  const [search,setsearch] = useState("");

    const handlecheck = (id)=>{
      console.log("checked by ~"+id);
      const listitems = items.map((item)=>item.id === id ? {
        ...item,checked:!item.checked}:item
      );
      setAndSaveItems(listitems);
    }
    const handledelete = (id)=>{
      console.log("deleted by "+id);
      const listitems = items.filter((item)=> item.id !== id);
      setAndSaveItems(listitems);
    }
    const [newItem,setNewItem] = useState("");

    const addItem = () => {
      if (newItem.trim() !== "") {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item: newItem };
        const listitems = [...items, myNewItem];
        setAndSaveItems(listitems);
        setNewItem(""); // Clear the input field after adding an item
      }
    };
    

    
    
 
  return (
    <div className='App'>
      <Header title="Groceries List"/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        addItem={addItem}      
      />
      <SearchItem search={search}
      setsearch={setsearch}
      />
      <Content items={items.filter(item => ((item.item).toLowerCase()).includes(
      search.toLowerCase()))}
        handlecheck={handlecheck}
        handledelete={handledelete}      
      />
      <Fotter len={items.length} />
    </div>
  );
}

export default App;
