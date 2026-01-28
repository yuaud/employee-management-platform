package com.yuaud.backend_api.service;

import com.yuaud.backend_api.dto.MailTo;
import org.springframework.stereotype.Service;

@Service
public class PublicServiceImpl {

    public void sendMail(MailTo mailTo){
        System.out.println(mailTo.subject());
        System.out.println(mailTo.message());
    }
}
