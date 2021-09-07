import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import { PaperComponent, PaperProps } from "../atoms/Paper";
import Text from "../atoms/Text";

interface CardMediaProps {
  src: string;
  alt?: string;
}

const CardMedia = styled(PaperComponent).attrs({
  as: "img",
})<CardMediaProps>`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const CardMediaWrapper = styled.div<{}>`
  height: 100%;
  width: 100%;
`;

const Section = styled.section<{ height?: string }>`
  overflow: hidden;
  &.media {
    flex: 1;
    //background-color: #f00;
  }
  &.heading {
  }
`;

export const CardComponent = styled(PaperComponent)<{
  height?: string;
  width?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space}px;
  padding: ${(props) => props.theme.space}px;
  cursor: ${(props) => props.onClick && "pointer"};
  //box-shadow: ${(props) => props.theme.shadows[0]};
  height: ${(props) => (props.height ? `${props.height}` : "100%")};
  width: ${(props) => (props.width ? `${props.width}` : "min-content")};
  min-width: 96px;
`;

export interface CardProps extends PaperProps {
  src: string;
  title?: string;
  height?: string;
  onClick?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { children, src, title, height, onClick, ...rest } = props;
  return (
    <CardComponent
      as="article"
      ref={ref}
      onClick={onClick}
      height={height}
      {...rest}
    >
      <Section className="media">
        <CardMediaWrapper>
          <CardMedia src={src} />
        </CardMediaWrapper>
      </Section>
      {title && (
        <Section className="heading">
          <Text caption>{title}</Text>
        </Section>
      )}
      {false && (
        <Section className="action">
          <Button>Buy</Button>
        </Section>
      )}
    </CardComponent>
  );
});

Card.displayName = "Card";

export default Card;
