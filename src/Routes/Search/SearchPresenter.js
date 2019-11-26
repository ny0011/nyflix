import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SearchPresenter = ({
	movieResults,
	tvResults,
	searchTerm,
	error,
	loading,
	handleSubmit
}) => null;

SearchPresenter.PropTypes = {
	movieResults: PropTypes.array,
	tvResults: PropTypes.array,
	searchTerm: PropTypes.string,
	error: PropTypes.bool.isRequired,
	loading: PropTypes.string,
	handleSubmit: PropTypes.func.isRequired
};

export default SearchPresenter;
