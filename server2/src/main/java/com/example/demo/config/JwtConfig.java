package com.example.demo.config;

import com.example.demo.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class JwtConfig {
    @Value("${jwt.secret}") // application.properties 또는 application.yml에서 secret 값을 가져옵니다.
    private String secretKey;

    @Bean
    public JwtTokenUtil jwtTokenUtil(){
        return new JwtTokenUtil(secretKey);
    }
}
