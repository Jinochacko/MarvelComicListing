import styled from "@emotion/styled";

interface LabelProps {
  text: string;
  fontSize?: string;
  color?: string;
  className?: string;
  fontWeight?: string;
  onClick?: () => void;
}

interface LabelStyledProps {
  fontSize?: string;
  color?: string;
  fontWeight?: string;
}

const LabelStyled = styled.label<LabelStyledProps>`
  border-radius: 30%;
  color: ${(props) => props.color ?? "inherit"};
  font-size: ${(props) => props.fontSize ?? "inherit"};
  font-weight: ${(props) => props.fontWeight ?? "inherit"};
`;

export const Label = ({
  text,
  fontSize,
  fontWeight,
  color,
  className,
  onClick,
}: LabelProps) => {
  return (
    <LabelStyled
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      className={className}
      onClick={onClick}
    >
      {text}
    </LabelStyled>
  );
};
