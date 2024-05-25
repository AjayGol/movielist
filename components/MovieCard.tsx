import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

const MovieCard = ({movie}) => {
    return (
        <View style={styles.cardContainer}>
            <Image
                source={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                style={styles.poster}
                contentFit="contain"
                transition={500}
                cachePolicy={'memory'}
            />
            <Text style={styles.movieName} numberOfLines={1} ellipsizeMode={'tail'}>{movie?.title}</Text>
            <Text style={styles.movieName}>{`${Math.round(movie?.vote_average)} / 10`}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '50%',
        marginVertical: 15,
        paddingHorizontal: 6,
    },
    poster: {
        aspectRatio: '2 / 3'
    },
    movieName: {
        color:'#fff',
        fontSize: 15,
        marginTop: 8,
    }
})

export default MovieCard;
