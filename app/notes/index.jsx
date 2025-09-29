import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const NoteScreen = () => {
    // Sample notes data for demonstration and testing usestate
    const [notes, setNotes] = useState([
        { id: '1', text: 'Note one' },
        { id: '2', text: 'Note two' },
        { id: '3', text: 'Note three' },
        { id: '4', text: 'Note four' },
        { id: '5', text: 'Note five' },
        { id: '6', text: 'Note six' },
        { id: '7', text: 'Note seven' },
        { id: '8', text: 'Note eight' },
        { id: '9', text: 'Note nine' },
        { id: '10', text: 'Note ten' }, 
    ]);
    const [ModalVisible, setModalVisible] = useState(false);
    const [newnote, setNewnote] = useState('');

    return ( 
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.noteItem}>
                        <Text style={styles.note}>{item.text}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonAddtext}>+ Add Note</Text>
            </TouchableOpacity>
            <Modal 
            visible={ModalVisible} 
            animationType="slide" 
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <text style={styles.modalTitle}>Add New Note</text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your note here"
                            value={newnote}
                            onChangeText={setNewnote}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    if (newnote.trim()) {
                                        setNotes([...notes, { id: Date.now().toString(), text: newnote }]);
                                        setNewnote('');
                                        setModalVisible(false);
                                    }
                                }}
                            >
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalCancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View> 

                    </View>
                </View>
            </Modal>

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