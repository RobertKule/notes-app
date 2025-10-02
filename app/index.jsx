import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostItImage from "../assets/images/post-it.png";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth");
  };

  return (
    <View style={styles.container}>
      <Image source={PostItImage} style={styles.image} />

      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subtitle}>Your personal note-taking companion</Text>

      {user ? (
        <>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/notes")}>
            <Text style={styles.buttonText}>Go to Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => router.push("/auth")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00008b",
  },
  subtitle: {
    fontSize: 16,
    color: "#696969",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff8c00",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
