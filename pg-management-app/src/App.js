import './App.css';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState([]);
    const [selectedPg, setSelectedPg] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/pgDetails');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const createPgDetail = async (pgDetail) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/pgDetails', pgDetail);
            setData([...data, response.data]);
            console.log('PG Detail created:', response.data);
        } catch (error) {
            console.error('Error creating PG detail:', error);
        }
    };

    const fetchPgDetailById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/pgDetails/${id}`);
            setSelectedPg(response.data);
            setIsEditing(true);
        } catch (error) {
            console.error('Error fetching PG detail:', error);
        }
    };

    

    const updatePgDetail = async(pgDetail) =>{
        console.log("Clicked");
        console.log("This is data "+ pgDetail.name +" "+ pgDetail.id)
        const response = await axios.put(`http://localhost:8080/api/v1/pgDetails/${pgDetail.id}`, pgDetail);
        console.log("This is response"+ response);
        console.log('Response data:', response.data);

         // Create the new data array
         const newData = data.map(item => (item.id === pgDetail.id ? response.data : item));
        
         // Log the new data array to the console
         console.log('Updated Data Array:', newData);
 
         // Update the state with the new data
         setData(newData);

         console.log("This is data "+ pgDetail.name +" "+ pgDetail.id+" "+ pgDetail.contact);

         setIsEditing(false); // Exit editing mode after updating
          setSelectedPg(null); // Clear the selected PG
        


    }
    

    const deletePgDetails = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/pgDetails/${id}`);
            setData(data.filter(item => item.id !== id));
            console.log('PG Detail deleted:', id);
        } catch (error) {
            console.error('Error deleting PG detail:', error);
        }
    };

    

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const pgDetail = {
            id: selectedPg ? selectedPg.id : null,
            name: event.target.name.value,
            address: event.target.address.value,
            contact: event.target.contact.value,
        };
    
        if (isEditing) {
            updatePgDetail(pgDetail);
        } else {
            createPgDetail(pgDetail);
            setIsEditing(false); // Reset editing mode after creating
        }
        event.target.reset();
        setSelectedPg(null); // Clear selected PG after submission
    };
    

    return (
        <div className="App">
            <HeaderComponent />
            <div className="container">
                <form onSubmit={handleFormSubmit}>
                    <h2>{isEditing ? 'Edit PG Details' : 'Add PG Details'}</h2>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" defaultValue={selectedPg ? selectedPg.name : ''} required />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" name="address" defaultValue={selectedPg ? selectedPg.address : ''} required />
                    </div>
                    <div>
                        <label>Contact:</label>
                        <input type="text" name="contact" defaultValue={selectedPg ? selectedPg.contact : ''} required />
                    </div>
                    <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
                    {/* {isEditing && <button type="button" onClick={() => { setIsEditing(true); setSelectedPg(null); }}>Cancel</button>} */
                    isEditing && (
                        <button type="button" onClick={() => { 
                            setIsEditing(false); // Set editing mode to false
                            setSelectedPg(null); // Clear selected PG
                        }}>Cancel</button>
                    )}
                    
                </form>
                
                <table>
                    <thead>
                        <tr>
                            <th>Pg Name</th>
                            <th>Pg Address</th>
                            <th>Pg Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.contact}</td>
                                <td>
                                    <button onClick={() => fetchPgDetailById(item.id)} className="btn btn-info">Update</button>
                                    <button style={{ marginLeft: "10px" }} onClick={() => deletePgDetails(item.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FooterComponent />
        </div>
    );
};

export default App;
