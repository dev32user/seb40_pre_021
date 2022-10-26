import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMypageInfo } from '../api/mypageApi';
import Avatar from '../components/Mypage/Avatar';
import ProfileButton from '../components/Mypage/ProfileButton';
import UserNickname from '../components/Mypage/UserNickname';
import UserInfo from '../components/Mypage/UserInfo';
import useDate from '../hooks/useDate';
import { RiPencilFill } from 'react-icons/ri';
import { BiMessageDetail } from 'react-icons/bi';
import Navigation from '../components/Mypage/Navigation';

const Mypage = () => {
	const [info, setInfo] = useState({ nickname: '', createdAt: '' });
	const { nickname, createdAt } = info;
	const [date] = useDate(createdAt);

	useEffect(() => {
		getMypageInfo(1).then((res) => {
			setInfo(res);
		});
	}, []);

	return (
		<Container>
			<Box>
				<Avatar nickname={nickname} />
				<UserInfoBox>
					<UserNickname nickname={nickname} />
					<UserInfo date={date} />
				</UserInfoBox>
				<ProfileBtnArea>
					<ProfileButton text="Edit profile" icon={<RiPencilFill />} />
					<ProfileButton text="Newwork profile" icon={<BiMessageDetail />} />
				</ProfileBtnArea>
			</Box>
			<Box>
				<Navigation />
			</Box>
		</Container>
	);
};

export default Mypage;

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 24px;
`;

const Box = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 16px 0;
`;

const UserInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	flex-wrap: wrap;
	margin: 8px 12px;
`;

const ProfileBtnArea = styled.div`
	position: absolute;
	right: 24px;
	top: 24px;
	display: flex;
`;