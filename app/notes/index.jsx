import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import AddNoteModal from "../../components/AddNoteModal";
import NoteList from "../../components/NoteList";
import { useAuth } from "../../hooks/useAuth";
import noteService from "../../services/noteServices";

export default function NoteScreen() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/auth");
  }, [authLoading, user]);

  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  const handleError = (message) => {
    setError(message);
    Alert.alert("Error", message);
  };

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    const response = await noteService.getNotes();
    if (response.error) return handleError(response.error);
    setNotes(response.data || []);
    setLoading(false);
  }, []);

  const addNote = async () => {
    if (!newNote.trim()) return Alert.alert("Validation Error", "Note cannot be empty");
    const response = await noteService.addNote(newNote.trim());
    if (response.error) return handleError(response.error);
    setNotes((prev) => [...prev, response.data]);
    setNewNote("");
    setModalVisible(false);
  };

  const updateNote = async (noteId, updatedContent) => {
    if (!updatedContent.trim()) return Alert.alert("Validation Error", "Note cannot be empty");
    const response = await noteService.updateNote(noteId, updatedContent.trim());
    if (response.error) return handleError(response.error);
    setNotes((prev) => prev.map((note) => (note.$id === noteId ? response.data : note)));
  };

  const deleteNote = (noteId) => {
    Alert.alert("Confirm Deletion", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await noteService.deleteNote(noteId);
          if (response.error) return handleError(response.error);
          setNotes((prev) => prev.filter((note) => note.$id !== noteId));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff8c00" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList notes={notes} onDelete={deleteNote} onEdit={updateNote} />
        </>
      )}

      <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonAddText}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newnote={newNote}
        setNewnote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f8ff", padding: 16, paddingTop: 40 },
  buttonAdd: {
    backgroundColor: "#ff8c00",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  buttonAddText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
  errorText: { color: "red", textAlign: "center", marginBottom: 10, fontWeight: "bold" },
});
