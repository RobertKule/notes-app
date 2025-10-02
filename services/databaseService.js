// databaseService.js

// 1. Import the instantiated 'database' object (not the Databases class)
import { database } from "./appwrite"; // Assuming the first file is named appwrite.config.js or similar

const databaseService = {
    /**
     * Fetches documents from a specified Appwrite collection.
     * @param {string} dbId - The ID of the database.
     * @param {string} colId - The ID of the collection.
     * @returns {Promise<Array<Object> | {error: string}>} - The list of documents or an error object.
     */
    async ListDocuments(dbId, colId) {
        try {
            // 2. Use the imported 'database' instance to call the method.
            const response = await database.listDocuments(dbId, colId); 
            return response.documents || [];
        } catch (error) {
            console.error("Error fetching documents:", error.message);
            return {error: error.message};
        }
    },

    async CreateDocument(dbId, colId,data, id=null) {
        try {
            const response = await database.createDocument(dbId, colId, id || undefined, data); 
            return response;
        } catch (error) {
            console.error("Error creating document:", error.message);
            return {error: error.message};
        }
    },
    // Update Notes
    async UpdateDocument(dbId, colId, docId, data) {
        try {
            const response = await database.updateDocument(dbId, colId, docId, data);
            return response;
        } catch (error) {
            console.error("Error updating document:", error.message);
            return {error: error.message};
        }
    },

    //Delete Notes
    async DeleteDocument(dbId, colId, docId) {
        try {
            const response = await database.deleteDocument(dbId, colId, docId); 
            return response;
        } catch (error) {
            console.error("Error deleting document:", error.message);
            return {error: error.message};
        }
    }
};
export default databaseService;