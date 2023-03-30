import styled from "@emotion/styled";
import { ReactNode } from "react";
import { styles } from "../../constants/style";

interface ButtonProps {
  label: string;
  bgColor?: string;
  color?: string;
  fontSize?: string;
  icon?: ReactNode;
  height?: string;
  width?: string;
  onClick: () => void;
}

interface ButtonStyledProps {
  bgColor?: string;
  color?: string;
  fontSize?: string;
  height?: string;
  width?: string;
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  background-color: ${(props) => props.bgColor ?? styles.white};
  padding: 10px;
  border: 0;
  border-radius: 80px;
  color: ${(props) => props.color ?? "inherit"};
  font-size: ${(props) => props.fontSize ?? "17px"};
  height: ${(props) => props.height ?? "auto"};
  width: ${(props) => props.width ?? "auto"};
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
  height,
  width,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyled
      type="button"
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      height={height}
      width={width}
      onClick={onClick}
    >
      {label}
      {icon}
    </ButtonStyled>
  );
};
