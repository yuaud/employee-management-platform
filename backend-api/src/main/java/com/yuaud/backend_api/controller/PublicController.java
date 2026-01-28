package com.yuaud.backend_api.controller;


import com.yuaud.backend_api.dto.MailTo;
import com.yuaud.backend_api.service.MailLambdaService;
import com.yuaud.backend_api.service.PublicServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {

    private final MailLambdaService mailLambdaService;

    @PostMapping("/mailTo")
    public ResponseEntity<Void> mailTo(
            @RequestBody @Valid MailTo mailTo
            ) {
        mailLambdaService.sendMail(mailTo);
        return ResponseEntity.noContent().build();
    }
}
