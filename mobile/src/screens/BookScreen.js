import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import axios from 'axios';

const BookScreen = ({route}) => {
  const {bookId} = route.params;
  const [book, setBook] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(
        `http://your-backend-api-url/books/${bookId}`,
      );
      setBook(response.data);
    };

    fetchBook();
  }, [bookId]);

  const handleAddAnnotation = (page, text) => {
    const newAnnotation = {page, text};
    setAnnotations([...annotations, newAnnotation]);
  };

  return (
    <ScrollView style={styles.container}>
      {book ? (
        <View>
          <Text style={styles.title}>{book.title}</Text>
          {book.pages.map((page, index) => (
            <View key={index} style={styles.page}>
              <Text style={styles.pageText}>{page.content}</Text>
              <Button
                title="Annotate"
                onPress={() =>
                  handleAddAnnotation(page.pageNumber, 'Sample annotation')
                }
              />
            </View>
          ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <View>
        <Text style={styles.annotationTitle}>Annotations:</Text>
        {annotations.map((annotation, index) => (
          <Text key={index} style={styles.annotation}>
            Page {annotation.page}: {annotation.text}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  page: {
    marginVertical: 10,
  },
  pageText: {
    fontSize: 18,
  },
  annotationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  annotation: {
    fontSize: 16,
  },
});

export default BookScreen;
