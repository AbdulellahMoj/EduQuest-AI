import React from "react";

interface Props {
  src: string;
  alt: string;
  width?: number; // Optional prop for width
  height?: number; // Optional prop for height
}

const AnimatedGif = ({ src, alt, width, height }: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: width || "auto", height: height || "auto" }}
    />
  );
};

export default AnimatedGif;
