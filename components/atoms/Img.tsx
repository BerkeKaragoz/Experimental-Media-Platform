import React, { ImgHTMLAttributes } from "react";
import styled from "styled-components";

const ImgComponent = styled.img`
  vertical-align: top;
  max-height: 100%;
  max-width: 100%;
`;

interface ImgProps extends React.ComponentProps<typeof ImgComponent> {}

const Img = React.forwardRef<HTMLImageElement, ImgProps>((props, ref) => {
  const { src, alt, width, height, ...rest } = props;

  return (
    <ImgComponent
      src={src}
      alt={alt}
      width={width}
      height={height}
      ref={ref}
      {...rest}
    />
  );
});

Img.displayName = "Img";

export default Img;
