import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import globalStyles from "@/src/theme/globalStyles";

interface Props {
  images: string[];
}

const styles = StyleSheet.create({
  image: globalStyles.image,
  imageContainer: {
    ...globalStyles.imageContainer,
    paddingHorizontal: 8,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "#C5C2C2",
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#3F475E",
  },
});

const ImageCarousel = ({ images }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(
        event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
      );

      setCurrentSlide(index);
    },
    [SCREEN_WIDTH],
  );

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    setCurrentSlide(index);
  };

  return (
    <View accessible accessibilityLabel="destination-image-carousel">
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        data={images}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.imageContainer}>
              <Image
                src={item}
                accessible
                accessibilityRole="image"
                accessibilityState={{ selected: currentSlide === index }}
                style={styles.image}
              />
            </View>
          );
        }}
      />
      {images.length > 1 && (
        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <Pressable key={index} onPress={() => handleDotPress(index)}>
              <View
                key={index}
                accessible
                accessibilityLabel="carousel-dot"
                style={[styles.dot, currentSlide === index && styles.activeDot]}
              />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default ImageCarousel;
