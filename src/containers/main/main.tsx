import styled from "@emotion/styled";
import { useState } from "react";
import { MovieCard } from "../../components/movieCard/movieCard";
import { MovieDetails } from "../../components/movieDetails/movieDetails";
import { Scrollbar } from "../../components/scrollbar/scrollbar";
import { styles } from "../../constants/style";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  favouritesList,
  moviesList,
  setState,
} from "../../store/slices/moviesSlice";
import { MoviesItem } from "../../types/movies";

interface MainAreaProp {
  headerHeight: number;
  hasMoreRecoreds: boolean;
}

const MainArea = styled.main<MainAreaProp>`
  height: ${(props) =>
    props.hasMoreRecoreds
      ? `calc(100vh - 7vh - ${props.headerHeight}px`
      : `calc(100vh - ${props.headerHeight}px`});
  background: ${styles.blackColor};
`;

const ContentWrapper = styled.section`
  height: 100%;
  padding: 1rem 0;
  position: relative;
`;

const Container = styled.section`
  max-width: 85%;
  margin: 0 auto;
  height: 100%;
`;

interface MainProps {
  headerHeight: number;
  hasMoreRecoreds: boolean;
}

export const Main = ({ headerHeight, hasMoreRecoreds }: MainProps) => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MoviesItem>();
  const movies = useAppSelector(moviesList);
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(favouritesList);
  const favouritesIds = favourites.map((item) => item.id);
  const addToFavourite = (movie: MoviesItem) => {
    const items = [...favourites];
    const index = items.findIndex((item) => item.id === movie.id);
    if (index === -1) {
      items.push(movie);
      dispatch(setState({ favourites: items }));
    }
  };

  const loadDetails = (x: number, y: number, movie: MoviesItem) => {
    setPositionX(x);
    setPositionY(y);
    setShowDetails(true);
    setSelectedMovie(movie);
  };

  return (
    <MainArea headerHeight={headerHeight} hasMoreRecoreds={hasMoreRecoreds}>
      <ContentWrapper>
        <Scrollbar bgColor={styles.redColor}>
          <Container>
            {movies.length > 0 &&
              movies.map((movie, index) => (
                <MovieCard
                  addToFavourite={addToFavourite}
                  key={`movie-card${index}`}
                  movie={movie}
                  loadDetails={loadDetails}
                  isFavourite={favouritesIds.includes(movie.id)}
                />
              ))}
          </Container>
        </Scrollbar>
        {showDetails && (
          <MovieDetails
            positionX={positionX}
            positionY={positionY}
            movie={selectedMovie as MoviesItem}
            closeDetails={() => setShowDetails(false)}
          />
        )}
      </ContentWrapper>
    </MainArea>
  );
};
