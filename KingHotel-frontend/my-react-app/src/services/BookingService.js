import axios from 'axios';

const BASE_URL = 'http://localhost:8080/bookings';

export default class BookingService {
    static getAuthHeader() {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
    }

    static async bookRoom(roomId, userId, bookingRequest) {
        const response = await axios.post(`${BASE_URL}/book-room/${roomId}/${userId}`, bookingRequest, this.getAuthHeader());
        return response.data;
    }

    static async getAllBookings() {
        const response = await axios.get(`${BASE_URL}/all`, this.getAuthHeader());
        return response.data;
    }

    static async getBookingByConfirmationCode(confirmationCode) {
        const response = await axios.get(`${BASE_URL}/get-by-confirmation-code/${confirmationCode}`);
        return response.data;
    }

    static async cancelBooking(bookingId) {
        const response = await axios.delete(`${BASE_URL}/cancel/${bookingId}`, this.getAuthHeader());
        return response.data;
    }
}
