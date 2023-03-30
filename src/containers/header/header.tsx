import { Image } from "../../components/image/image";
import styled from "@emotion/styled";
import { styles } from "../../constants/style";
import { Input } from "../../components/input/input";
import { Label } from "../../components/label/label";
import { texts } from "../../constants/text";
import { images } from "../../constants/images";

interface HeaderProps {
  onFavClick: (showFav: boolean) => void;
  onSearchChange: (search: string) => void;
  searchVal: string;
}

const HeaderContainer = styled.header`
  background: ${styles.redColor};
  padding: 1.6rem 0;
`;

const LogoContainer = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
`;

const InputWrapper = styled.div`
  width: 50%;
  margin-top: 1rem;
  display: flex;
  position: relative;
  align-items: center;
  input {
    width: 100%;
  }
`;

const Side = styled.aside`
  padding-top: 0.5rem;
  width: 20%;
  display: flex;
  justify-content: end;
  label {
    cursor: pointer;
    padding-right: 10px;
  }
  img {
    height: 24px;
    width: 24px;
  }
`;

const Container = styled.section`
  display: flex;
  max-width: 85%;
  margin: 0 auto;
`;

const ResetWrap = styled.span`
  position: absolute;
  right: 15px;
`;

export const Header = ({
  onFavClick,
  onSearchChange,
  searchVal,
}: HeaderProps) => {
  return (
    <HeaderContainer id="header">
      <Container>
        <Side />
        <LogoContainer>
          <Image src={images.logo} width="auto" />
          <InputWrapper>
            <Input
              isItalic={true}
              placeholder={texts.searchInputPlaceholder}
              onChange={onSearchChange}
              value={searchVal}
            />
            {searchVal && searchVal !== "" && (
              <ResetWrap onClick={() => onSearchChange("")}>
                <Image src={images.closeRed} />
              </ResetWrap>
            )}
          </InputWrapper>
        </LogoContainer>
        <Side>
          <Label
            text={texts.headerFavourites}
            onClick={() => onFavClick(true)}
            color={styles.white}
            fontSize="17px"
          />
          <span onClick={() => onFavClick(true)}>
            <Image src={images.fav} />
          </span>
        </Side>
      </Container>
    </HeaderContainer>
  );
};
