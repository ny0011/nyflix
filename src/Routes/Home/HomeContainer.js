import React from "react";
import HomePresenter from "./HomePresenter";

// class 이름 없이 선언하고 바로 사용함.
export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true
  };

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
