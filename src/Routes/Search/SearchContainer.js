import React from "react";
import SearchPresenter from "./SearchPresenter";

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

  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
      />
    );
  }
}
