import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddNoteModal from "../../components/AddNoteModal";
import NoteList from "../../components/NoteList";

const NoteScreen = () => {
    // Sample notes data for demonstration and testing usestate
    const [notes, setNotes] = useState([
        { id: '1', texte: 'Note one' },
        { id: '2', texte: 'Note two' },
        { id: '3', texte: 'Note three' },
        // { id: '4', texte: 'Note four' },
        // { id: '5', texte: 'Note five' },
        // { id: '6', texte: 'Note six' },
        // { id: '7', texte: 'Note seven' },
        // { id: '8', texte: 'Note eight' },
        // { id: '9', texte: 'Note nine' },
        // { id: '10', texte: 'Note ten' }, 
    ]);
    const [ModalVisible, setModalVisible] = useState(false);
    const [newnote, setNewnote] = useState('');

    return ( 
        <View style={styles.container}>
            <NoteList notes={notes} />

            <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonAddtext}>+ Add Note</Text>
            </TouchableOpacity>

            <AddNoteModal
                modalVisible={ModalVisible}
                setModalVisible={setModalVisible}
                newnote={newnote}
                setNewnote={setNewnote}
                addNote={() => {
                    if (newnote.trim()) {
                        setNotes([...notes, { id: (notes.length + 1).toString(), texte: newnote }]);
                        setNewnote('');
                    }
                }}
            />

        </View>
     );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        padding: 10,
    },
    noteItem: {
        backgroundColor: '#ffebcd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    note: {
        fontSize: 16,
        color: '#333',
    },
    buttonAdd: {
        backgroundColor: '#ff8c00',
        padding: 15,
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonAddtext: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#ff8c00',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },  
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#ff8c00',
        padding: 10,
        borderRadius: 5,
        flex: 1,    
        alignItems: 'center',
        marginHorizontal: 5,
    },
    modalCancelButton: {
        backgroundColor: '#ccc',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },


});
 
export default NoteScreen;