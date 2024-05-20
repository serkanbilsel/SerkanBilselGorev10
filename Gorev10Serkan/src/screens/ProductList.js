import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, padding } from "../color";

const ProductListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [state, setState] = useState({
    products: [],
    pending: false,
    hataMsg: "",
  });

  useEffect(() => {
    urunleriListele();
  }, []);

  const urunleriListele = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        pending: true,
        hataMsg: "",
      }));
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      let filteredProducts = data;
      if (route.params && route.params.category) {
        filteredProducts = data.filter((product) => product.category === route.params.category);
      }
      setState({
        products: filteredProducts,
        pending: false,
      });
    } catch (error) {
      console.error(error);
      setState((prevState) => ({
        ...prevState,
        pending: false,
        hataMsg: "Ürünler getirilirken bir hata oluştu.",
      }));
    }
  };

  const detaySayfasinaYonlendir = (id) => {
    navigation.navigate("UrunDetay", { urunID: id });
  };

  return (
    <SafeAreaView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.content}>
        {state.pending && <ActivityIndicator color={colors.primary} size="large" />}
        {state.hataMsg ? (
          <Text>{state.hataMsg}</Text>
        ) : (
          <FlatList
            data={state.products}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable style={styles.urun} onPress={() => detaySayfasinaYonlendir(item.id)}>
                <View style={styles.inner}>
                  <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
                  <Text style={styles.text} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.fiyatText}>${item.price}</Text>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export { ProductListScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: padding.m, 
  },
  content: {
    flex: 1,
  },
  text: {
    color: "black",
    paddingVertical: 8,
  },
  fiyatText: {
    color: "blue",
    fontWeight: "bold",
    paddingVertical: 8,
  },
  image: {
    height: 150,
    width: 150,
    padding: 10,
    backgroundColor: 'white', 
  },
  urun: {
    flex: 1,
    margin: 10,
    borderRadius: 10, 
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10, 
    backgroundColor: "#f2f2f2",
    borderRadius: 10, 
  },
});
