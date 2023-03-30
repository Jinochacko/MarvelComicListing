import styled from "@emotion/styled";
import { Button } from "../../components/button/button";
import { styles } from "../../constants/style";
import { texts } from "../../constants/text";

const FooterArea = styled.footer`
  height: calc(7vh + 2px);
  background: ${styles.blackColor};
  margin-top: -2px;
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
  height: 100%;
  button {
    font-family: Roboto;
    font-size: 14;
    text-transform: uppercase;
    width: 150px;
  }
`;

interface FooterProps {
  loadContent: (type: string) => void;
}

export const Footer = ({ loadContent }: FooterProps) => {
  return (
    <FooterArea>
      <Container>
        <Button
          onClick={() => {
            loadContent("prev");
          }}
          label={texts.prevButton}
        />
        <Button
          onClick={() => {
            loadContent("next");
          }}
          label={texts.nextButton}
        />
      </Container>
    </FooterArea>
  );
};
