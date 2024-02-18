import './App.css';
import Header from './Header';
import Content from './Content';
import Fotter from './Fotter';
import { useState ,useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
function App() {
  const API_URL = 'http://localhost:3030/items'
  const [items,setItems] = useState(JSON.parse(localStorage.getItem("shoppinglist")) || []);
  const [search,setsearch] = useState("");
  const [fetchError,setFetchError] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchItems = async ()=>{
      try{
      const response = await fetch(API_URL);
      if(!response.ok){
        throw Error("can't get the items list...")
      }
      const listitems = await response.json();
      setItems(listitems);
      }catch(err){
        setFetchError(err.message);
      }finally{
        setLoading(false);
      }
    }
    setTimeout(() => {
      (async ()=> await fetchItems())()
    }, 2000);
  },[]);

// useEffect(()=>{
//   localStorage.setItem("shoppinglist",JSON.stringify(items));
// },[items]);

    const handlecheck = (id)=>{
      console.log("checked by ~"+id);
      const listitems = items.map((item)=>item.id === id ? {
        ...item,checked:!item.checked}:item
      );
      setItems(listitems);
    }
    const handledelete = (id)=>{
      console.log("deleted by "+id);
      const listitems = items.filter((item)=> item.id !== id);
      setItems(listitems);
    }
    const [newItem,setNewItem] = useState("");

    const addItem = () => {
      if (newItem.trim() !== "") {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item: newItem };
        const listitems = [...items, myNewItem];
        setItems(listitems);
        setNewItem("");  
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
      <main>
        {loading && <p>loading items ...</p>}
        {fetchError && <p style={{color:"red"}}>{`Error ${fetchError}`}</p>}
      {!fetchError&& !loading && <Content items={items.filter(item => ((item.item).toLowerCase()).includes(
      search.toLowerCase()))}
        handlecheck={handlecheck}
        handledelete={handledelete}      
      />}
      </main>
      {!loading  && !fetchError && <Fotter len={items.length} />}
    </div>
  );
}

export default App;
