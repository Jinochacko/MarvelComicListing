import styled from "@emotion/styled";

interface InputProps {
  value?: string;
  isItalic?: boolean;
  placeholder?: string;
  onChange?: (text: string) => void;
}

interface TextBoxProps {
  isItalic?: boolean;
}

const TextBox = styled.input<TextBoxProps>`
  border-radius: 1rem;
  border: 0;
  outline: none;
  padding: 0.5rem 1.5rem;
  font-style: ${(props) => (props.isItalic ? "italic" : "inherit")};
`;

export const Input = ({
  value,
  isItalic,
  placeholder,
  onChange,
}: InputProps) => {
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <TextBox
      type="text"
      value={value}
      isItalic={isItalic}
      placeholder={placeholder}
      onChange={onChangeHandle}
    />
  );
};
