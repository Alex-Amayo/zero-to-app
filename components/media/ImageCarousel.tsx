import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { Carousel } from './Carousel';

const { width: screenWidth } = Dimensions.get('window');

type ImageCarouselProps = {
  images: string[];
  loop?: boolean;
  autoPlay?: boolean;
  width?: number;
  height?: number;
};

/**
 * ImageCarousel component - uses generic Carousel for displaying images.
 * Provides a convenient wrapper for image-specific carousel usage.
 */
export const ImageCarousel = ({
  images,
  autoPlay = false,
  loop = true,
  width = screenWidth,
  height = 250,
}: ImageCarouselProps) => {
  const imageStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  );

  const renderImage = (imageUri: string) => {
    return <Image source={{ uri: imageUri }} style={imageStyle} />;
  };

  return (
    <Carousel
      data={images}
      renderItem={renderImage}
      pagination="dots"
      autoPlay={autoPlay}
      loop={loop}
      width={width}
      height={height}
    />
  );
};
