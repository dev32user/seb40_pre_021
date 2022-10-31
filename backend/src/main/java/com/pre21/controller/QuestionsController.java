package com.pre21.controller;

import com.pre21.dto.QuestionDto;
import com.pre21.dto.QuestionsPostDto;
import com.pre21.dto.QuestionsResponseDto;
import com.pre21.entity.Questions;
import com.pre21.mapper.QuestionsMapper;
import com.pre21.service.QuestionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionsController {
    private final QuestionsService questionsService;
    private final QuestionsMapper mapper;

    // 질문 생성
    @PostMapping("/ask")
    public void createQuestion(@RequestBody QuestionsPostDto questionsPostDto) throws Exception {
        //Questions questions = mapper.questionsPostToQuestion(questionsPostDto);

      questionsService.createQuestion(questionsPostDto);

        //return new ResponseEntity(questions, HttpStatus.CREATED);

       /* return new ResponseEntity<>(mapper.questionsToQuestionResponse(createdQuestion, null),
                HttpStatus.CREATED);*/
    }


    // 질문 조회
    @GetMapping("/{question-id}")
    private ResponseEntity getQuestion(@PathVariable("question-id") Long questionId) {
        Questions questions = questionsService.findQuestion(questionId);

        return new ResponseEntity<>(mapper.questionsToQuestionResponse(questions),
                HttpStatus.OK);
    }


    // 질문 삭제
    @DeleteMapping("/delete/{question-id}")
    public void deleteQuestions(@PathVariable("question-id") Long questionId) throws Exception {
        questionsService.deleteQuestion(questionId);
    }
}
