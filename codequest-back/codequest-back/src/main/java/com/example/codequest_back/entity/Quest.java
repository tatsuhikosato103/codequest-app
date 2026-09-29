package com.example.codequest_back.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "quests")
@Data
public class Quest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quest_id")
    private Integer questId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "is_completed")
    private Boolean isCompleted;
}
