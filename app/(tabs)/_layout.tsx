import React, {useEffect, useRef, useState} from "react";
import {View, StyleSheet, Image, SafeAreaView, StatusBar, FlatList, Text, ActivityIndicator} from "react-native";
import { homeHoldingApi } from "@api";
import Logo from '../../assets/images/logo.png';
import GenresSelection from "@/components/GenresSelection";
import MovieCard from "@/components/MovieCard";

export default function TabLayout() {

  const flatListRef = useRef();

  const [genreData, setGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [moviesData, setMoviesData] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    homeHoldingApi.getSearchFnoInstruments().then((res) => {
      setGenreData(res?.data?.genres);
    });

    fetchMoviesData(currentYear);
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, [selectedGenre])

  const fetchMoviesData = async (year) => {
    if (isLoading || year > new Date().getFullYear()) return;
    setIsLoading(true);
    try {
      const { data: moviesData } = await homeHoldingApi.getListMovie({ primary_release_year: year });
      if (moviesData) {
        setMoviesData(prevMovies => [...prevMovies, ...moviesData?.results]);
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
        <ActivityIndicator size="small" color="#fff" style={{marginTop: 20}} />
    ) : null;
  };

  const getData = () => {
    if (selectedGenre === 'all') { return moviesData };
    return moviesData?.filter((movie) => movie.genre_ids?.includes(selectedGenre))
  }

  return (
      <>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.innerContainer}>
            <Image source={Logo} style={styles.logo} />
            <GenresSelection genres={genreData} setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre} />
          </View>

          <FlatList
              ref={flatListRef}
              data={getData()}
              renderItem={({ item }) => <MovieCard movie={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              style={{ marginTop: 20 }}
              onEndReached={loadMoreMovies}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
          />
        </SafeAreaView>
      </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#121212',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  logo: {
    marginHorizontal: 20
  },
  innerContainer: {
    backgroundColor: '#242424',
    paddingTop: 10
  }
});
