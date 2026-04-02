import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../utils/firebase';

export const ExitsLogic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groupedExits, setGroupedExits] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const exitRef = ref(database, 'exits');

    const unsubscribe = onValue(
      exitRef,
      snapshot => {
        const data = snapshot?.val();

        if (!data) {
          setGroupedExits({});
          setIsLoading(false);
          return;
        }

        const exitsArray = Object?.values(data);
        const filteredExits = exitsArray?.filter(
          exit => exit.isDisabled === false
        );

        const sortedExits = filteredExits?.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const groupedExits = {};
        sortedExits?.forEach(exit => {
          const date = new Date(exit.date).toLocaleDateString();
          if (!groupedExits[date]) {
            groupedExits[date] = [];
          }
          groupedExits[date].push(exit);
        });

        setGroupedExits(groupedExits);
        setIsLoading(false);
      },
      error => {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe;
  }, []);

  return { isLoading, groupedExits };
};
