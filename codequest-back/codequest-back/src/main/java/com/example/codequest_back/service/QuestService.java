package com.example.codequest_back.service;

import com.example.codequest_back.entity.Quest;
import com.example.codequest_back.repository.QuestRepository;
import com.example.codequest_back.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestService {

    private final QuestRepository questRepository;
    private final UserRepository userRepository;

    // RepositoryをServiceに注入（DI: 依存性の注入）します
    public QuestService(QuestRepository questRepository,UserRepository userRepository) {
        this.questRepository = questRepository;
        this.userRepository = userRepository;
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
        return questRepository.findById(questId).map(quest -> {
            System.out.println("=== クエスト完了処理 ===");
            System.out.println("完了するクエストID: " + questId);
            System.out.println("このクエストの持ち主(UserID): " + quest.getUserId());

            if (!quest.getIsCompleted()) {
                quest.setIsCompleted(true);

                // UserIDがセットされていない場合
                if (quest.getUserId() == null) {
                    System.out.println("【エラー】クエストにUserIDがありません！");
                } else {
                    // UserIDをもとにデータベースを検索
                    userRepository.findById(quest.getUserId()).ifPresentOrElse(user -> {
                        int newExp = user.getExp() + 100;
                        int newLevel = 1 + (newExp / 300);

                        user.setExp(newExp);
                        user.setLevel(newLevel);
                        userRepository.save(user);
                        System.out.println("【成功】ユーザー(" + user.getLoginId() + ") のEXPを保存しました");
                    }, () -> {
                        System.out.println("【エラー】UserID: " + quest.getUserId() + " のユーザーがデータベースに見つかりません！");
                    });
                }
            } else {
                System.out.println("このクエストはすでに完了済みです。");
            }
            return questRepository.save(quest);
        }).orElseThrow(() -> new RuntimeException("クエストが見つかりません"));
    }

    //クエストを削除する
    public void deleteQuest(Integer questId) {
        questRepository.deleteById(questId);
    }
}