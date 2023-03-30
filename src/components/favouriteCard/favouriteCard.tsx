import styled from "@emotion/styled";
import { images } from "../../constants/images";
import { styles } from "../../constants/style";
import { MoviesItem } from "../../types/movies";
import { Image } from "../image/image";
import { Label } from "../label/label";

interface FavouriteCardProps {
  movie: MoviesItem;
  removeFavourite: (movie: MoviesItem) => void;
}

const FavCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${styles.lightGray};
  label {
    width: 70%;
    font-family: "Montserrat";
    font-size: 17px;
    font-weight: 400;
    padding-left: 5px;
  }
`;

const FavIconWrap = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
`;

export const FavouriteCard = ({
  movie,
  removeFavourite,
}: FavouriteCardProps) => {
  return (
    <FavCard>
      <Image
        src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`}
        width="60px"
        height="calc(100vh/9 - 32px)"
      />
      <Label text={movie.title} color={styles.grayColor} />
      <FavIconWrap onClick={() => removeFavourite(movie)}>
        <Image src={images.favIconFilled} />
      </FavIconWrap>
    </FavCard>
  );
};
