// /src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_ID,
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const bdRef = ref(database, 'asistenciasek');
export const firebaseRef = ref; // Exporta ref para usarlo en otros archivos
export { update };

export const subscribeToAttendances = callback => {
  onValue(
    ref(database, 'asistenciasek'),
    snapshot => {
      const data = snapshot.val();
      callback(data);
    },
    error => {
      console.error(
        'Error al suscribirse a los cambios en la base de datos:',
        error
      );
    }
  );
};
