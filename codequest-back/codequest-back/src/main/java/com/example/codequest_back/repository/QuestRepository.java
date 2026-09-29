package com.example.codequest_back.repository;

import com.example.codequest_back.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Integer> {
    // ユーザーIDに紐づくクエスト一覧を取得するためのメソッドを定義
    List<Quest> findByUserId(Integer userId);
}