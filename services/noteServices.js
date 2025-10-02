// noteService.js (No change needed after fixing databaseService.js)
import { ID } from "react-native-appwrite";
import databaseService from "./databaseService";

const dbId=process.env.EXPO_PUBLIC_APPWITE_DB_ID;
const colId=process.env.EXPO_PUBLIC_APPWITE_COL_NOTES_ID;
const noteService = {
    async getNotes() {
        // Calls the now-correctly-implemented ListDocuments
        const response = await databaseService.ListDocuments(dbId, colId); 
        if(response.error){
            return {error: response.error};
        }
        return {data: response};
    }
    ,
    // noteService.js

    async addNote(text) {
        // 1. Vérification de la présence et du type (doit être une chaîne de caractères)
        if (!text || typeof text !== 'string' || text.trim() === '') {
            // Retourne une erreur si le texte est absent ou invalide
            return { error: "Note text is required and must be a non-empty string." };
        }
        
        // 2. Gestion de la limite de 255 caractères (problème initial d'Appwrite)
        // Ceci garantit que la requête ne renverra pas 400 Bad Request pour cause de longueur.
        const MAX_LENGTH = 255; 
        const validatedText = text.length > MAX_LENGTH 
            ? text.substring(0, MAX_LENGTH) // Tronque si la note est trop longue
            : text; // Utilise le texte tel quel s'il est court
        
        // 3. Préparation des données pour Appwrite
        const data = { 
            text: validatedText, // Utilise la chaîne de caractères validée/tronquée
            createdAt: new Date().toISOString()
        };
        
        // 4. Appel à Appwrite
        const response = await databaseService.CreateDocument(dbId, colId, data, ID.unique());
        
        if (response.error) {
            // Gérer les erreurs potentielles restantes (permissions, ID de collection/db, etc.)
            console.error("Error creating document via Appwrite:", response.error);
            return { error: "Failed to save note: " + response.error };
        }
        
        return { data: response };
    },
    //Update Notes
    async updateNote(noteId, newText) {
        if (!noteId) {
            return { error: "Note ID is required for update." };
        }
        if (!newText || typeof newText !== 'string' || newText.trim() === '') {
            return { error: "New text is required and must be a non-empty string." };
        }
        const MAX_LENGTH = 255;
        const validatedText = newText.length > MAX_LENGTH 
            ? newText.substring(0, MAX_LENGTH) 
            : newText;
        const data = { text: validatedText };
        const response = await databaseService.UpdateDocument(dbId, colId, noteId, data);
        if (response.error) {
            return { error: response.error };
        }
        return { data: response };
    },
    
    //Delete Notes
    async deleteNote(noteId) {
        if (!noteId) {
            return { error: "Note ID is required for deletion." };
        }
        const response = await databaseService.DeleteDocument(dbId, colId, noteId);
        if (response.error) {
            return { error: response.error };
        }
        return { success: true};
    }
};
export default noteService;