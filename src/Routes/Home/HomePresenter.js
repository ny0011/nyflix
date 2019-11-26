import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const HomePresenter = ({ topRated, upcoming, popular, error, loading }) => null;

HomePresenter.PropTypes = {
	topRated: PropTypes.array,
	upcoming: PropTypes.array,
	popular: PropTypes.array,
	error: PropTypes.bool.isRequired,
	loading: PropTypes.string
};

export default HomePresenter;
