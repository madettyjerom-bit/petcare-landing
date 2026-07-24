import { useEffect, useState } from 'react';
import Buscador from '../components/Buscador';
import ReservaCard from '../components/ReservaCard';
import { getReservas } from '../services/reservasApi';

// Página que muestra todas las reservas de PetCare
export default function VerReservas() {
  // Almacena todas las reservas obtenidas desde la API
  const [reservas, setReservas] = useState([]);

  // Almacena el texto ingresado en el buscador
  const [busqueda, setBusqueda] = useState('');

  // Controla los mensajes de carga y error
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Obtiene las reservas cuando se carga la página
  useEffect(() => {
    const cargarReservas = async () => {
      try {
        setCargando(true);
        setError('');

        const datos = await getReservas();
        setReservas(datos);
      } catch (errorPetCare) {
        setError(errorPetCare.message);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, []);

  // Agrupa la información de cada reserva en un texto
  // para permitir la búsqueda por ID u otros datos
  const reservasFiltradas = reservas.filter((reserva) => {
    const informacionCompleta = [
      reserva._id,
      reserva.dueño?.nombre,
      reserva.dueño?.telefono,
      reserva.mascota?.nombre,
      reserva.mascota?.tipo,
      reserva.mascota?.raza,
      reserva.servicioId,
      reserva.servicioNombre,
      reserva.fecha,
      reserva.hora,
      reserva.estado,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return informacionCompleta.includes(
      busqueda.trim().toLowerCase()
    );
  });

  return (
    <main className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-success">
          Reservas PetCare 🐾
        </h1>

        <p className="text-muted">
          Consulta las reservas por ID o información.
        </p>
      </div>

      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      {cargando && (
        <div className="alert alert-info">
          Cargando reservas...
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!cargando &&
        !error &&
        reservasFiltradas.length === 0 && (
          <div className="alert alert-warning">
            No se encontraron reservas.
          </div>
        )}

      <div className="row g-4">
        {reservasFiltradas.map((reserva) => (
          <div
            className="col-12 col-md-6 col-lg-4"
            key={reserva._id}
          >
            <ReservaCard reserva={reserva} />
          </div>
        ))}
      </div>
    </main>
  );
}