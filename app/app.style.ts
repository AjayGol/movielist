import { StyleSheet } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: "#121212",
    },
    logoHeader: {
      marginHorizontal: 20,
    },
    innerContainerHome: {
      backgroundColor: "#242424",
      paddingTop: 10,
    },
    flexRow: { flexDirection: "row" },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      paddingVertical: 12,
      color: "#FFFFFF",
      backgroundColor: "#121212",
    },
    paddingSectionList: { paddingHorizontal: 16 },
    sectionListContainer: { flex: 1, backgroundColor: "#121212" },
    initLoaderContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#121212",
    },
  });
};

export default useStyles;
