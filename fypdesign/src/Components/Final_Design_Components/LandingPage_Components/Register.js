import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { Reg } from '../../../api/internal';
import { setUser } from '../../../store/userSlice';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import './Register.css';

function Register() {
  const [error, setError] = useState('');
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReg = async () => {
    const data = {
      tname: formik.values.tname,
      institute: formik.values.institute,
      phone: formik.values.phone,
      email: formik.values.email,
      password: formik.values.password,
    };

    try {
      const response = await Reg(data);

      if (response.status === 409) {
        setError(response.data.message);
        setRegistrationComplete(false);
      } else if (response.status === 201) {
        const teacher = {
          _id: response.data.teacher._id,
          email: response.data.teacher.email,
          auth: response.data.teacher.auth,
        };

        dispatch(setUser(teacher));
        setRegistrationComplete(true);
        // navigate('/teacher/login');
      } else if (response.code === 'ERR_BAD_REQUEST') {
        setError(response.data.message);
        setRegistrationComplete(false);
      }
    } catch (error) {
      console.error(error);
      setRegistrationComplete(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      tname: '',
      institute: '',
      phone: '',
      email: '',
      password: '',
    },
    onSubmit: handleReg,
  });

  return (
    <>
      {!registrationComplete && (
        <div className="container mt-5 custom-container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="custom-card" style={{ borderRadius: '30px', border: '3px solid black', padding: '10px' }}>
                <div className="card-body">
                  <h2 className="custom-title text-center">Register as Teacher</h2>

                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group custom-form-group">
                      <input
                        type="text"
                        name="tname"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.tname}
                        className="form-control"
                        placeholder="Teacher Name"
                      />
                    </div>

                    <div className="form-group custom-form-group">
                      <input
                        type="text"
                        name="institute"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.institute}
                        className="form-control"
                        placeholder="Institute"
                      />
                    </div>

                    <div className="form-group custom-form-group">
                      <input
                        type="text"
                        name="phone"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        className="form-control"
                        placeholder="Phone"
                      />
                    </div>

                    <div className="form-group custom-form-group">
                      <input
                        type="text"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>

                    <div className="form-group custom-form-group">
                      <input
                        type="password"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="custom-button"
                      style={{ borderRadius: '20px', fontSize: 'large' }}
                    >
                      Register
                    </button>
                  </form>

                  {error !== '' ? <div className="alert alert-danger mt-3">{error}</div> : null}

                  <p className="text-center mt-3">Already have an account?</p>
                  <Link to="/teacher/login">Login here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {registrationComplete && (
        <div className="registration-complete" style={{ textAlign: 'center' }}>
          <i className="fa fa-check-circle" style={{ color: 'green', fontSize: '50px' }}></i>
          <p style={{ color: 'green', fontSize: '50px', fontFamily: 'Raleway' }}>Registration Complete</p>
        </div>
      )}
    </>
  );
}

export default Register;
