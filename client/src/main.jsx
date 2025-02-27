import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {Toaster} from 'react-hot-toast'

persistor.purge();

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position='top-center' toastOptions={{duration:2000}}/>
          <App />
      </PersistGate>
    </Provider>
)
