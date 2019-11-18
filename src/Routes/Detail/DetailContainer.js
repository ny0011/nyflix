import React from "react";
import DetailPresenter from "./DetailPresenter";

// movie detail이든 tv detail이든 상관없이 이 detail route를 사용할 것임.
// 왜냐면 movie, tv 둘다 id를 갖고 있으니까
export default class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true
  };

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
