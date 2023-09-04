import React from 'react';
import { useParams } from 'react-router';
import styles from './CustomMeeting.module.css'


const CustomMeeting = () => {
  // Replace this URL with the desired external URL
  const { roomID } = useParams();
  console.log(roomID)

  const externalUrl = `http://localhost:3030/${roomID}`;

  return (
    <div className={styles.fullscreen_iframe_container}>
      <iframe
        title="Custom Meeting"
        src={externalUrl}
       
        className={styles.fullscreen_iframe}
        frameBorder="0"
      />
    </div>
  );
};

export default CustomMeeting;
