import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const NoteItem = ({note, onDelete,onEdit}) => {
    // Vérification de la propriété de la note : assurez-vous que 'note.text' est la bonne clé pour le contenu.
    // Si vous utilisez Appwrite, cela pourrait être 'note.content' si c'est ainsi que vous l'avez nommé.
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(note.text);
    const inputRef=useRef(null);
    const handlesaveEdit= (newText) => {
        if(newText.trim()===note.text.trim()){
            return; // Pas de changement, ne rien faire
        }
        onEdit(note.$id, newText.trim());
        setIsEditing(false);
    };

    return ( 
        <View style={styles.noteItem}>
            {isEditing ? (
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={editedText}
                    onChangeText={setEditedText}
                    onBlur={() => {
                        setIsEditing(false);  
                        handlesaveEdit(editedText); // Fonction à définir pour sauvegarder les modifications
                    }}
                onSubmitEditing={() => {
                    setIsEditing(false);
                    handlesaveEdit(editedText); // Fonction à définir pour sauvegarder les modifications
                }}
                returnKeyType="done"
                    autoFocus
                />
            ) : (
                // Le texte de la note est affiché ici  
                <Text style={styles.note}>{note.text}</Text>
            )}
            <View style={styles.actions}>   
                {!isEditing ? (
                    <TouchableOpacity onPress={() => {
                        handlesaveEdit(editedText);
                        inputRef.current?.focus();
                        setIsEditing(true);
                    }
                    }>
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>

                ) : (
                    <TouchableOpacity onPress={() => {setIsEditing(false); handlesaveEdit(editedText);
                    }}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>

                )}
                <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(note.$id)}>
                <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
            
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    noteItem : {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,    
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    note: {
        fontSize: 16,
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    input: {
        fontSize: 16,
        color: '#333',
        flex: 1,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 2,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    editButtonText: {
        color: '#1e90ff',
        fontWeight: 'bold',
        marginRight: 10,
    },
    saveButtonText: {
        color: '#32cd32',
        fontWeight: 'bold',
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d', 
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold', 
        fontSize: 12,
        textAlign: 'center',

    }

    
});

export default NoteItem;