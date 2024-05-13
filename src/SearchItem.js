import './index.css';
const SearchItem = ({search,setSearch}) => {
   
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
         onChange={(e)=>setSearch(e.target.value)}
         >
         </input>
         
    </form>
  )
}

export default SearchItem
