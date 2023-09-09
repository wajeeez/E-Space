import React from 'react'
import Button from 'react-bootstrap/Button';


const Sbutton = (props) => {
const btnStyle ={
    width:'200px',
    height: '60px',
    fontSize:'20px',
};

  return (
    <div>
    <Button variant={props.variant || "outline-light"} style={btnStyle}>
    {props.text}
  </Button>
      </div>
  )
}

export default Sbutton