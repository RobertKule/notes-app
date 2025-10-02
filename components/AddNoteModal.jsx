import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddNoteModal = (
    {
    modalVisible, 
    setModalVisible, 
    newnote, 
    setNewnote, 
    addNote,
}) => {
    
    return ( 
        <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Note</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your note here..."
                        value={newnote}
                        onChangeText={setNewnote}
                        multiline
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity 
                            style={styles.modalButton}
                            onPress={() => {
                                addNote();
                                setModalVisible(false);
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
     );
}
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
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
        color: '#00008b',
    },
    input: {
        height: 50,
        backgroundColor: '#f0f0f0',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        textAlignVertical: 'top'
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


export default AddNoteModal;