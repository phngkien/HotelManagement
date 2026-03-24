import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

class UserService {
    static getAuthHeader() {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
    }

    // Auth endpoints don't need token
    static async login(email, password) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async register(userData) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Protected endpoints
    static async getLoggedInUserProfile() {
        try {
            const response = await axios.get(`${BASE_URL}/users/get-logged-in-profile-info`, this.getAuthHeader());
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            const response = await axios.get(`${BASE_URL}/users/all`, this.getAuthHeader());
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getUserBookingHistory(userId) {
        try {
            const response = await axios.get(`${BASE_URL}/users/get-user-bookings/${userId}`, this.getAuthHeader());
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            const response = await axios.delete(`${BASE_URL}/users/delete/${userId}`, this.getAuthHeader());
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
