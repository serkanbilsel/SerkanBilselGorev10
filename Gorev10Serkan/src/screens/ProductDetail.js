import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../color";

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [state, setState] = useState({
    urunDetayi: null,
    pending: false,
    hataMsg: "",
  });

  useEffect(() => {
    urunDetayiniGetir();
  }, []);

  const urunDetayiniGetir = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        pending: true,
        hataMsg: "",
      }));
      const response = await fetch(`https://fakestoreapi.com/products/${route.params.urunID}`);
      const data = await response.json();
      setState({
        urunDetayi: data,
        pending: false,
      });
    } catch (error) {
      console.error(error);
      setState((prevState) => ({
        ...prevState,
        pending: false,
        hataMsg: "Ürün detayları getirilirken bir hata oluştu.",
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {state.pending && <ActivityIndicator color={colors.primary} size="large" />}
        {state.urunDetayi && (
          <>
            <Image source={{ uri: state.urunDetayi.image }} style={styles.image} />
            <Text style={styles.baslik}>{state.urunDetayi.title}</Text>
            <Text style={[styles.text, styles.fiyatText]}>${state.urunDetayi.price}</Text>
            <Text style={styles.text}>{state.urunDetayi.description}</Text>
          </>
        )}
        {state.hataMsg && <Text style={styles.text}>{state.hataMsg}</Text>}
      </View>
    </SafeAreaView>
  );
};

export { ProductDetailScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1, // Resmin oranını korumak için aspectRatio kullanın
    marginBottom: 10,
  },
  baslik: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 24,
  },
  text: {
    marginBottom: 5,
  },
  fiyatText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
  },
});
