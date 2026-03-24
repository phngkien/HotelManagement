package com.dev.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class LocalFileService {

    private final String uploadDir = "uploads/";

    public String saveImage(MultipartFile file) throws IOException {

        // Tạo folder nếu chưa có bằng thư viện nio chuẩn của Java
        Path directory = Paths.get(uploadDir);
        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        // Tạo tên file tránh trùng
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // Đường dẫn file đầy đủ
        Path dest = directory.resolve(fileName);

        // Lưu file bằng stream thay vì transferTo của MultipartFile để tránh lỗi đường dẫn tạm của Tomcat
        Files.copy(file.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);

        return fileName; // Trả về đường dẫn để lưu vào DB
    }
}