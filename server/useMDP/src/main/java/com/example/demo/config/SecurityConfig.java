package com.example.demo.config;

import com.example.demo.security.CustomAuthenticationSuccessHandler;
import com.example.demo.security.JwtAuthenticationProvider;
import com.example.demo.service.JwtTokenProvider;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(CorsConfigurer::disable);
        http.csrf(CsrfConfigurer::disable); // 외부 POST 요청을 받아야하니 csrf는 꺼준다.
//        http.httpBasic(HttpBasicConfigurer::disable);
//        // http 기본 인증 방식을 사용하지 않는다는거지 http 요청 자체를 거부하는게 아님
        http.sessionManagement((sessionManagement)
                -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        // 통신을 주고 받을때 세션을 생성 안 함 : stateless를 사용하는 restful에서 자주 사용
        http.authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated());
//        http.oauth2Login((oauth2Login) -> oauth2Login
//                        .userInfoEndpoint((userInfo) -> userInfo
//                                .userAuthoritiesMapper(grantedAuthoritiesMapper())
//                        ));
        return http.build();
    }

//    private GrantedAuthoritiesMapper grantedAuthoritiesMapper() {
//        return (authorities) -> {
//            Set<GrantedAuthority> mappedAuthorities = new HashSet<>();
//
//            authorities.forEach((authority) -> {
//                GrantedAuthority mappedAuthority;
//
//                if (authority instanceof OidcUserAuthority) {
//                    OidcUserAuthority userAuthority = (OidcUserAuthority) authority;
//                    mappedAuthority = new OidcUserAuthority(
//                            "ROLE_USER", userAuthority.getIdToken(), userAuthority.getUserInfo());
//                } else if (authority instanceof OAuth2UserAuthority) {
//                    OAuth2UserAuthority userAuthority = (OAuth2UserAuthority) authority;
//                    mappedAuthority = new OAuth2UserAuthority(
//                            "ROLE_USER", userAuthority.getAttributes());
//                } else {
//                    mappedAuthority = authority;
//                }
//
//                mappedAuthorities.add(mappedAuthority);
//            });
//
//            return mappedAuthorities;
//        };
//    }


    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(authenticationProvider());
        return authenticationManagerBuilder.build();
    }

    @Autowired
    UserService userService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Bean
    public AuthenticationProvider authenticationProvider() {
        return new JwtAuthenticationProvider(jwtTokenProvider,userService);
    }

//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository() {
//        return new InMemoryClientRegistrationRepository(googleClientRegistration());
//    }
//
//    private ClientRegistration googleClientRegistration() {
//        return ClientRegistration
//                .withRegistrationId("google")
//                .clientId("your-google-client-id")
//                .clientSecret("your-google-client-secret")
//                .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
//                .scope("openid", "profile", "email")
//                .authorizationUri("https://accounts.google.com/o/oauth2/auth")
//                .tokenUri("https://www.googleapis.com/oauth2/v3/token")
//                .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
//                .userNameAttributeName("id")
//                .clientName("Google")
//                .build();
//    }
//
//    @Bean
//    public AuthenticationSuccessHandler authenticationSuccessHandler() {
//        return new CustomAuthenticationSuccessHandler();
//    }

}
