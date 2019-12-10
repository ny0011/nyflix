import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

// class 이름 없이 선언하고 바로 사용함.
// 1) mount된 후에 3가지 정보를 찾는다
// 2) state 값을 설정한다
// 3) 에러가 있으면 loading:false
export default class extends React.Component {
	state = {
		nowPlaying: null,
		upcoming: null,
		popular: null,
		error: null,
		loading: true
	};

	async componentDidMount() {
		try {
			const {
				data: { results: nowPlaying }
			} = await moviesApi.nowPlaying();
			const {
				data: { results: upcoming }
			} = await moviesApi.upcoming();
			const {
				data: { results: popular }
			} = await moviesApi.popular();
			this.setState({
				nowPlaying,
				upcoming,
				popular
			});
		} catch (error) {
			this.setState({
				error: "Can't find movie information."
			});
		} finally {
			this.setState({
				loading: false
			});
		}
	}

	// object destructuring(객체 비구조화 할당)
	render() {
		const { nowPlaying, upcoming, popular, error, loading } = this.state;
		return (
			<HomePresenter
				nowPlaying={nowPlaying}
				upcoming={upcoming}
				popular={popular}
				error={error}
				loading={loading}
			/>
		);
	}
}
