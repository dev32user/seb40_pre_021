package com.pre21.service;

import com.pre21.dto.QuestionDto;
import com.pre21.entity.*;
import com.pre21.exception.BusinessLogicException;
import com.pre21.exception.ExceptionCode;
import com.pre21.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final UserRepository userRepository;
    private final QuestionsRepository questionsRepository;
    private final QuestionLikeRepository questionLikeRepository;
    private final AnswersRepository answersRepository;
    private final AnswerLikeRepository answerLikeRepository;


    // 질문 좋아요를 DB에 저장
    public void saveQuestionLike(Long questionId, QuestionDto.Like like) {
        Long userId = like.getUserId();
        // 유저 id를 통해 유저 조회
        User findUser = verifiedExistUser(userId);

        // 질문 id를 통해 질문 조회
        Questions findQuestion = verifiedExistQuestion(questionId);

        // 추천수 업데이트
        findQuestion.setVote(like.getCount());

        // 현재 유저의 질문 좋아요 상태를 가져온 후
        Optional<QuestionLikes> findQuestionLikes = findQuestionLike(findUser);


        if (findQuestionLikes.isPresent()) { // 상태 값이 있을 경우 업데이트
            QuestionLikes likes = findQuestionLikes.get();
            likes.setLikeYn(like.isLikeYn());
            likes.setUnlikeYn(like.isUnlikeYn());
            QuestionLikes savedLike = questionLikeRepository.save(likes);
            findQuestion.addQuestionsLikes(savedLike);
            findUser.addQuestionsLikes(savedLike);
        } else { // 없을 경우 QuestionLikes를 생성하여 저장
            QuestionLikes likes = new QuestionLikes(like.isLikeYn(), like.isUnlikeYn());
            likes.setUsers(findUser);
            likes.addQuestions(findQuestion);
            QuestionLikes savedLike = questionLikeRepository.save(likes);
            findQuestion.addQuestionsLikes(savedLike);
            findUser.addQuestionsLikes(savedLike);
        }
    }


    // 답변 좋아요를 DB에 저장
    public void saveAnswerLike(Long answerId, QuestionDto.Like like) {
        Long userId = like.getUserId();

        // 유저 id를 통해 유저 조회
        User findUser = verifiedExistUser(userId);

        // 답변 id를 통해 질문 조회
        Answers findAnswer = verifiedExistAnswer(answerId);

        // 추천수 업데이트
        findAnswer.setVote(like.getCount());

        // 현재 유저의 답변 좋아요 상태를 가져온 후
        Optional<AnswerLikes> findQuestionLikes = findAnswerLike(findUser);

        if (findQuestionLikes.isPresent()) { // 상태 값이 있을 경우 업데이트
            AnswerLikes likes = findQuestionLikes.get();
            likes.setLikeYn(like.isLikeYn());
            likes.setUnlikeYn(like.isUnlikeYn());
            AnswerLikes savedLike = answerLikeRepository.save(likes);
            findAnswer.addAnswerLike(savedLike);
            findUser.addAnswerLike(savedLike);
        } else {  // 없을 경우 AnswerLikes를 생성하여 저장
            AnswerLikes likes = new AnswerLikes(like.isLikeYn(), like.isUnlikeYn());
            likes.setUsers(findUser);
            likes.addAnswer(findAnswer);
            AnswerLikes savedLike = answerLikeRepository.save(likes);
            findAnswer.addAnswerLike(savedLike);
            findUser.addAnswerLike(savedLike);
        }
    }


    // 유저를 찾아 리턴
    private User verifiedExistUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)
        );
    }

    // 질문을 찾아 리턴
    private Questions verifiedExistQuestion(Long questionId) {
        return questionsRepository.findById(questionId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND)
        );
    }

    // 답변을 찾아 리턴
    private Answers verifiedExistAnswer(Long answerId) {
        return answersRepository.findById(answerId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND)
        );
    }


    private Optional<QuestionLikes> findQuestionLike(User user) {
        return questionLikeRepository.findQuestionLikesByUsers(user);
    }

    private Optional<AnswerLikes> findAnswerLike(User user) {
        return answerLikeRepository.findAnswerLikesByUsers(user);
    }
}
