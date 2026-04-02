// errorAlert.js
const showErrorAlert = (message, title = "¡Error!") => {
  window.alert(`${title}\n${message}`);
};

export default showErrorAlert;
