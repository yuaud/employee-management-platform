package com.yuaud.backend_api.service;

import com.yuaud.backend_api.exception.FileValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.net.URI;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    @Value("${aws.region}")
    private String awsRegion;

    @Value("${aws.s3.bucket.name}")
    private String awsBucketName;

    private final S3Client s3Client;

    public String uploadImage(MultipartFile file){

        String filename = file.getOriginalFilename();
        String contentType = file.getContentType();

        if (contentType == null) {
            throw new FileValidationException("File content type is missing");
        }
        if(contentType.equals("image/svg+xml")) {
            throw new FileValidationException("SVG files are not allowed");
        }
        if (
                !contentType.equals("image/png") &&
                !contentType.equals("image/jpeg") &&
                !contentType.equals("image/webp")
        ) {
            throw new FileValidationException("Only PNG, JPG, JPEG, and WEBP images are allowed");
        }
        if (filename == null || !filename.toLowerCase().matches(".*\\.(png|jpg|jpeg|webp)$")) {
            throw new FileValidationException("Invalid image extension");
        }
        String key = "employees/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        try{
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(awsBucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();

            //save method
            s3Client.putObject(
                    putObjectRequest,
                    RequestBody.fromInputStream(
                            file.getInputStream(),
                            file.getSize()
                    )
            );
        }catch(Exception e){
            throw new RuntimeException("S3 upload failed");
        }
        return "https://" + awsBucketName + ".s3.amazonaws.com/" + key;
    }

    public void delete(String fileUrl){
        String key = extractS3Key(fileUrl);
        try{
            s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(awsBucketName)
                    .key(key)
                    .build());
        } catch(Exception e){
            throw new IllegalArgumentException("S3 delete failed");
        }

    }

    public String extractS3Key(String fileUrl){
        try{
            URI uri = URI.create(fileUrl);
            String path = uri.getPath();
            return path.startsWith("/") ? path.substring(1) : path;
        } catch(Exception e){
            throw new IllegalArgumentException("Invalid S3 file URL: "+fileUrl, e);
        }
    }
}
