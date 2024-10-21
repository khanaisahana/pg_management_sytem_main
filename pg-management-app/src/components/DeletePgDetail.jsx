import React from 'react';
import axios from 'axios';

const DeletePgDetail = ({ pgId, onDelete }) => {
    const deletePgDetails = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/pgDetails/${pgId}`);
            console.log('PG Detail deleted:', pgId);
            onDelete(pgId); // Call the onDelete function passed from the parent
        } catch (error) {
            console.error('Error deleting PG detail:', error);
        }
    };

    return (
        <button onClick={deletePgDetails}>Delete</button>
    );
};

export default DeletePgDetail;