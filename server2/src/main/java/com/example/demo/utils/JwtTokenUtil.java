package com.example.demo.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.Date;

@Getter
public class JwtTokenUtil {

    private final String secretKey;
    //24시간 짜리
    private final long expireTimeMs =  24 * 60 * 60 * 1000;
    public JwtTokenUtil(String secretKey) {
        this.secretKey = secretKey;
    }
    //jwt 토큰 발급
    public String createToken(String memberId, String accessToken){
        //claim jwt에 들어갈 정보
        // claim에 LongId를 넣어줌으로써 나중에 longid를 꺼낼 수 있음
        Claims claims = Jwts.claims();
        claims.put("memberId", memberId);
        claims.put("socialLoginAccessToken", accessToken);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTimeMs))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Claims에서 memberId 꺼내기
    public static String getMemberId(String token, String secretKey) {
        return extractClaims(token, secretKey).get("memberId").toString();
    }

    // Claims에서 socialLoginAccessToken 꺼내기
    public static String getSocialLoginAccessToken(String token, String secretKey) {
        return extractClaims(token, secretKey).get("socialLoginAccessToken").toString();
    }

    // 발급된 Token이 만료 시간이 지났는지 체크
    public static boolean isExpired(String token, String secretKey) {
        try {
            Date expiredDate = extractClaims(token, secretKey).getExpiration();
            // Token의 만료 날짜가 지금보다 이전인지 check
            return expiredDate.before(new Date());
        } catch (Exception e) {
            e.printStackTrace();
            return true;
        }
    }

    // SecretKey를 사용해 Token Parsing
    private static Claims extractClaims(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }


}
