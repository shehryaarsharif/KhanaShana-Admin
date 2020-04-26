import React , { useState, useEffect } from 'react';
import ReactBootstrap, {InputGroup,FormControl,Nav, Button, Navbar,NavDropdown,Table} from 'react-bootstrap';
import 'isomorphic-fetch';
import 'es6-promise';

function AdminDBTable(){

	const [myData,setData] = useState([]);

	useEffect(()=>{

		fetch("AdminDB.json").then(function(resp){
			return resp.json();
		})
		.then(function(data){
			if(data != myData){
				setData(...myData,data)
				console.log("THIEHFI",myData)
			}
		})
		.catch(err => {
          // Do something for an error here
          console.log("Error Reading data " + err);
	})
	},[]);

	const del = (idd) => {
			setData(myData.filter(user=>user.id!=idd))

	}

	const renderTable = () => {
	    return myData.map(user => {
	      return (
	        <tr>
	          <td>{user.id}</td>
	          <td>{user.name}</td>
	          <td>{user.email}</td>
	          <td>{user.position}</td>
	          <td className="pointer dim" onClick={()=>del(user.id)}><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
				  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
				</svg>
			  </td>
	        </tr>
	      );
	    })
	  }


	return(

		<Table responsive className="mt4">
			  <thead>
			    <tr className="bg-light-silver">
			      <th>Admin_ID</th>
			      <th>Name</th>
			      <th>Email_ID</th>
			      <th>Position</th>
			    </tr>
			  </thead>
			  <tbody>{renderTable()}</tbody>
			</Table>

	);

}


export default AdminDBTable;