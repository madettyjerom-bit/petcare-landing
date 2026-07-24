import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';

import Inicio from './pages/Inicio';
import VerReservas from './pages/VerReservas';
import AgregarReserva from './pages/AgregarReserva';
import EditarReserva from './pages/EditarReserva';
import EliminarReserva from './pages/EliminarReserva';

// Componente principal de la aplicación
export default function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/ver"
          element={<VerReservas />}
        />

        <Route
          path="/agregar"
          element={<AgregarReserva />}
        />

        <Route
          path="/editar"
          element={<EditarReserva />}
        />

        <Route
          path="/eliminar"
          element={<EliminarReserva />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}