package com.example.codequest_back.service;

import com.example.codequest_back.entity.User;
import com.example.codequest_back.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //ログイン認証処理
    public User authenticate(String loginId, String password) {
        // IDでデータベースを検索
        Optional<User> userOptional = userRepository.findByLoginId(loginId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // ※今回はパスワードを暗号化せずにそのまま比較します
            if (user.getPassword().equals(password)) {
                return user; // 認証成功時はユーザー情報を返す
            }
        }
        // 一致しない場合はエラーを発生させる
        throw new RuntimeException("IDまたはパスワードが間違っています");
    }
}