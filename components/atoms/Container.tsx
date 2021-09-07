import React from "react";
import styled from "styled-components";
import { DefaultTheme } from "styled-components";

function maxWidth(theme: DefaultTheme) {
  let output = "";
  for (const value of Object.values(theme.breakpoints)) {
    if (value > 400)
      output += `@media (min-width: ${value}px) {
      max-width: ${value}px;
    }\n`;
  }
  return output;
}

export const ContainerComponent = styled.div`
  width: "100%";
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  ${(props) => maxWidth(props.theme)}
`;

export interface ContainerProps
  extends React.ComponentProps<typeof ContainerComponent> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { children, as, ...rest } = props;

    return (
      <ContainerComponent as={as} ref={ref} {...rest}>
        {children}
      </ContainerComponent>
    );
  },
);

Container.displayName = "Container";

export default Container;
