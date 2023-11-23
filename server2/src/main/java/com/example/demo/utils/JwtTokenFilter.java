//package com.example.demo.utils;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@RequiredArgsConstructor
//public class JwtTokenFilter extends OncePerRequestFilter {
//    @Value("${jwt.secret}")
//    private String secretKey;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
//        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//
//        //Header의 Authorization 값이 비어 있으면 => jwt 값 전송x => 로그인 하지 않음
//        if (authorizationHeader == null) {
//            filterChain.doFilter(request,response);
//            return;
//        }
//
//        //Header의 Authorization 값이 Bearer로 시작하지 않으면 잘못된 토큰임
//        if(!authorizationHeader.startsWith("Bearer ")){
//            filterChain.doFilter(request,response);
//            return;
//        }
//
//        //전송받은 값에서 Bearer 뒷부분 추출
//        String token = authorizationHeader.split(" ")[1];
//
//        //전송받은 jwt token 값이 만료되었으면 => 다음필터 진행 (인증x)
//        if(JwtTokenUtil.isExpired(token, secretKey)){
//            filterChain.doFilter(request,response);
//            return;
//        }
//
//        //jwt token에서 id 값 추출
//        String longId = JwtTokenUtil.getLoginId(token, secretKey);
//
//        //추출한 LoginId로 memberId값 찾아오기 -> 추출한 id로 (member Service에서 memberid값 가져오는 로직짜기)
//        // 일단은 LoginID로 token발급
//        UsernamePass
//    }
//}
