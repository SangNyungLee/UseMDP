package com.example.demo.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.Date;

public class JwtTokenUtil {

    private final String secretKey;

    public JwtTokenUtil(String secretKey) {
        this.secretKey = secretKey;
    }
    //jwt 토큰 발급
    public String createToken(String longId){
        //claim jwt에 들어갈 정보
        // claim에 LongId를 넣어줌으로써 나중에 longid를 꺼낼 수 있음
        Claims claims = Jwts.claims();
        claims.put("longId", longId);

        //만료시간 60분
        long expireTimesMs = 24 * 60 * 60;

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTimesMs))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Claims에서 loginId 꺼내기
    public static String getLoginId(String token, String secretKey) {
        return extractClaims(token, secretKey).get("loginId").toString();
    }

    // 발급된 Token이 만료 시간이 지났는지 체크
    public static boolean isExpired(String token, String secretKey) {
        Date expiredDate = extractClaims(token, secretKey).getExpiration();
        // Token의 만료 날짜가 지금보다 이전인지 check
        return expiredDate.before(new Date());
    }

    // SecretKey를 사용해 Token Parsing
    private static Claims extractClaims(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }


}