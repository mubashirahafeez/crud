import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const StudentList = () => {

  const [UserData,setUserData]=useState([]);


useEffect(()=>{

  
  
  const fetchRecords = async() =>{
    
    const Response = await fetch("https://669b43dc276e45187d34f8ff.mockapi.io/school/Login");

    setUserData(await Response.json());

    
  }
    
  fetchRecords();
    
  
},[UserData])



const deleteUser = async(id) =>{
  

 

 

    try{

      const DeleteData = await fetch(`https://669b43dc276e45187d34f8ff.mockapi.io/school/Login/${id}` ,{
        method:"DELETE"
      }  )

      
    }catch(error){
      console.log(error)
    }


  



}



  return (
    <>
    <div className='container mt-4'>
      <h1 className='text-center mt-4'>Show all user</h1>
      <table class="table mt-4">
  <thead>
    <tr className='table-dark'>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
    
    </tr>
  </thead>
  <tbody>


    {

UserData.map((user,index)=>{
  return(
    <>
    
    
    <tr>
      <th scope="row">{user.id}</th>
      <td>{user.userName}</td>
      <td>{user.userEmail}</td>
      <td>{user.hasPassword}</td>
    
   
      <td>

      <Link to={`/update/${user.id}`} className='btn btn-primary btn-sm'>Update</Link>
      <button className='btn btn-danger btn-sm' onClick={()=>deleteUser(user.id)}  >Delete</button>


      </td>
    </tr>
    
    </>
  )
})



    }


    
  </tbody>
</table>
    </div>
   
    </>
  
  
  )
}

export default StudentList