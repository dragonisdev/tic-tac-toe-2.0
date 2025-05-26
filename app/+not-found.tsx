import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <Link href="/(tabs)/game" style={styles.link}>
        <Text style={styles.linkText}>Go to game screen!</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1E293B',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#7B68EE',
  },
});
