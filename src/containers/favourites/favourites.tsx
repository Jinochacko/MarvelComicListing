import styled from "@emotion/styled";
import { FavouriteCard } from "../../components/favouriteCard/favouriteCard";
import { Image } from "../../components/image/image";
import { Label } from "../../components/label/label";
import { Scrollbar } from "../../components/scrollbar/scrollbar";
import { images } from "../../constants/images";
import { styles } from "../../constants/style";
import { texts } from "../../constants/text";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { favouritesList, setState } from "../../store/slices/moviesSlice";
import { MoviesItem } from "../../types/movies";

const FavouriteContainer = styled.aside`
  background: ${styles.white};
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 30%;
  filter: drop-shadow(-10px 0px 5px rgba(0, 0, 0, 0.5));
  .no-item-text {
    margin: 48px 0;
    float: left;
    width: 100%;
    text-align: center;
  }
`;

const FavHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 32px;
  border-bottom: 1px solid ${styles.lightGray};
`;

const FavListWrap = styled.div`
  height: calc(100vh - 130px);
`;

const FavList = styled.div`
  padding: 0 32px;
`;

const HeadActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
`;

interface FavouritesProps {
  onClose: (showFav: boolean) => void;
}

export const Favourites = ({ onClose }: FavouritesProps) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(favouritesList);
  const removeFavourite = (movie: MoviesItem) => {
    const items = [...favourites];
    const index = items.findIndex((item) => item.id === movie.id);
    if (index !== -1) {
      items.splice(index, 1);
      dispatch(setState({ favourites: items }));
    }
  };

  const clearAll = () => dispatch(setState({ favourites: [] }));

  return (
    <FavouriteContainer>
      <FavHeader>
        <Label
          color={styles.redColor}
          text={texts.favHeading}
          fontSize="24px"
          fontWeight="500"
        />
        <HeadActions>
          <Label text={texts.clearAll} onClick={clearAll} fontWeight="bold" />
          <span onClick={() => onClose(false)}>
            <Image src={images.closeBlack} />
          </span>
        </HeadActions>
      </FavHeader>
      {favourites.length > 0 ? (
        <FavListWrap>
          <Scrollbar showScrollByDefault={false}>
            <FavList>
              {favourites.map((movie) => (
                <FavouriteCard
                  movie={movie}
                  removeFavourite={removeFavourite}
                />
              ))}
            </FavList>
          </Scrollbar>
        </FavListWrap>
      ) : (
        <Label text={texts.noItem} className="no-item-text" />
      )}
    </FavouriteContainer>
  );
};
