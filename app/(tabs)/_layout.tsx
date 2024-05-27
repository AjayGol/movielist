import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  ActivityIndicator,
  SectionList,
  ListRenderItem,
} from "react-native";
import { homeHoldingApi } from "@api";
import Logo from "../../assets/images/logo.png";
import GenresSelection from "@/components/GenresSelection";
import MovieCard from "@/components/MovieCard";
import useStyles from "./../app.style";
import { IAllMovie } from "@/app/app.types";

const numColumns = 2;

export default function TabLayout() {
  const flatListRef = useRef<SectionList>();
  const {
    mainContainer,
    logoHeader,
    innerContainerHome,
    flexRow,
    sectionTitle,
    paddingSectionList,
    sectionListContainer,
    initLoaderContainer,
  } = useStyles();

  const [genreData, setGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [moviesData, setMoviesData] = useState([]);
  const [moviesSectionData, setMoviesSectionData] = useState([]);
  const [currentYear, setCurrentYear] = useState<number>(2011);
  const [currentYearPast, setCurrentYearPast] = useState<number>(2011);
  const [isLoadingAPI, setIsLoadingAPI] = useState<boolean>(true);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [isLoadingAPIOldYear, setIsLoadingAPIOldYear] =
    useState<boolean>(false);

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    homeHoldingApi.getSearchFnoInstruments().then((res) => {
      setGenreData(res?.data?.genres);
    });

    fetchMoviesData(currentYear, true);
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

  const fetchMoviesData = async (year, init = false, isPast = false) => {
    if ((isLoadingAPI && !init) || year > new Date().getFullYear()) return;
    setIsLoadingAPI(true);
    if (isPast) {
      setIsLoadingAPIOldYear(true);
    }
    try {
      const { data: moviesData } = await homeHoldingApi.getListMovie({
        primary_release_year: year,
      });
      if (init) {
        var { data: moviesData2 } = await homeHoldingApi.getListMovie({
          primary_release_year: year + 1,
        });
        setCurrentYear(year);
        if (moviesData) {
          setMoviesData((prevMovies) => [
            ...prevMovies,
            ...moviesData?.results,
            ...moviesData2?.results,
          ]);

          setTimeout(() => {
            setInitLoading(false);
            flatListRef.current?.scrollToLocation({
              sectionIndex: 1,
              itemIndex: 1,
              animated: false,
            });
          }, 1000);
        }
      } else {
        if (moviesData) {
          if (isPast) {
            setMoviesData((prevMovies) => [
              ...moviesData?.results,
              ...prevMovies,
            ]);
            setIsLoadingAPIOldYear(false);
            flatListRef.current?.scrollToLocation({
              sectionIndex: 1,
              itemIndex: 1,
              animated: false,
            });
          } else {
            setMoviesData((prevMovies) => [
              ...prevMovies,
              ...moviesData?.results,
            ]);
          }
        }
      }
    } finally {
      setIsLoadingAPI(false);
      setIsLoadingAPIOldYear(false);
    }
  };

  const loadMoreMovies = () => {
    if (!isLoadingAPI) {
      const nextYear = currentYear + 1;
      fetchMoviesData(nextYear);
      setCurrentYear(nextYear);
    }
  };

  const loadMoreMoviesTop = () => {
    if (!isLoadingAPI && !initLoading) {
      const pastYear = currentYearPast - 1;
      fetchMoviesData(pastYear, false, true);
      setCurrentYearPast(pastYear);
    }
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const scrollAtTop = offsetY === 0;
    if (scrollAtTop && selectedGenre === "all") {
      loadMoreMoviesTop();
    }
  };

  const renderHeader = () => {
    return isLoadingAPIOldYear ? (
      <ActivityIndicator size="small" color="#fff" style={{ marginTop: 20 }} />
    ) : null;
  };

  const renderFooter = () => {
    return isLoadingAPI ? (
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

  const renderItem: ListRenderItem<IAllMovie> = useCallback(
    ({ item, index, section }) => {
      const sectionIndex = moviesSectionData.findIndex(
        (sec) => sec.title === section.title,
      );

      if (index % numColumns === 0) {
        const items = moviesSectionData[sectionIndex].data.slice(
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

        <View style={sectionListContainer}>
          <SectionList
            ref={flatListRef}
            sections={moviesSectionData}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            numColumns={2}
            renderSectionHeader={renderItemSection}
            contentContainerStyle={paddingSectionList}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
          {initLoading && (
            <View style={initLoaderContainer}>
              <ActivityIndicator size={"small"} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
