package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Webconfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://www.usemdp.site", "http://localhost:3000")
                .allowedMethods("*")
                .allowedHeaders("*");
        //        WebMvcConfigurer.super.addCorsMappings(registry);
    }
}
