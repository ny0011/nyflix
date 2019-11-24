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

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
  }

  render() {
    const { result, error, loading } = this.state;
    console.log(this.props);
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
