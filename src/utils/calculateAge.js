export const calculateAge = birthDate => {
  if (!birthDate) return 0;
  const birthYear = parseInt(birthDate.split('-')[0]);
  return new Date().getFullYear() - birthYear;
};
