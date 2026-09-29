package com.example.codequest_back.controller;

import com.example.codequest_back.entity.Quest;
import com.example.codequest_back.service.QuestService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/quests")
@CrossOrigin(origins = "http://localhost:5173") // Reactからのアクセスを許可する設定
public class QuestController {

    private final QuestService questService;

    public QuestController(QuestService questService) {
        this.questService = questService;
    }

    /*
     * クエスト一覧取得API
     * GET /api/quests
     */
    @GetMapping
    public List<Quest> getQuests() {
        // ※本来はログイン中のユーザーIDを取得しますが、今回はテスト用にID=1で固定します
        Integer currentUserId = 1;
        return questService.getQuestsByUserId(currentUserId);
    }
}