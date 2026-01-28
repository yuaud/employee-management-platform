package com.yuaud.backend_api.exception;

public class FileValidationException extends RuntimeException{
    public FileValidationException(String message){
        super(message);
    }
}
