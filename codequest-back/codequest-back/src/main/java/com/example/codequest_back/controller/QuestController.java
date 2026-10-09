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

    /*
     * クエスト登録API
     * POST /api/quests
     */
    @PostMapping
    public Quest createQuest(@RequestBody Quest quest) {
        // ※本来はログイン中のユーザーIDを取得しますが、今回はテスト用にID=1で固定します
        quest.setUserId(1);
        return questService.createQuest(quest);
    }
    /*
     * クエスト完了API
     * PUT /api/quests/{questId}/complete
     */
    @PutMapping("/{questId}/complete")
    public Quest completeQuest(@PathVariable Integer questId) {
        return questService.completeQuest(questId);
    }

    /*
     * クエスト削除（破棄）API
     * DELETE /api/quests/{questId}
     */
    @DeleteMapping("/{questId}")
    public void deleteQuest(@PathVariable Integer questId) {
        questService.deleteQuest(questId);
    }
}