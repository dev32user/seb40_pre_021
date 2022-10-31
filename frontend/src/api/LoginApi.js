import axios from 'axios';
import { TokenExpireSetting } from './TokenApi';

const axiosConfig = {
	baseURL: 'http://localhost:3001',
};

const instance = axios.create(axiosConfig);

//test
//test를 위해 회원가입 데이터를 get 하여 들고옴
export const Login = async (data) => {
	try {
		const result = await instance.get(`/signup`);
		if (result.data.accessToken) {
			TokenExpireSetting(result);
		} else {
			throw Error('accessToken is not defined');
		}
		const result2 = await instance.post(
			`/login
		`,
			result.data,
		);
		return result.data;
	} catch (err) {
		console.log(err);
	}
};

//real
// export const Login = async (data) => {
// 	try {
// 		const result = await instance.post(`/users/login`, data);
// if (result.data.accessToken) {
// 	TokenExpireSetting(result);
// } else {
// 	throw Error('accessToken is not defined');
// }
// return result.data;
// } catch (err) {
// console.log(err);
// throw Error(err);
// }
// };
