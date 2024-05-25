import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const GenresSelection = ({genres, selectedGenre, setSelectedGenre}) => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false} >

            <TouchableOpacity onPress={()=>{setSelectedGenre('all')}} style={[styles.genreChip, selectedGenre === 'all' ? styles.activeGenre : null]} activeOpacity={0.5}>
                <Text style={styles.genreText}>{'All'}</Text>
            </TouchableOpacity>

            {
                genres?.map((genre) => {
                    return (
                        <TouchableOpacity onPress={()=>{setSelectedGenre(genre.id)}} key={genre.id} style={[styles.genreChip, genre.id === selectedGenre ? styles.activeGenre : null]} activeOpacity={0.5}>
                            <Text style={styles.genreText}>{genre.name}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginVertical:20
    },
    scrollContainer: {
        paddingHorizontal: 20
    },
    genreChip: {
        backgroundColor: '#484848',
        marginHorizontal: 4,
        borderRadius: 4
    },
    activeGenre: {
        backgroundColor:'#F0283C',
    },
    genreText: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        color:'#F5F5F5'
    }
})

export default GenresSelection;
