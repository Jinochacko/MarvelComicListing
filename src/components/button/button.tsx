import styled from "@emotion/styled";
import { ReactNode } from "react";
import { styles } from "../../constants/style";

interface ButtonProps {
  label: string;
  bgColor?: string;
  color?: string;
  fontSize?: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface ButtonStyledProps {
  bgColor?: string;
  color?: string;
  fontSize?: string;
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  background-color: ${(props) => props.bgColor ?? styles.white};
  padding: 5px;
  border: 0;
  border-radius: 16px;
  color: ${(props) => props.color ?? "inherit"};
  font-size: ${(props) => props.fontSize ?? "17px"};
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-left: 10px;
  }
`;

export const Button = ({
  label,
  bgColor,
  color,
  fontSize,
  icon = <></>,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyled
      type="button"
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      onClick={onClick}
    >
      {label}
      {icon}
    </ButtonStyled>
  );
};
