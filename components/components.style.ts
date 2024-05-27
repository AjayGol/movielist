import { StyleSheet } from "react-native";
import {screenWidth} from "@/constants";

const useStyles = () => {
  return StyleSheet.create({
    cardContainer: {
      width: (screenWidth - 44) / 2,
      height: ((screenWidth - 44) / 2) * 1.5,
      marginBottom: 10,
      overflow: "hidden",
    },
    poster: {
      aspectRatio: "2 / 3",
    },
    movieName: {
      color: "#fff",
      fontSize: 15,
      marginTop: 8,
    },
    bottomContainer: {
      position: "absolute",
      left: 0,
      bottom: 0,
      right: 0,
      paddingHorizontal: 8,
    },
    bottomContainerBG: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "#000000",
      opacity: 0.5,
    },
  });
};

export default useStyles;
