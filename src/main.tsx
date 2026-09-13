import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ActionProvider } from './context/ActionContext';
import { CivicSceneProvider } from './three/hooks/useCivicScene';
import { CustomCursor } from './three/components/CustomCursor';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ActionProvider>
          <CivicSceneProvider>
            <CustomCursor />
            <App />
          </CivicSceneProvider>
        </ActionProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
