import React, { useState } from 'react';
import axios from 'axios';

const CreatePgDetail = () => {
    const [pgDetail, setPgDetail] = useState({
        name: '',
        address: '',
        contact: '',
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/pgDetails', pgDetail);
            console.log('PG Detail created:', response.data);
        } catch (error) {
            console.error('Error creating PG detail:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <h2>Add PG Details</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={pgDetail.name} onChange={(e) => setPgDetail({ ...pgDetail, name: e.target.value })} required />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" name="address" value={pgDetail.address} onChange={(e) => setPgDetail({ ...pgDetail, address: e.target.value })} required />
            </div>
            <div>
                <label>Contact:</label>
                <input type="text" name="contact" value={pgDetail.contact} onChange={(e) => setPgDetail({ ...pgDetail, contact: e.target.value })} required />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default CreatePgDetail;