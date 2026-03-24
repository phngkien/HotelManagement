package com.dev.utils;

import com.dev.dto.BookingDTO;
import com.dev.dto.RoomDTO;
import com.dev.dto.UserDTO;
import com.dev.entity.Booking;
import com.dev.entity.Room;
import com.dev.entity.User;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {
    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();


    public static String generateRandomAlphanumeric(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }


    public static UserDTO mapUserEnityToUserDTO(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }


    public static RoomDTO mapRoomEnityToRoomDTO(Room room){
        RoomDTO roomDTO = new RoomDTO();

        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getRoomDescription());

        return roomDTO;
    }

    public static BookingDTO mapBookingEnityToBookingDTO(Booking booking){
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuests(booking.getTotalNumOfGuests());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        return bookingDTO;

    }


    public static RoomDTO mapRoomEnityToRoomDTOPlusBookings(Room room){
        RoomDTO roomDTO = new RoomDTO();

        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getRoomDescription());


        if(room.getBookings() != null){
            roomDTO.setBookings(room.getBookings().stream().map(Utils::mapBookingEnityToBookingDTO).collect(Collectors.toList()));
        }

        return roomDTO;
    }

    public static UserDTO mapUserEnityToUserDTOPlusUserBookingsAndRoom(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());

        if(!user.getBookings().isEmpty()){
            userDTO.setBookings(user.getBookings().stream().map(booking -> mapBookingEnityToBookingDTOPlusBookedRooms(booking,false)).collect(Collectors.toList()));
        }

        return userDTO;
    }

    public static BookingDTO mapBookingEnityToBookingDTOPlusBookedRooms(Booking booking,boolean mapUser){
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuests(booking.getTotalNumOfGuests());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        if(mapUser){
            bookingDTO.setUser(Utils.mapUserEnityToUserDTO(booking.getUser()));
        }
        if(booking.getRoom() != null){
            RoomDTO roomDTO = new RoomDTO();

            roomDTO.setId(booking.getRoom().getId());
            roomDTO.setRoomType(booking.getRoom().getRoomType());
            roomDTO.setRoomPrice(booking.getRoom().getRoomPrice());
            roomDTO.setRoomPhotoUrl(booking.getRoom().getRoomPhotoUrl());
            roomDTO.setRoomDescription(booking.getRoom().getRoomDescription());
            bookingDTO.setRoom(roomDTO);

        }
        return bookingDTO;

    }

    public static List<UserDTO> mapUserListEnityToUserListDTO(List<User> userList){
        return userList.stream().map(Utils::mapUserEnityToUserDTO).collect(Collectors.toList());

    }
    public static List<RoomDTO> mapRoomListEnityToRoomListDTO(List<Room> roomList){
        return roomList.stream().map(Utils::mapRoomEnityToRoomDTO).collect(Collectors.toList());

    }

    public static List<BookingDTO> mapBookingListEnityToBookingListDTO(List<Booking> bookingList){
        return bookingList.stream().map(Utils::mapBookingEnityToBookingDTO).collect(Collectors.toList());
    }


}
