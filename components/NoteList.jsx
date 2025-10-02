import { StyleSheet, View } from "react-native";
import NoteItem from "./NoteItem";
const NoteList = ({notes,onDelete, onEdit}) => {
    return (
        <View style={StyleSheet.noteslistes}>
            {notes.map((note) => (
                <NoteItem key={note.$id} note={note} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </View>
     );
}
const styles = StyleSheet.create({
    noteslistes: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f5f5f5',
        flex: 1,
        borderRadius: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: 20,
        overflowY: 'auto',
        maxHeight: '70%',
        minHeight: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'solid',
        backgroundClip: 'padding-box',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        userSelect: 'none',
        zIndex: 1,
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    }
});
export default NoteList;