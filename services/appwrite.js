import { Platform } from 'react-native';
import { Account, Client, Databases } from 'react-native-appwrite';


const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWITE_PROJECT_ID,
    db: process.env.EXPO_PUBLIC_APPWITE_DB_ID,
    col:{
        notes: process.env.EXPO_PUBLIC_APPWITE_COL_NOTES_ID,
    }
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

if (Platform.OS === "android") {
  client.setPlatform(process.env.EXPO_PUBLIC_APPWITE_PACKAGE_NAME);
} else if (Platform.OS === "ios") {
  client.setPlatform(process.env.EXPO_PUBLIC_APPWITE_BUNDLE_ID);
};


const database = new Databases(client);

const account= new Account(client);

export { account, client, config, database };
    
    

