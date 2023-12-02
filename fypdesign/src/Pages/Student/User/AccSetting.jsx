import React from 'react';
import userIcon from '../../../Assets/images/user.png';



const AccSetting = () => {
  return (
    <div className="container-fluid" style={{  
        textAlign: 'center', marginTop: '0px', }}>
          <center>
      
          <h1 style={{background:'' , padding:'5px' , color : 'black', 
          borderRadius: '20px' , marginBottom:'30px'}}>
            User Settings</h1>

      <div className="row" style ={{marginBottom:'30px', padding:'10px'}}>
        <div className="col">
          <img
            src={userIcon}
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{width:'100px',background:'black'}}
          />
        </div>
      </div>

      
      <div className="row mb-4 justify-content-center">
        <div className="col-md-2 d-flex align-items-center">
            <h4 style={{ marginRight: '20px' , whiteSpace:'nowrap'}}>Full Name :</h4>
        </div>
        <div className="col-md-4 d-flex align-items-center">
            <input type="text" id="firstName" className="form-control" />
        </div>
    </div>

    <div className="row mb-4 justify-content-center ">
        <div className="col-md-2 d-flex align-items-center ">
          <h4 style={{ marginRight: '20px' , whiteSpace:'nowrap',}}>Email :</h4>
          </div>
        <div className="col-md-4 d-flex align-items-center">
          <input type="email" id="email" className="form-control" />
        </div>
      </div>

      
      <div className="row mb-4 justify-content-center ">
        <div className="col-md-2 d-flex align-items-center ">
          <h4 style={{ marginRight: '20px' , whiteSpace:'nowrap'}}>Password :</h4>
        </div>
          <div className="col-md-4 d-flex align-items-center">
          <input type="password" id="password" className="form-control" />
          </div>
        </div>


      <div className="row mb-4 justify-content-center ">
        <div className="col-md-2 d-flex align-items-center ">
        <h4 style={{ marginRight: '20px' , whiteSpace:'nowrap'}}>NewPassword :</h4>
          </div>
        <div className="col-md-4 d-flex align-items-center">
        <input type="password" id="newPassword" className="form-control" />
        </div>
      </div>
      
      <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <button className="btn btn-primary" 
            style={{fontSize:'20px' , letterSpacing:'2px'
                ,padding:'10px',borderRadius:'16px',
                 marginTop:'20px', width:'200px'  }}
            >
              Update Data
            </button>
          </div>
        </div>

      </center>
    </div>
  );
};

export default AccSetting;
