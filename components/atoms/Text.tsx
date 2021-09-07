import React from "react";
import styled from "styled-components";

export const TextComponent = styled.p`
  margin: 0;
  height: 100%;
`;

export const CaptionComponent = styled(TextComponent)`
  font-size: ${(props) => props.theme.fonts.size.tiny}px;
  font-weight: ${(props) => props.theme.fonts.weight.medium};
  font-style: italic;
`;

export interface TextProps extends React.ComponentProps<typeof TextComponent> {
  caption?: boolean;
}

const Text = React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {
  const { children, as, caption, ...rest } = props;
  const Component = caption ? CaptionComponent : TextComponent;

  return (
    <Component as={as} ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Text.displayName = "Text";

export default Text;
