package com.pre21.dto;

import com.pre21.entity.Questions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class QuestionCommentPostDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GetResponseDto {
        private Long commentId;
        private Questions question;
        private String comments;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
