import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
	padding: 0px 20px;
`;

const HomePresenter = ({ nowPlaying, popular, upcoming, error, loading }) =>
	loading ? (
		<Loader></Loader>
	) : (
		<Container>
			{nowPlaying && nowPlaying.length > 0 && (
				<Section title="Now Playing">
					{nowPlaying.map(movie => (
						<span key={movie.id}>{movie.title}</span>
					))}
				</Section>
			)}
			{popular && popular.length > 0 && (
				<Section title="Popular Movie">
					{popular.map(movie => (
						<span key={movie.id}>{movie.title}</span>
					))}
				</Section>
			)}
			{upcoming && upcoming.length > 0 && (
				<Section title="Popular Movie">
					{upcoming.map(movie => (
						<span key={movie.id}>{movie.title}</span>
					))}
				</Section>
			)}
			{error && <Message text={error}></Message>}
		</Container>
	);

HomePresenter.propTypes = {
	nowPlaying: PropTypes.array,
	popular: PropTypes.array,
	upcoming: PropTypes.array,
	error: PropTypes.bool.isRequired,
	loading: PropTypes.string
};

export default HomePresenter;
