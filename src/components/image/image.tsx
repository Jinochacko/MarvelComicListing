import styled from "@emotion/styled";

interface ImgProps {
  src: string;
  height?: string;
  width?: string;
}

interface ImgStyledProp {
  height?: string;
  width?: string;
}

const Img = styled.img<ImgStyledProp>`
  height: ${(props) => props.height ?? "auto"};
  width: ${(props) => props.width ?? "auto"};
`;

export const Image = ({ src, height, width }: ImgProps) => {
  return <Img src={src} width={width} height={height} />;
};
