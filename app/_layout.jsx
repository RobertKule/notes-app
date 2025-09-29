import { Stack } from "expo-router";

const RootLayout=() => {
  return (<Stack 
    screenOptions={{
      headerStyle: { backgroundColor: '#ff8c00', },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        fontWeight: 'bold',
        fontSize: 20,
       },
       contentStyle: { 
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 10,
        paddingTop: 10,
         
      },

    }}>
    <Stack.Screen name="index" options={{ title: 'Home' }}/>
    <Stack.Screen name="notes" options={{ headerTitle: 'Notes' }}/>
    
    
    </Stack>
  );
}
export default RootLayout;