import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

// 첫 화면에는 검색하지 않았으니까 false로 아무것도 띄우지 않는다.
// searchTerm에 어떤 단어가 들어오면 loading : true -> false로 바뀌고
// api로부터 결과를 얻어서 Results에 저장한다
export default class extends React.Component {
	state = {
		movieResults: null,
		tvResults: null,
		searchTerm: "",
		error: null,
		loading: false
	};

	handleSubmit = event => {
		event.preventDefault();
		const { searchTerm } = this.state;
		if (searchTerm !== "") {
			this.searchByTerm();
		}
	};

	updateTerm = event => {
		const {
			target: { value }
		} = event;
		this.setState({
			searchTerm: value
		});
	};

	searchByTerm = async () => {
		const { searchTerm } = this.state;
		this.setState({
			loading: true
		});
		try {
			const {
				data: { results: movieResults }
			} = await moviesApi.search(searchTerm);
			const {
				data: { results: tvResults }
			} = await tvApi.search(searchTerm);
			console.log(movieResults, tvResults);
			this.setState({
				movieResults,
				tvResults
			});
		} catch {
			this.setState({ error: "Can't find results." });
		} finally {
			this.setState({
				loading: false
			});
		}
	};

	render() {
		const {
			movieResults,
			tvResults,
			searchTerm,
			error,
			loading
		} = this.state;
		return (
			<SearchPresenter
				movieResults={movieResults}
				tvResults={tvResults}
				loading={loading}
				error={error}
				searchTerm={searchTerm}
				handleSubmit={this.handleSubmit}
				updateTerm={this.updateTerm}
			/>
		);
	}
}
