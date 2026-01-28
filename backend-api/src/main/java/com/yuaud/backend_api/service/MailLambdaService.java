package com.yuaud.backend_api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yuaud.backend_api.dto.MailTo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.lambda.LambdaClient;
import software.amazon.awssdk.services.lambda.model.InvokeRequest;

@Service
@RequiredArgsConstructor
public class MailLambdaService {
    private final LambdaClient lambdaClient;
    private final ObjectMapper objectMapper;

    public void sendMail(MailTo event){
        try{
            String payload = objectMapper.writeValueAsString(event);
            InvokeRequest request = InvokeRequest.builder()
                    .functionName("send-mail-lambda")
                    .payload(SdkBytes.fromUtf8String(payload))
                    .build();
            lambdaClient.invoke(request);
        } catch(Exception e){
            throw new RuntimeException("Lambda mail invoke failed", e);
        }
    }

}
