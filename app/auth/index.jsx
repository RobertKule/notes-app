import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useAuth } from "../../hooks/useAuth";

const AuthScreen = () => {
  const { login, register, loading: authLoading, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (user && !authLoading) {
      router.replace("/notes");
    }
  }, [user, authLoading]);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    setError("");

    const response = await login(email, password);

    setLoading(false);

    if (response?.error) {
      setError(response.error);
    }
  }, [email, password]);

  const handleRegister = useCallback(async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");

    const response = await register(email, password);

    setLoading(false);

    if (response?.error) {
      setError(response.error);
    }
  }, [email, password, confirmPassword]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}

      {loading || authLoading ? (
        <ActivityIndicator size="large" color="#ff8c00" style={{ marginTop: 20 }} />
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={isRegistering ? handleRegister : handleLogin}
          >
            <Text style={styles.buttonText}>
              {isRegistering ? "Register" : "Login"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toggle}
            onPress={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
          >
            <Text style={styles.toggleText}>
              {isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ff8c00",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff8c00",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggle: {
    marginTop: 15,
    alignItems: "center",
  },
  toggleText: {
    color: "#333",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
