import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [destination, setDestination] = useState('');
    const [directions, setDirections] = useState([]);

    const getDirections = async () => {
        try {
            const response = await axios.post('http://localhost:5000/navigate', { destination });
            if (response.data.directions) {
                setDirections(response.data.directions);
            } else {
                alert("Failed to fetch directions.");
            }
        } catch (error) {
            console.error("Error fetching directions:", error);
            alert("Error connecting to the server.");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Virtual Car Assistant</h1>
            <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <button onClick={getDirections}>Get Directions</button>

            {directions.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Directions:</h3>
                    <ul>
                        {directions.map((step, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
