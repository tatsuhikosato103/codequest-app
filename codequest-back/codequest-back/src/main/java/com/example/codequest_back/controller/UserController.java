package com.example.codequest_back.controller;

import com.example.codequest_back.dto.LoginRequest;
import com.example.codequest_back.entity.User;
import com.example.codequest_back.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /*
     * ログインAPI
     * POST /api/login
     */
    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // ▼ サーバーが何を受け取ったかコンソールに出力する（のぞき穴）
        System.out.println("=== ログイン通信テスト ===");
        System.out.println("受信したID: [" + loginRequest.getLoginId() + "]");
        System.out.println("受信したPASS: [" + loginRequest.getPassword() + "]");

        User user = userService.authenticate(loginRequest.getLoginId(), loginRequest.getPassword());

        if (user != null) {
            System.out.println("結果: ログイン成功！");
            return ResponseEntity.ok(user);
        } else {
            System.out.println("結果: ログイン失敗...");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("IDまたはパスワードが間違っています");
        }
    }
}