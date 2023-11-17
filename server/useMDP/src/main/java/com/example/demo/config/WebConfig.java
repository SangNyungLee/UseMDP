package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET","POST","PATCH","PUT","DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
        // 있어야 쿠키나 세션, jwt 같은걸 헤더에 담고 보내는 요청을 허용하는듯, 없으면 네트워크 에러

        registry.addMapping("/oauth2/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET","POST","PATCH","PUT","DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);

//

//        registry.addMapping("/test1","test2");
        // 이렇게 한번데 두 링크에 대해서도 처리 가능하고

//        registry.addMapping("/test1");
//        registry.addMapping("/test2");
        // 이렇게 하나씩 각각 지정해 줄 수도 있음

        // 주석 쳐놓은 것 처럼 여러 링크에 대해서도 처리 가능,

        WebMvcConfigurer.super.addCorsMappings(registry);
    }
}
