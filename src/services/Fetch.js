import axios from "axios";

export const fetchData = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/vehicles");
        return response.data; // Return fetched data
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error; // Throw error for handling in calling component
    }
};
