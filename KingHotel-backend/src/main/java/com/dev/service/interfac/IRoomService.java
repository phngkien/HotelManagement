package com.dev.service.interfac;

import com.dev.dto.Response;
import com.dev.dto.RoomDTO;
import com.dev.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IRoomService {

    Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description);

    List<String> getALlRoomTypes();
    Response getAllRooms(User user);
    Response deleteRoom(Long roomId);
    Response updateRoom(Long roomId, String roomType, BigDecimal roomPrice, MultipartFile photo);
    Response getRoomById(Long roomId);
    Response getAvailableRoomsByDataAndType(LocalDate checkinDate, LocalDate checkoutDate, String roomType);
    Response getAllAvailableRooms();

}
