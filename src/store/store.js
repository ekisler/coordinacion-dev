import { createStore, applyMiddleware, compose } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "./index.js";

const actualAutoMergeLevel2 = autoMergeLevel2.default ? autoMergeLevel2.default : autoMergeLevel2;
const actualStorage = storage.default ? storage.default : storage;

const persistConfig = {
  key: "userData",
  storage: actualStorage,
  whitelist: ["auth", "passwordReset"],
  stateReconciler: actualAutoMergeLevel2,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_ENCRYPTION_KEY,
      onError: (error) => {
        console.error('Error de cifrado:', error);
      },
    }),
  ],
};const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
let persistor = persistStore(store);
export { store, persistor };

