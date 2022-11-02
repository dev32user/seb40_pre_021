import { useState } from 'react';
import styled from 'styled-components';
import { choose } from '../../api/QuestionApi';

const HandleBookmark = () => {};

const Controller = ({
	kind,
	votecount,
	/*bookmark={thread.bookmark}*/
	choosed,
	QcreatorNickname,
	loginNickname,
}) => {
	const [vote, setVote] = useState(votecount);
	const [voteStatus, setVoteStatus] = useState('neutral');
	//const [bookmarked, setBookmarked] = useState(bookmark);
	const [chosen, setChosen] = useState(choosed);

	const handleUpVote = () => {
		if (voteStatus !== 'up') {
			setVoteStatus('up');
			setVote(votecount + 1);
		} else {
			setVoteStatus('neutral');
			setVote(votecount);
		}
	};
	const handleDownVote = () => {
		if (voteStatus !== 'down') {
			setVoteStatus('down');
			setVote(votecount - 1);
		} else {
			setVoteStatus('neutral');
			setVote(votecount);
		}
	};
	const handleChose = () => {
		if (chosen) setChosen(false);
		if (!chosen) setChosen(true);
		choose();
	};
	return (
		<>
			<Container>
				<Up onClick={handleUpVote}>
					<svg width="36" height="36" viewBox="0 0 36 36">
						<path d="M2 25h32L18 9 2 25Z"></path>
					</svg>
				</Up>
				<Votes>{vote}</Votes>
				<Down onClick={handleDownVote}>
					<svg width="36" height="36" viewBox="0 0 36 36">
						<path d="M2 11h32L18 27 2 11Z"></path>
					</svg>
				</Down>
				<Bookmark onClick={HandleBookmark} /*bookmark={bookmarked}*/>
					<svg width="18" height="18" viewBox="0 0 18 18">
						<path d="m9 10.6 4 2.66V3H5v10.26l4-2.66ZM3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"></path>
					</svg>
				</Bookmark>
				{kind === 'answer' && (
					<Choosed
						QcreatorNickname={QcreatorNickname}
						loginNickname={loginNickname}
						chosen={chosen}>
						<button onClick={handleChose}>
							<svg width="36" height="36" viewBox="0 0 36 36">
								<path d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"></path>
							</svg>
						</button>
						<div>
							<svg width="36" height="36" viewBox="0 0 36 36">
								<path d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"></path>
							</svg>
						</div>
					</Choosed>
				)}
				<History>
					<svg width="19" height="18" viewBox="0 0 19 18">
						<path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path>
					</svg>
				</History>
			</Container>
		</>
	);
};

const Container = styled.div`
	width: 36px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;
const Up = styled.button`
	cursor: pointer;
	svg {
		display: block;
		background-color: white;
		fill: rgb(187, 191, 195);
	}
	:active {
		svg {
			fill: rgb(229, 136, 62);
		}
	}
`;
const Votes = styled.div`
	margin: 0.5rem 0 0.5rem;
	font-size: 1.5rem;
	color: rgb(108, 115, 123);
`;
const Down = styled.button`
	cursor: pointer;
	svg {
		display: block;
		background-color: white;
		fill: rgb(187, 191, 195);
	}
	:active {
		svg {
			fill: rgb(229, 136, 62);
		}
	}
`;
const Bookmark = styled.button`
	cursor: pointer;
	margin: 0.5rem 0 0.5rem 0;
	svg {
		display: block;
		background-color: white;
		fill: ${(props) =>
			props.chosen === true ? 'rgb(229, 136, 62);' : 'rgb(187, 191, 195)'};
`;
const Choosed = styled.div`
	button {
		display: ${(props) =>
			props.QcreatorNickname === props.loginNickname ? 'block' : 'none'};
		cursor: pointer;
	}
	div {
		display: ${(props) =>
			props.QcreatorNickname === props.loginNickname ? 'none' : 'block'};
	}
	svg {
		display: block;
		background-color: white;
		fill: ${(props) =>
			props.chosen === true ? 'rgb(64, 110, 72)' : 'rgb(187, 191, 195)'};
	}
`;
const History = styled.button`
	cursor: pointer;
	margin: 0.5rem 0 0.5rem 0;
	svg {
		display: block;
		background-color: white;
		fill: rgb(187, 191, 195);
	}
`;
export default Controller;
