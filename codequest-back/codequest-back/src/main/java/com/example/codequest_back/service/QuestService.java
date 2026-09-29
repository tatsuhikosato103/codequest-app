package com.example.codequest_back.service;

import com.example.codequest_back.entity.Quest;
import com.example.codequest_back.repository.QuestRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestService {

    private final QuestRepository questRepository;

    // RepositoryをServiceに注入（DI: 依存性の注入）します
    public QuestService(QuestRepository questRepository) {
        this.questRepository = questRepository;
    }

    /*
     * 指定したユーザーのクエスト一覧を取得する
     */
    public List<Quest> getQuestsByUserId(Integer userId) {
        // Repositoryのメソッドを呼び出してデータベースから取得
        return questRepository.findByUserId(userId);
    }
}