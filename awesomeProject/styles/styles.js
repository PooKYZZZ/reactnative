import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // App shell
  appContainer: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  // Header
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  // Modal input area
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingHorizontal: 16,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    width: '80%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },

  // Buttons
  openButton: {
    backgroundColor: '#03DAC5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    width: '80%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#B00020',
    paddingVertical: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  closeWarningButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Goals list area
  goalsContainer: {
    flex: 1,
  },
  goalsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  goalsList: {
    flex: 1,
  },
  goalItem: {
    backgroundColor: '#3700B3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  goalItemText: {
    color: 'white',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 40,
  },

  // Footer
  footerContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Warning modal
  warningOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningBox: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  warningSubText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default styles;