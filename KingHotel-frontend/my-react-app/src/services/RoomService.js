import axios from 'axios';

const BASE_URL = 'http://localhost:8080/rooms';

export default class RoomService {
    static getAuthHeader() {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }

    static async getAllRooms() {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
    }

    static async getRoomById(roomId) {
        const response = await axios.get(`${BASE_URL}/room/${roomId}`);
        return response.data;
    }

    static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
        // Build URL matching the backend @RequestParam
        let url = `${BASE_URL}/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
        if (roomType) {
            url += `&roomType=${encodeURIComponent(roomType)}`;
        } else {
            url += `&roomType=any`; // backend requires roomType, maybe pass a dummy or change backend
            // Note: your backend says "All fields are required (checkInDate, checkOutDate, roomType)"
        }
        const response = await axios.get(url);
        return response.data;
    }

    static async getRoomTypes() {
        const response = await axios.get(`${BASE_URL}/types`);
        return response.data;
    }

    static async getAllAvailableRooms() {
        const response = await axios.get(`${BASE_URL}/all-available-rooms`);
        return response.data;
    }

    static async addNewRoom(photo, roomType, roomPrice, roomDescription) {
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('roomType', roomType);
        formData.append('roomPrice', roomPrice);
        formData.append('roomDescription', roomDescription);

        const response = await axios.post(`${BASE_URL}/add`, formData, {
            headers: {
                ...this.getAuthHeader().headers,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    static async updateRoom(roomId, photo, roomType, roomPrice) {
        const formData = new FormData();
        if (photo) formData.append('photo', photo);
        formData.append('roomType', roomType);
        formData.append('roomPrice', roomPrice);
        
        const response = await axios.put(`${BASE_URL}/update/${roomId}`, formData, {
             headers: {
                ...this.getAuthHeader().headers,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    static async deleteRoom(roomId) {
        const response = await axios.delete(`${BASE_URL}/delete/${roomId}`, this.getAuthHeader());
        return response.data;
    }
}
