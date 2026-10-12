package com.example.codequest_back.repository;

import com.example.codequest_back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // ログインIDを元にユーザーを検索するメソッド
    Optional<User> findByLoginId(String loginId);
}