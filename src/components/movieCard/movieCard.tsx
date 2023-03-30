import styled from "@emotion/styled";
import React from "react";
import { images } from "../../constants/images";
import { styles } from "../../constants/style";
import { MoviesItem } from "../../types/movies";
import { Image } from "../image/image";

interface MoviesCardProps {
  movie: MoviesItem;
  addToFavourite: (movie: MoviesItem) => void;
  isFavourite: boolean;
  loadDetails: (x: number, y: number, movie: MoviesItem) => void;
}

const CardContainer = styled.article`
  height: calc(100% / 2);
  padding: 5px;
  float: left;
  width: calc(100% / 6);
`;

const FullSize = styled.div`
  height: 100%;
  width: 100%;
`;

const CardWrapper = styled(FullSize)`
  position: relative;
  :hover > div {
    display: block;
  }
`;

const Rollover = styled(FullSize)`
  background: ${styles.rolloverBg};
  position: absolute;
  top: 0;
  display: none;
`;

const RolloverContainer = styled(FullSize)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FavIcon = styled.div`
  padding: 16px;
  display: flex;
  justify-content: end;
`;

const MovieTitle = styled.div`
  background: ${styles.white};
  font-family: Montserrat;
  font-weight: 900;
  line-height: 17px;
  padding: 1rem;
`;

export const MovieCard = ({
  movie,
  addToFavourite,
  loadDetails,
  isFavourite,
}: MoviesCardProps) => {
  const handleRolloverClick = (e: React.MouseEvent) => {
    let clientX = e.screenX;
    let clientY = e.screenY;
    const bodyHeight = document.getElementsByTagName("body")[0].clientHeight;
    const bodyWidth = document.getElementsByTagName("body")[0].clientWidth;
    if (clientY > bodyHeight / 2) {
      clientY = clientY - bodyHeight * 0.4;
    } else {
      clientY = clientY - 200;
    }
    if (clientX > bodyWidth * 0.5) {
      clientX = clientX - bodyWidth * 0.35;
    }
    loadDetails(clientX, clientY, movie);
  };

  return (
    <CardContainer>
      <CardWrapper>
        <Image
          src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`}
          width="100%"
          height="100%"
        />
        <Rollover onClick={handleRolloverClick}>
          <RolloverContainer>
            <FavIcon>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToFavourite(movie);
                }}
              >
                <Image src={isFavourite ? images.favIconFilled : images.fav} />
              </span>
            </FavIcon>
            <MovieTitle>{movie.title}</MovieTitle>
          </RolloverContainer>
        </Rollover>
      </CardWrapper>
    </CardContainer>
  );
};
