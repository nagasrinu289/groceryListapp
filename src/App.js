import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer'; // Corrected typo in import statement
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {
  const API_URL = 'https://server-rosy-pi.vercel.app/items';
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("shoppinglist")) || []);
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 1000);
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw Error("Can't get the items list...");
      }
      let listItems = await response.json();
      console.log(listItems);
      // listItems = listItems.items
      setItems(listItems);
    } catch (err) {
      setFetchError(err.message);
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (id) => {
    console.log("checked by ~" + id);
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setItems(updatedItems);
  };
  

  const handleDelete = (id) => {
    console.log("deleted by " + id);
    const listItems = items.filter((item) => item.id !== id);
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(listItems);
    setItems(listItems);
  }

  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      const id = items.length ? (parseInt(items[items.length - 1].id) + 1 ).toString(): "1";
      const myNewItem = { id, checked: false, item: newItem };
      const listItems = [...items, myNewItem];
      setItems(listItems);
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myNewItem),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('POST request successful:', data);
      })
      .catch(error => {
        console.error('Error during POST request:', error);
      });
      setNewItem("");
    }
  };

  return (
    <div className='App'>
      <Header title="Groceries List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        addItem={addItem}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {loading && <p>Loading items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error ${fetchError}`}</p>}
        {!fetchError && !loading && <Content
          items={items.filter(item => item.item && item.item.toLowerCase().includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      {!loading && !fetchError && <Footer len={items.length} />}
    </div>
  );
}

export default App;
