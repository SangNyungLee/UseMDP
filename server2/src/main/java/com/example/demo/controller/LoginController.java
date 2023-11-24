package com.example.demo.controller;

import com.example.demo.dto.CodeDTO;
import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.ResponseDTO.APIResponseDTO;
import com.example.demo.dto.ResponseDTO.ResponseMemberDTO;
import com.example.demo.dto.SocialLoginDTO.SocialDTO;
import com.example.demo.entity.MemberEntity;
import com.example.demo.service.GithubLoginService;
import com.example.demo.service.GoogleLoginService;
import com.example.demo.service.MemberService;
import com.example.demo.utils.JwtTokenUtil;
import com.example.demo.utils.SocialLoginAPI;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServerHttpResponse;
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
    @PostMapping("/api/googleCode")
    public ResponseEntity<APIResponseDTO<ResponseMemberDTO>> googleLogin(@RequestBody CodeDTO codeDTO, HttpServletResponse response){
        // 서버에서 구글에서 받은 authorizationCode
        String code = codeDTO.getAuthorizationCode();

        // authorizationCode로 로그인 후 사용자 정보 받기
        SocialDTO user = googleLoginService.socialLogin(code, "registergoogle");

        // 사용자 정보 DB에 갱신
        MemberDTO member = memberService.saveMember(user);

        // 갱신된 사용자 정보 DTO 생성
        ResponseMemberDTO responseMemberDTO = ResponseMemberDTO.builder()
                .socialId(member.getSocialId())
                .socialNickname(member.getSocialNickname())
                .socialProfilePicture(member.getSocialProfilePicture())
                .build();

        // 갱신된 사용자 정보의 memberId 로 JWT 토큰 발행
        String token = jwtTokenUtil.createToken(member.getMemberId());
        System.out.println("JWT token = " + token);

        // 발행된 JWT 토큰을 쿠키로 설정 및 전달
        Cookie cookie = new Cookie("auth", token);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setPath("/");

        System.out.println("cookie = " + cookie.getValue());

        response.addCookie(cookie);

        // 응답 결과 전달
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(APIResponseDTO.<ResponseMemberDTO>builder()
                        .resultCode("201")
                        .message("로그인 성공")
                        .data(null)
                        .build()
                );
    }

    @Override
    @PostMapping("/api/githubCode")
    public ResponseEntity<APIResponseDTO<ResponseMemberDTO>> githubLogin(@RequestBody CodeDTO codeDTO, HttpServletResponse response){
        String code = codeDTO.getAuthorizationCode();
        SocialDTO user = githubLoginService.gitLogin(code);

        MemberDTO member = memberService.saveMember(user);
        ResponseMemberDTO responseMemberDTO = ResponseMemberDTO.builder()
                .socialId(member.getSocialId())
                .socialNickname(member.getSocialNickname())
                .socialProfilePicture(member.getSocialProfilePicture())
                .build();

        String token = jwtTokenUtil.createToken(member.getMemberId());
        System.out.println("JWT token = " + token);

        Cookie cookie = new Cookie("auth", token);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setPath("/");

        System.out.println("cookie = " + cookie.getValue());

        response.addCookie(cookie);



        return ResponseEntity
                .status(HttpStatus.OK)
                .body(APIResponseDTO.<ResponseMemberDTO>builder()
                        .resultCode("201")
                        .message("로그인 성공")
                        .data(responseMemberDTO)
                        .build()
                );
    }

//    @GetMapping("/login/oauth2/code/{registrationId}")
//    public void googleLogin(@RequestParam String code, @PathVariable String registrationId){
//        if ("github".equals(registrationId)) {
//            System.out.println(code);
//            githubLoginService.gitLogin(code);
//        }else{
//                Map<String, String> result = googleLoginService.socialLogin(code, registrationId);
//                System.out.println("2번 register" + registrationId);
//                System.out.println("아이디: " + result.get("id"));
//                System.out.println("닉네임: " + result.get("nickname"));
//        }
//    }
}
