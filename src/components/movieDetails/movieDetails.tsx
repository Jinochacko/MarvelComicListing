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
`;

const DetailsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
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
          <Label text={movie.title} fontSize="20px" />
          <span onClick={closeDetails}>
            <Image src={images.closeBlack} />
          </span>
        </TitleAndClose>
        <Button
          bgColor={styles.redColor}
          color={styles.white}
          label={texts.watchNow}
          onClick={() => {}}
          icon={<Image src={images.video} />}
        />
      </DetailsWrap>
    </DetailsContainer>
  );
};
