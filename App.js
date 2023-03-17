import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TeacherProvider } from "./src/contexts/teachers.context";

import Register from "./src/routes/register/register.component";
import Home from "./src/routes/home/home.component";
import LogIn from "./src/routes/log-in/log-in.component"

export default function App() {
  const Stack = createStackNavigator();

  return (
    <TeacherProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="LogIn" component={LogIn} />
          {/* other screens */}
        </Stack.Navigator>
      </NavigationContainer>
    </TeacherProvider>
  );
}
