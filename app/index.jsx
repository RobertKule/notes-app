import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostItImage from "../assets/images/post-it.png";

export default function HomeScreen() {
  return (
    <View
      style={styles.container}
    >
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome to notes App</Text>
      <Text style={styles.subtitle}>Your personal note-taking companion</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => 
          // Handle button press, e.g., navigate to notes list
          router.push('/notes')
        }
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: '#f0f8ff',
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 20,
      borderRadius: 10,
    },  
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: '#00008b',
    },
    subtitle: {
      fontSize: 16,
      color: '#696969',
      textAlign: 'center',
    },
    button: {
      marginTop: 30,
      backgroundColor: '#ff8c00',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },    
  }
)
