import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/screens/Home";
import { ProductListScreen } from "./src/screens/ProductList";
import { ProductDetailScreen } from "./src/screens/ProductDetail";
import { Platform } from "react-native";

const IOSCihazmi = Platform.OS == "ios";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animation: IOSCihazmi ? "slide_from_bottom" : "default",
        }}
      >
        <Stack.Screen name="MF101 SHOP SILICONMADE" component={HomeScreen} />
        <Stack.Screen name="UrunDetay" component={ProductDetailScreen} />
        <Stack.Screen
          name="ProductList"
          options={{
            title: "Urun Listesi",
          }}
          component={ProductListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}