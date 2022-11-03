import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from '../components/common/Editor';
import Controller from '../components/Question/Controller';
import Button from '../components/common/Button';
import { answer, getQuestion, getUserInfo } from '../api/QuestionApi';
import timeForToday from '../utils/timeForToday';

const Question = () => {
	const [thread, setThread] = useState('');
	const [nickname, setNickname] = useState('');
	const [isBookmarked, setIsBookmarked] = useState(false);

	const [answerData, setAnswerData] = useState('');

	useEffect(() => {
		getUserInfo().then((res) => setNickname(res.nickname));
	}, []);

	useEffect(() => {
		getQuestion().then((res) => setThread(res));
	}, []);

	useEffect(() => {
		if (thread) {
			const bookmarked = thread.bookmarks.filter(
				(el) => el.nickname === nickname,
			);
			if (bookmarked.length !== 0) setIsBookmarked(true);
			else setIsBookmarked(false);
		}
	}, []);

	const handleAnswer = (str) => {
		setAnswerData({
			body: str,
		});
	};

	const handleSubmitAnswer = () => {
		answer(JSON.stringify(answerData));
	};

	return (
		thread && (
			<>
				<Wrapper>
					<QuestionGroup>
						<Header>
							<Title>{thread.title}</Title>
							<Btn>
								<Link to="/questions/ask">Ask Question</Link>
							</Btn>
							<Info>
								Asked{' '}
								<span>{' ' + timeForToday(thread.createdAt) + ' ago'}</span>
								Viewed<span>{' ' + thread.views + ' times'}</span>
							</Info>
							<hr />
						</Header>
						<QuestionContainer>
							<Left>
								<Controller
									votecount={thread.vote}
									bookmark={isBookmarked}
									QcreatorNickname={thread.nickname}
									loginNickname={nickname}></Controller>
							</Left>
							<Right>
								<Body
									dangerouslySetInnerHTML={{
										__html: thread.contents,
									}}></Body>
								<Tags>
									{thread.questionsTags.map((el) => (
										<span key={el.tagId}>{el.title}</span>
									))}
								</Tags>

								<Footer>
									<Options>
										<span>Share</span>
										{nickname === thread.nickname && <span>Edit</span>}
									</Options>
									<History>
										{!isNaN(timeForToday(thread.modifiedAt)) &&
											'Edited ' + timeForToday(thread.modifiedAt) + ' ago'}
									</History>
									<Profile>
										<div></div>
										<span>{thread.nickname}</span>
									</Profile>
								</Footer>
								{thread.comments && <hr />}
								{thread.comments &&
									thread.comments.map((c) => (
										<Grouper key={c.id}>
											<Comments>
												<span>{c.comments} – </span>
												<span className="nickname">{c.nickname}</span>
												<span className="createdAt">
													{' ' + timeForToday(c.createdAt) + ' ago'}
												</span>
												{nickname === c.nickname && (
													<span className="delete"> × </span>
												)}
											</Comments>
											<hr />
										</Grouper>
									))}
								<CommentCreate>Add a comment</CommentCreate>
							</Right>
						</QuestionContainer>
					</QuestionGroup>
					<hr />
					<AnswerGroup>
						<Header>
							<AnswerCount>{thread.answers.length} Answers</AnswerCount>
						</Header>
						{thread.answers &&
							thread.answers.map((el) => (
								<Grouper key={el.answerId}>
									<AnswerContainer>
										<Left>
											<Controller
												kind="answer"
												votecount={el.vote}
												bookmark={isBookmarked}
												chose={el.choosed}
												QcreatorNickname={thread.nickname}
												loginNickname={nickname}></Controller>
										</Left>
										<Right>
											<Body
												dangerouslySetInnerHTML={{
													__html: el.contents,
												}}></Body>
											<Footer>
												<Options>
													<span>Share</span>
													{nickname === el.nickname && <span>Edit</span>}
												</Options>
												<History>
													{!isNaN(timeForToday(thread.modifiedAt)) &&
														'Edited ' +
															timeForToday(thread.modifiedAt) +
															' ago'}
												</History>
												<Profile>
													<div></div>
													<span>{el.nickname}</span>
												</Profile>
											</Footer>
											{el.comments && <hr />}
											{el.comments &&
												el.comments.map((c) => (
													<Grouper key={c.id}>
														<Comments>
															<span>{c.comments} – </span>
															<span className="nickname">{c.nickname}</span>
															<span className="createdAt">
																{' ' + timeForToday(c.createdAt) + ' ago'}
															</span>
															{nickname === c.nickname && (
																<span className="delete"> × </span>
															)}
														</Comments>
														<hr />
													</Grouper>
												))}
											<CommentCreate>Add a comment</CommentCreate>
										</Right>
									</AnswerContainer>
									<hr />
								</Grouper>
							))}
					</AnswerGroup>

					<EditGroup>
						<YourAnswer>Your Answer</YourAnswer>
						<Editor callback={handleAnswer} />
						<Button text="Post Your Answer" callback={handleSubmitAnswer} />
					</EditGroup>
				</Wrapper>
			</>
		)
	);
};
const Wrapper = styled.section`
	position: relative;
	max-width: 1080px;
	padding: 1.5rem 0 1.5rem 1.5rem;
	hr {
		margin: 1rem 0 1rem;
		height: 1px;
		background-color: rgb(187, 191, 195);
		border: none;
	}
`;
const Grouper = styled.div``;
const QuestionGroup = styled.article``;

const Header = styled.div``;
const Title = styled.h1`
	width: 100%;
	font-size: 1.75rem;
	font-weight: 400;
	line-height: 140%;
	margin-bottom: 0.25rem;
`;
const Btn = styled.div`
	position: absolute;
	right: 0;
	top: 2rem;
`;
const Info = styled.div`
	font-size: 0.8rem;
	margin-right: 1rem;
	color: rgb(108, 115, 123);
	span {
		color: black;
		margin-right: 1rem;
	}
`;

const QuestionContainer = styled.div`
	display: grid;
	grid-template-columns: 3.25rem 1fr;
`;
const Left = styled.div``;
const Right = styled.div`
	hr {
		/* Comment hr tag */
		margin: 0.25rem 0 0.25rem;
		background-color: rgb(241, 242, 242);
	}
`;
const Body = styled.div`
	width: auto;
	max-width: 62.25rem;
	line-height: 180%;
	margin-bottom: 1rem;
	/* 이하 Editor의 Result 컴포넌트와 같음*/
	ul {
		list-style-type: disc;
		margin-left: 1rem;
	}
	ol {
		list-style-type: decimal;
		margin-left: 1rem;
	}

	h1 {
		font-weight: 700;
		font-size: 1.25rem;
	}
	h2 {
		font-weight: 700;
		font-size: 1.1rem;
	}
	h3 {
		font-weight: 700;
	}

	strong {
		font-weight: 700;
	}
	em {
		font-style: italic;
	}
	hr {
		height: 1px;
	}
	pre {
		font-size: 0.9rem;
		background-color: #f6f6f6;
		padding: 0.5rem;
		overflow-x: auto;
	}
	code {
		font-size: 0.9rem;
		background-color: #f6f6f6;
		padding: 0.1rem 0.3rem 0.1rem 0.3rem;
	}

	p {
		margin-bottom: 1rem;
	}
`;

const Tags = styled.div`
	font-size: 0.85rem;
	margin-bottom: 1rem;
	max-width: 62.25rem;
	span {
		margin-right: 0.5rem;
		color: rgb(61, 123, 201);
		background-color: rgb(227, 236, 243);
		padding: 0.1rem 0.3rem 0.1rem 0.3rem;
		border-radius: 3px;
	}
`;
const Footer = styled.div`
	padding: 3rem 0 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
`;

const Options = styled.div`
	font-size: 0.85rem;
	color: rgb(108, 115, 123);
	span {
		margin-right: 1rem;
	}
`;
const History = styled.span`
	font-size: 0.85rem;
	color: rgb(108, 115, 123);
`;

const Profile = styled.div`
	font-size: 0.85rem;
`;

const Comments = styled.div`
	font-size: 0.85rem;
	padding: 0 0 0 1.5rem;
	line-height: 180%;
	.nickname {
		color: rgb(61, 123, 201);
		background-color: rgb(227, 236, 243);
		padding: 0.1rem 0.3rem 0.1rem 0.3rem;
		border-radius: 3px;
	}
	.createdAt {
		color: rgb(108, 115, 123);
	}
`;
const CommentCreate = styled.div`
	padding: 1rem 0 0 0;
	font-size: 0.85rem;
	color: rgb(187, 191, 195);
`;
const AnswerGroup = styled.div``;
const AnswerContainer = styled.article`
	display: grid;
	grid-template-columns: 3.25rem 1fr;
`;
const AnswerCount = styled.h2`
	font-size: 1.25rem;
	font-weight: 400;
	line-height: 140%;
	margin-bottom: 1rem;
`;

const EditGroup = styled.div``;
const YourAnswer = styled.h2`
	font-size: 1.25rem;
	font-weight: 400;
	line-height: 140%;
	margin-bottom: 1rem;
`;
export default Question;
