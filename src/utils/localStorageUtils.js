// localStorageUtils.js
export const clearEmailFromLocalStorage = () => {
  const persistedData = localStorage.getItem('persist:userData');
  if (persistedData) {
    const userData = JSON.parse(persistedData);
    
    // Verifica si existe el estado de passwordReset
    if (userData.passwordReset) {
      const passwordResetData = JSON.parse(userData.passwordReset);
      
      // Eliminar el correo electrónico
      passwordResetData.data.email = null; 
      
      // Actualizar el estado de passwordReset en userData
      userData.passwordReset = JSON.stringify(passwordResetData);
      
      // Guardar los cambios en localStorage
      localStorage.setItem('persist:userData', JSON.stringify(userData));
    }
  }
};