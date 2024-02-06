import React from 'react'

const Fotter = ({len}) => {
  return (
    <footer>
        <p> Numer of items are {len===1 ? "1 only" : len}</p>
    </footer>
  )
}

export default Fotter
