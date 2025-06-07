package com.example.backend.Services;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendConfirmationEmail(String to, String confirmationUrl) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        Context context = new Context();
        context.setVariable("confirmationUrl", confirmationUrl);

        String htmlContent = templateEngine.process("mail-templates/confirmation-email", context);

        helper.setTo(to);
        helper.setSubject("Confirma tu registro en Edu-vault");
        helper.setText(htmlContent, true); // true = es HTML

        mailSender.send(message);
    }
}
