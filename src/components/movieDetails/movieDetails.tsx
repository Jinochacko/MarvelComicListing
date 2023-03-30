import styled from "@emotion/styled";
import { images } from "../../constants/images";
import { styles } from "../../constants/style";
import { texts } from "../../constants/text";
import { MoviesItem } from "../../types/movies";
import { Button } from "../button/button";
import { Image } from "../image/image";
import { Label } from "../label/label";

interface MovieDetailsProps {
  positionX: number;
  positionY: number;
  movie: MoviesItem;
  closeDetails: () => void;
}

interface DetailsContainerProps {
  positionX: number;
  positionY: number;
}

const DetailsContainer = styled.section<DetailsContainerProps>`
  border-radius: 5px;
  display: flex;
  position: absolute;
  padding: 16px;
  top: ${(props) => props.positionY ?? 0}px;
  left: ${(props) => props.positionX ?? 0}px;
  background: ${styles.white};
  height: calc(100% / 1.8);
  width: calc(100% / 3.5 * 1.3);
  filter: drop-shadow(0px 15px 20px #000000);
  min-width: 480px;
  min-height: 290px;
`;

const DetailsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  .movie-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  button {
    font-family: Montserrat;
  }
`;

const TitleAndClose = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  label {
    padding-right: 10px;
  }
`;

const MovieInfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Roboto;
  color: ${styles.grayColor};
`;
const MovieInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const RatingWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  img,
  label {
    margin-right: 5px;
  }
  img {
    width: 14px;
    height: 13px;
  }
`;

export const MovieDetails = ({
  positionX,
  positionY,
  movie,
  closeDetails,
}: MovieDetailsProps) => {
  return (
    <DetailsContainer positionX={positionX} positionY={positionY}>
      <Image
        src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`}
        width="35%"
        height="100%"
      />
      <DetailsWrap>
        <TitleAndClose>
          <Label text={movie.title} fontSize="24px" />
          <span onClick={closeDetails}>
            <Image src={images.closeBlack} />
          </span>
        </TitleAndClose>
        <MovieInfoWrap>
          <MovieInfoItem>
            <Label text={texts.genre} />
            <Label text={texts.genrePlaceholder} />
          </MovieInfoItem>
          <MovieInfoItem>
            <Label text={texts.price} />
            <Label
              text={`$${movie.prices?.length ? movie.prices[0].price : "-"}`}
            />
          </MovieInfoItem>
          <MovieInfoItem>
            <Label text={texts.length} />
            <Label text={texts.lengthPlaceholder} />
          </MovieInfoItem>
          <MovieInfoItem />
        </MovieInfoWrap>
        <RatingWrap>
          <Label
            text={texts.public}
            color={styles.grayColor}
            className="roboto"
          />
          <Rating>
            <Label text="4.5" className="roboto" />
            <Image src={images.star} />
            <Image src={images.star} />
            <Image src={images.star} />
            <Image src={images.star} />
            <Image src={images.starHalf} />
          </Rating>
        </RatingWrap>
        {movie.description && (
          <Label
            text={movie.description}
            color={styles.grayColor}
            className="movie-description roboto"
          />
        )}
        <Button
          bgColor={styles.redColor}
          color={styles.white}
          label={texts.watchNow}
          onClick={() => {}}
          height="48px"
          icon={<Image src={images.video} />}
        />
      </DetailsWrap>
    </DetailsContainer>
  );
};
