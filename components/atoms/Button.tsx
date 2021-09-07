import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
  padding: ${(props) => props.theme.space}px
    ${(props) => props.theme.space * 2}px;
  border-radius: ${(props) => props.theme.shapes.borderRadius}px;
  border-width: 1px;
  border-color: #9994;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.primary.contrast};
  font-weight: ${(props) => props.theme.fonts.weight?.bold};
  //box-shadow: 0px 1px 3px -2px #000a;
  &:active {
    filter: brightness(0.98);
    box-shadow: 0px 0px 2px -2px #000a;
    transform: scale(0.98);
  }
`;

export interface ButtonProps
  extends React.ComponentProps<typeof ButtonComponent> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, ...other } = props;
    return (
      <ButtonComponent ref={ref} {...other}>
        {children}
      </ButtonComponent>
    );
  },
);

Button.displayName = "Button";

export default Button;
