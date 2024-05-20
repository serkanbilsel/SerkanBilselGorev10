import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToProductList = (category) => {
    navigation.navigate("ProductList", { category });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.heading}>MF101 SHOP</Text>
    
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            style={styles.categoryButton}
            onPress={() => navigateToProductList(item)}
          >
            <Text style={styles.categoryText}>{item}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    backgroundColor: "blue",
    padding: 10,
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  categoryButton: {
    backgroundColor: "grey",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "45%",
    marginHorizontal: "2.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
