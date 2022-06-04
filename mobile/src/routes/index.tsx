import { useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { AuthContext } from "../contexts/AuthContext";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={60} color="#f5f7fb" />
      </View>
    )
  }

  return (
    isAuthenticated ? <AppRoutes /> : <AuthRoutes />
  )
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1d1d2e'
  },
})

export default Routes