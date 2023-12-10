import React, { useEffect, useState } from "react";
import "./Thome.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import headerimg from '../../../Assets/images/Business.png';
import ijoin from '../../../Assets/images/startmeet1.png';
import iclass from '../../../Assets/images/audience1.png';
import TChart from "./TChart";
import { format } from 'date-fns';

function Thome() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [std, setStd] = useState([]);
  const [email, setEmail] = useState(null);
  const [classes, setClasses] = useState([]);
  const { _id } = useParams();
  const [subjectName, setSubjectName] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + `/teacher/class/${_id}`)
      .then((response) => {
        setStd(response.data.response.students);
        setName(response.data.response.teacherName);
        setClasses(response.data.response.subjectName);
        setSubjectName(response.data.response.subjectName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  


  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getCurrentMonthYear = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  };
  
  const getDaysInMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    return lastDay;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const currentDay = new Date().getDate();
    // Create an array to represent the calendar rows and columns
    let calendar = [];
    let dayCounter = 1;
    const highlightColor = '#8539d1';
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          // Empty cells before the first day of the month
          row.push(<td key={j}></td>);
        } else if (dayCounter <= daysInMonth) {
          // Cells with dates
          const isCurrentDay = dayCounter === currentDay;
          const cellStyle = {
            backgroundColor: isCurrentDay ? highlightColor : '',
            color: isCurrentDay ? 'white' : 'black',
            fontSize: isCurrentDay ? '0.7rem' : '',
          };
          row.push(
            <td key={j} style={cellStyle}>
              {dayCounter}
            </td>
          );
          dayCounter++;
        }
      }
      calendar.push(<tr key={i}>{row}</tr>);
    }
  
    return calendar;
  };


  const bg = 'white';


  const [notify,setnotify]  = useState([]);

  const NotificationCard = ({ deadline , index}) => {
    const formattedDeadline = format(new Date(deadline), 'dd-MM-yyyy');
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
  
    // Check if the deadline has exceeded
    const isDeadlineExceeded = currentDate > deadlineDate;
  
    return (
      isDeadlineExceeded && (
        <div className="container-fluid p-1" style={{ borderBottom: '1px solid silver', display: 'flex', alignItems: 'center', verticalAlign: 'middle' }}>
          <i class='bx bx-notification' style={{ fontSize: '1.5rem', color: '#b23ac7', marginTop: '-2rem' }}></i>
          <div className="card-body p-0" style={{}}>
            <h6 className="title" style={{ fontSize: '1rem', fontFamily: 'Poppins, sans-serif', color: '#b23ac7', fontWeight: '500', marginTop: "0.4rem" }}>
              Assignment {index + 1} Deadline
            </h6>
            <p
              className="text "
              style={{
                fontSize: '0.8rem',
                fontFamily: 'Poppins, sans-serif',
                marginTop: '0rem',
                marginBottom: '0.5rem'
              }}
            >
              Deadline: {formattedDeadline}
            </p>
          </div>
        </div>
      )
    );
  };

  // useEffect(() => {
  //   axios
  //     .post(baseURL + `/notification/assignment/submission/${_id}`)
  //     .then((response) => {

  //       if (response.data) {

  //         console.log(response.data)
  //         setnotify(response.data);

      

  //     }

      
        
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .post(baseURL + `/notification/assignment/upload/${_id}`)
      .then((response) => {

        if (response.data) {

          console.log(response.data)
          setnotify(response.data);

        
         


      }

      
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="container-fluid" style={{ marginTop: '0px', margin:'0px' ,background: bg}}>
      {/* First row covering full width */}
      <div className="row">
      
        <div className="col-md-9">
          <div
            style={{
              background: 'linear-gradient(to right, #8539d1 40%, #fc10f2 100%)',
              borderRadius: '20px',
              border: '1px solid #8539d1',
              boxShadow: '10px 10px 5px  rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              padding: '0px 20px 0px',
              zIndex: '1',
            }}
          >
            <div style={{ flex: '1' }}>
              <h2 style={{ fontFamily:'Poppins',color: '#fff', marginBottom: '15px' }}>Hi, {name}</h2>
              <h5 style={{fontFamily:'Poppins', color: '#fff', margin: '0 0 0' }}>Welcome Back!</h5>
            </div>
            <div style={{ flex: '1', textAlign: 'right' }}>
              <img
                src={headerimg} 
                alt="Right Image"
                style={{ verticalAlign: 'middle',height:'227px', maxwidth:'250px' }}
              />
            </div>
          </div>
        </div>

  

{/* Right side (Calendar) */}
<div className="col-md-3" style={{}}>

  {/* Calendar content goes here */}
  {/* You can add a calendar component or any other content you want in this column */}

  <div className="card" style={{ borderRadius: '12px', border:'1px solid #8539d1', boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.2)' }}>
    <div className="card-header" style={{fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
      {getCurrentMonthYear()}
    </div>
    <div className="card-body p-1" style={{ maxHeight: '220px' }}>
      <table className="table table-sm" style={{  margin: '0' }}>
        <thead>
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index} style={{fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontSize: '0.6rem', padding: '0.1rem' }}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center', fontSize: '0.7rem', padding: '0.1rem' }}>
          {renderCalendar()}
        </tbody>
      </table>
    </div>
  </div>
</div>

  


</div>


      {/* Second row */}
      <div className="row" >
  <div className="col-md-9 p-3">
    <div className="row">


      <div className="col-md-3 p-2" >
        <div  className="card h-100 text-white" style={{ background: bg, borderRadius: '20px' , border:'1px solid #8539d1', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)'}}>
          <div  className="card-body" style={{ textAlign: 'center', padding: '0px' }}>
          <Link to={`https://sfu.mirotalk.com/join/${_id}`} target="_blank" style={{textDecoration:'none'}}>
            <h4 className="card-title1" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', marginTop: '10px',color:'black' }}>Meeting</h4>
            <img src={ijoin} alt="Meeting Image" className="img-fluid" style={{ marginTop: '3px', marginBottom: '3px' }} />
            <p className="card-text" style={{ fontFamily: 'Helvetica, sans-serif', margin: '0px' ,color:'black'}}>Start</p>
            </Link>
          </div>
        
        </div>
      </div>

      <div className="col-md-3 p-2">
        <div className="card h-100 text-white" style={{ background: bg, borderRadius: '20px', border:'1px solid #8539d1', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)' }}>
          <div className="card-body" style={{ textAlign: 'center', padding: '0px' }}>
            <h4 className="card-title1" style={{fontSize:'', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', marginTop: '10px',color:'black' }}>Class</h4>
            <img src={iclass} alt="Class Image" className="img-fluid" style={{ marginTop: '3px', marginBottom: '3px' }} />
            <p className="card-text" style={{ fontFamily: 'Helvetica, sans-serif', margin: '0px' ,color:'black'}}>{subjectName}</p>
          </div>
        </div>
      </div>

      <div className="col-md-6 p-2">
        <div className="card h-100 text-white" style={{ background: bg, borderRadius: '20px' , border:'1px solid #8539d1', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)'}}>
        
        <div className="card-body" style={{ textAlign: 'center', padding: '0px' }}>
          <h4 className="card-title1" style={{ fontSize:'',fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', marginBottom: '', marginTop: '',color:'black'}}>Total Students</h4>

          {/* Bootstrap row with two columns */}
          <div className="row" style={{marginTop: '20px'}}>
            {/* Left column for present */}
            {/* <div className="col" style={{marginRight: '30px'}}>
            <img src={iclass} alt="Class Image" className="img-fluid" style={{ marginTop: '0px', marginBottom: '0px' }} />
            </div> */}
            
            {/* Right column for absent */}
            <div className="col" style={{marginLeft: '0px'}}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', color: 'green', fontWeight: 'bold',  }}>40</h2>
            </div>
          </div>
          </div>
          
        </div>
      </div>

      <div className="col-md-12 p-2" style={{ marginTop: '10px', maxHeight: '200px' }}>
        <div className="card h-300 text-white" style={{ background: bg, borderRadius: '20px' , border:'1px solid #8539d1', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)'}}>
          <div className="card-body" style={{ textAlign: 'center', padding: '5px' }}>
            <h3 className="card-title1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', marginBottom: '5px', color:'black' }}>Class Data</h3>
            <TChart value1={10} value2={50} />
          </div>
        </div>
      </div>

      {/* <div>
      <TChart value1={20} value2={80} />

      </div> */}

    </div>
  </div>

  <div className="col-md-3 p-2" style={{ minHeight: '65vh', padding: '5px' , marginTop:'15px'}}>
    <div className="p-2 text-black " style={{ background: bg, borderRadius: '20px' , border:'1px solid #8539d1', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)',minHeight: '65vh'}}>
      <div className="card-header sticky-top" style={{ fontSize: '24px', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', textAlign: 'center', marginBottom: '5px' }}>
        Notifications
      </div>
      {notify.map((notification, index) => (
  <NotificationCard index={index} deadline={notification.deadline} key={index} />
))}

    </div>
  </div>
</div>



    </div>
  );
}

export default Thome;
