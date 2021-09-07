import React from "react";
import styled from "styled-components";

export const PaperComponent = styled.div`
  border: 1px solid #0003;
  border-radius: ${(props) => props.theme.shapes.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.paper.main};
  overflow: hidden;
`;

export interface PaperProps
  extends React.ComponentProps<typeof PaperComponent> {}

const Paper = React.forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  const { children, as, ...rest } = props;

  return (
    <PaperComponent as={as} ref={ref} {...rest}>
      {children}
    </PaperComponent>
  );
});

Paper.displayName = "Paper";

export default Paper;
