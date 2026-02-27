import { StyleSheet } from 'react-native';

export const colors = {
  background: '#121212',
  card: '#1E1E1E',
  textMain: '#FFFFFF',
  textMuted: '#A0A0A0',
  accent: '#FF4757', // A harsh, alert-style red for the anti-subscription vibe
  success: '#2ED573'
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.textMain,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 30,
  }
});
