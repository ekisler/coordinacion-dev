// alertCustom.js

const showAlert = (message, title = "¡Gracias!") => {
    window.alert(`${title}\n${message}`);
    // Para Android e iOS, usa la API de React Native
 }

export default showAlert;