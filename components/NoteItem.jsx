import { StyleSheet, Text, View } from "react-native";

const NoteItem = ({note}) => {
    return ( 
        <View style={styles.noteItem}>
            <Text style={styles.note}>{note.texte}</Text>
        </View>
     );
}
const styles = StyleSheet.create({
    noteItem: {
        backgroundColor: '#ffebcd', // BlanchedAlmond
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
})

export default NoteItem;