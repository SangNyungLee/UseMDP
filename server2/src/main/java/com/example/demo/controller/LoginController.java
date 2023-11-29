package com.example.demo.controller;

import com.example.demo.dto.CodeDTO;
import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponseMemberDTO;
import com.example.demo.dto.SocialLoginDTO.SocialDTO;
import com.example.demo.service.GithubLoginService;
import com.example.demo.service.GoogleLoginService;
import com.example.demo.service.MemberService;
import com.example.demo.utils.JwtTokenUtil;
import com.example.demo.utils.SocialLoginAPI;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class LoginController implements SocialLoginAPI {

    @Autowired
    private MemberService memberService;
    @Autowired
    GoogleLoginService googleLoginService;
    @Autowired
    GithubLoginService githubLoginService;

    private final JwtTokenUtil jwtTokenUtil;

    public LoginController(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    @PostMapping("/api/socialLogin/{loginProvider}")
    public ResponseEntity<APIResponseDTO<ResponseMemberDTO>> socialLogin(@PathVariable String loginProvider, @RequestBody CodeDTO codeDTO, HttpServletResponse response){
        // 서버에서 받은 authorizationCode
        String code = codeDTO.getAuthorizationCode();

        SocialDTO user;

        // authorizationCode로 로그인 후 사용자 정보 받기
        if(loginProvider.equals("google")) {
            user = googleLoginService.socialLogin(code, "registergoogle");
        } else if (loginProvider.equals("github")){
            user = githubLoginService.gitLogin(code);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(APIResponseDTO.<ResponseMemberDTO>builder()
                            .resultCode("404")
                            .message("잘못된 주소")
                            .data(null)
                            .build());
        }

        // 사용자 정보 DB에 갱신
        MemberDTO member = memberService.saveMember(user);
        if(member == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponseDTO.<ResponseMemberDTO>builder()
                    .resultCode("500")
                    .message("서버에서 소셜로그인한 사용자의 정보를 db에 저장하는데 문제 생김")
                    .data(null)
                    .build());
        }
        // 갱신된 사용자 정보 DTO 생성
        ResponseMemberDTO responseMemberDTO = ResponseMemberDTO.builder()
                .socialId(member.getSocialId())
                .socialNickname(member.getSocialNickname())
                .socialProfilePicture(member.getSocialProfilePicture())
                .build();

        // 갱신된 사용자 정보의 memberId 로 JWT 토큰 발행
        String token = jwtTokenUtil.createToken(member.getMemberId(), user.getSocialLoginAccessToken());
        System.out.println("JWT token = " + token);

        // 발행된 JWT 토큰을 쿠키로 설정 및 전달
        Cookie cookie = new Cookie("auth", token);
        cookie.setHttpOnly(false);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setPath("/");

        System.out.println("cookie = " + cookie.getValue());

        response.addCookie(cookie);

        // 응답 결과 전달
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(APIResponseDTO.<ResponseMemberDTO>builder()
                        .resultCode("201")
                        .message("소결 로그인 성공")
                        .data(responseMemberDTO)
                        .build()
                );
    }
}
