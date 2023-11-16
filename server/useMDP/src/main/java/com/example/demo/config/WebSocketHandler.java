package com.example.demo.config;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
@NoArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private static final ConcurrentHashMap<String, WebSocketSession> CLIENTS = new ConcurrentHashMap<String, WebSocketSession>();
    // socket으로 썻던게 여기서는 session으로 되어있어서 아래도 모두 session이라 되어 있을 것
    // 즉, CLIENTS는 소켓을 모두 모아 놓는 곳

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 처음 소켓 연결 요청이 올때 함수 .onopen 으로 요청을 보냄
        CLIENTS.put(session.getId(), session); // [ id = ~~ , uri = ws://localhost:8000/socket ] 형태
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        CLIENTS.remove(session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // .send로 요청을 보내서
        String id = session.getId();  //메시지를 보낸 아이디
        CLIENTS.entrySet().forEach( arg -> {
            if(!arg.getKey().equals(id)) {  //같은 아이디가 아니면 메시지를 전달합니다. 즉, 본인 한테는 안 옴
                try {
                    arg.getValue().sendMessage(message);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}