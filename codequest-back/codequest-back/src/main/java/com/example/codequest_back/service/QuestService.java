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

    // 指定したユーザーのクエスト一覧を取得する
    public List<Quest> getQuestsByUserId(Integer userId) {
        // Repositoryのメソッドを呼び出してデータベースから取得
        return questRepository.findByUserId(userId);
    }

    // 新しいクエストを登録する
    public Quest createQuest(Quest quest) {
        // 新規登録時は未完了(false)を明示的にセット
        quest.setIsCompleted(false);
        // Repositoryのsaveメソッドでデータベースに保存
        return questRepository.save(quest);
    }
    //クエストを完了状態に更新する
    public Quest completeQuest(Integer questId) {
        // IDでクエストを検索し、存在すれば完了状態(true)にして保存する
        return questRepository.findById(questId).map(quest -> {
            quest.setIsCompleted(true);
            return questRepository.save(quest);
        }).orElseThrow(() -> new RuntimeException("クエストが見つかりません"));
    }

    //クエストを削除する
    public void deleteQuest(Integer questId) {
        questRepository.deleteById(questId);
    }
}