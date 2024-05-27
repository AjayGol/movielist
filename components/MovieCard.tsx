import React from "react";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { urlPath } from "@utils";
import useStyles from "@/components/components.style";

const MovieCard = ({ movie, subIndex }) => {
  const {
    cardContainer,
    poster,
    movieName,
    bottomContainer,
    bottomContainerBG,
  } = useStyles();

  return (
    <View style={[cardContainer, subIndex === 1 ? { marginLeft: 12 } : {}]}>
      <Image
        source={urlPath(movie.poster_path)}
        style={poster}
        contentFit="contain"
        transition={500}
        cachePolicy={"memory"}
      />
      <View style={bottomContainer}>
        <View style={bottomContainerBG} />
        <Text style={movieName} numberOfLines={1} ellipsizeMode={"tail"}>
          {movie?.title}
        </Text>
        <Text
          style={movieName}
        >{`${Math.round(movie?.vote_average)} / 10`}</Text>
      </View>
    </View>
  );
};

export default MovieCard;
