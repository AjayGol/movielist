import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  ActivityIndicator,
  SectionList,
} from "react-native";
import { homeHoldingApi } from "@api";
import Logo from "../../assets/images/logo.png";
import GenresSelection from "@/components/GenresSelection";
import MovieCard from "@/components/MovieCard";
import useStyles from "./../app.style";

const numColumns = 2;

export default function TabLayout() {
  const flatListRef = useRef<SectionList>();
  const {
    mainContainer,
    logoHeader,
    innerContainerHome,
    flexRow,
    sectionTitle,
  } = useStyles();

  const [genreData, setGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [moviesData, setMoviesData] = useState([]);
  const [moviesSectionData, setMoviesSectionData] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    homeHoldingApi.getSearchFnoInstruments().then((res) => {
      setGenreData(res?.data?.genres);
    });

    fetchMoviesData(currentYear);
  }, []);

  useEffect(() => {
    if (moviesSectionData.length > 0) {
      flatListRef.current?.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: true,
      });
    }
  }, [selectedGenre]);

  //Manage section list
  useEffect(() => {
    setMoviesSectionData(getDataSection());
  }, [moviesData, selectedGenre]);

  const fetchMoviesData = async (year) => {
    if (isLoading || year > new Date().getFullYear()) return;
    setIsLoading(true);
    try {
      const { data: moviesData } = await homeHoldingApi.getListMovie({
        primary_release_year: year,
      });
      if (moviesData) {
        setMoviesData((prevMovies) => [...prevMovies, ...moviesData?.results]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMovies = () => {
    const nextYear = currentYear + 1;
    setCurrentYear(nextYear);
    fetchMoviesData(nextYear);
  };

  const renderFooter = () => {
    return isLoading ? (
      <ActivityIndicator size="small" color="#fff" style={{ marginTop: 20 }} />
    ) : null;
  };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  const getDataSection = () => {
    const filteredMovies =
      selectedGenre === "all"
        ? [...moviesData]
        : moviesData.filter((movie) => movie.genre_ids.includes(selectedGenre));

    const finalArr = filteredMovies.reduce((acc, movie) => {
      const year = new Date(movie.release_date).getFullYear();
      const section = acc.find((section) => section.title === year);
      if (section) {
        section.data.push(movie);
      } else {
        acc.push({ title: year, data: [movie] });
      }
      return acc;
    }, []);

    finalArr.forEach((section) => {
      section.data = formatData(section.data, numColumns);
    });

    return finalArr;
  };

  const renderItemSection = useCallback(({ section }: { section: any }) => {
    const { title } = section;
    return <Text style={sectionTitle}>{title}</Text>;
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { section: any }) => {
      if (index % numColumns === 0) {
        const items = moviesSectionData[0].data.slice(
          index,
          index + numColumns,
        );
        return (
          <View style={flexRow}>
            {items.map((item, subIndex) => (
              <View key={subIndex}>
                {!item.empty && <MovieCard movie={item} subIndex={subIndex} />}
              </View>
            ))}
          </View>
        );
      }
      return null;
    },
    [moviesSectionData],
  );

  return (
    <>
      <SafeAreaView style={mainContainer}>
        <View style={innerContainerHome}>
          <Image source={Logo} style={logoHeader} />
          <GenresSelection
            genres={genreData}
            setSelectedGenre={setSelectedGenre}
            selectedGenre={selectedGenre}
          />
        </View>

        <SectionList
          ref={flatListRef}
          sections={moviesSectionData}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          numColumns={2}
          renderSectionHeader={renderItemSection}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          style={{ marginTop: 20 }}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}
