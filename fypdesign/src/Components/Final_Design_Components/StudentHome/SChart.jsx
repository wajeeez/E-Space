import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
const SChart = () => {
    const [totalAssignments, settotalAssignments] = useState(null);
    const [submittedAssignments, setsubmittedAssignments] = useState(null);
    const [totalGroupAssignment, settotalGroupAssignment] = useState(null);
    const [submittedGroupAssignments, setsubmittedGroupAssignments] = useState(null);
    const [totalLectures, settotalLectures] = useState(null);
   
    const baseURL = process.env.React_App_INTERNAL_API_PATH;
    const { _id } = useParams();
    const [email, setEmail] = useState('');
    useEffect(() => {
        const authToken = localStorage.getItem("StdToken");
        if (authToken) {
          const decodedToken = jwt_decode(authToken);
          setEmail(decodedToken.email);
          console.log(decodedToken.email)
          request(decodedToken.email)
        }
      }, []);



      const request = (e) =>{
      

            const requestData = {
                class_id: _id,
                email: e,
            };

            axios.post(baseURL+'/getKPIS', requestData)
                .then(response => {
                    if (response.status === 200) {

                        console.log(response.data.totalAssignments)
                    
                        settotalAssignments(response.data.totalAssignments)
                        setsubmittedAssignments(response.data.submittedAssignments)
                        settotalGroupAssignment(response.data.totalGroupAssignment)
                        setsubmittedGroupAssignments(response.data.submittedGroupAssignments)
                        settotalLectures(response.data.totalLectures)
                    }
                })
                .catch(error => {
                    console.error('Error:', error.response ? error.response.data : error.message);
                });
        
  
      }


    console.log('totalAssignments:', totalAssignments);
    console.log('submittedAssignments:', submittedAssignments);
    console.log('totalGroupAssignment:', totalGroupAssignment);
    console.log('submittedGroupAssignments:', submittedGroupAssignments);
    console.log('totalLectures:', totalLectures);
    // Use assignmentData to set the data for the BarChart
    const data = [
        { label: 'Assignments', total: totalAssignments, submitted: submittedAssignments },
        { label: 'Group Assignments', total: totalGroupAssignment, submitted: submittedGroupAssignments },
        { label: 'Lectures', total: totalLectures },
      ];
    return (
        <BarChart width={1000} height={270} data={data}>
            <CartesianGrid />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#c124e1" barSize={50} name="Total" />
            <Bar dataKey="submitted" fill="#07BC0C" barSize={50} name="Submitted" />
        </BarChart>
    );
};

export default SChart;
