import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import SearchBar from '../components/SearchBar';

const HomeScreen = ({navigation}) => {
  const books = useSelector(state => state.books.books);
  const status = useSelector(state => state.books.status);

  return (
    <View style={styles.container}>
      <SearchBar />
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'succeeded' && (
        <FlatList
          data={books}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Text
              style={styles.item}
              onPress={() => navigation.navigate('Book', {bookId: item.id})}>
              {item.title}
            </Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HomeScreen;
