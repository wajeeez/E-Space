import React from 'react';

const FormattedDate = ({ rawDate }) => {
  const formattedDate = (rawDate) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  return <span>{formattedDate(rawDate)}</span>;
};

export default FormattedDate;