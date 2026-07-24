// 1. Importamos Bootstrap para tener los estilos en toda la app
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// 2. Importamos el componente principal donde está nuestra landing page
import App from './App.jsx'

// 3. Renderizamos la aplicación en el contenedor principal de la página
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)