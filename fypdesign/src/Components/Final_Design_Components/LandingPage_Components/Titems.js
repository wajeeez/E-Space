import React from 'react';
import { Link } from 'react-router-dom';

function Titems(props) {
  return (
    <>
      <li className='t__item'>
        <Link className='t__item__link' to={props.path}>
          <figure className='t__item__pic-wrap' data-category={props.label}>
            <img
              className='t__item__img'
              
              src={props.src}
            />
          </figure>
          <div className='t__item__info'>
            <h5 className='t__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default Titems;
