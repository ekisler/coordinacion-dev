import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../utils/firebase';

export const AttendancesLogic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groupedEntries, setGroupedEntries] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const asistRef = ref(database, 'attendances');

    const unsubscribe = onValue(
      asistRef,
      snapshot => {
        const data = snapshot?.val();

        if (!data) {
          setGroupedEntries({});
          setIsLoading(false);
          return;
        }

        const asistenciasArray = Object.values(data);
        
        const filteredEntries = asistenciasArray.filter(
          asist => asist.isDisabled === false
        );

        const sortedEntries = filteredEntries.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const groupedEntries = {};
        sortedEntries.forEach(entri => {
          const date = new Date(entri.date).toLocaleDateString();
          if (!groupedEntries[date]) {
            groupedEntries[date] = [];
          }
          groupedEntries[date].push(entri);
        });

        setGroupedEntries(groupedEntries);
        setIsLoading(false);
      },
      error => {
        setIsLoading(false);
      }
    );

    return () => unsubscribe;
  }, []);

  return { isLoading, groupedEntries };
};
