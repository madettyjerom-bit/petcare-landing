import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Buscador from '../components/Buscador';
import ReservaForm from '../components/ReservaForm';
import { getReservas } from '../services/reservasApi';

// Página que permite seleccionar y editar una reserva
export default function EditarReserva() {
  const [reservas, setReservas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [seleccionada, setSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Obtiene las reservas cuando se carga la página
  useEffect(() => {
    const cargarReservas = async () => {
      try {
        setCargando(true);
        setError('');

        const datos = await getReservas();
        setReservas(datos);

        // Permite recibir un ID desde la dirección de la página
        const idParametro = searchParams.get('id');

        if (idParametro) {
          const encontrada = datos.find(
            (reserva) =>
              String(reserva._id) === String(idParametro)
          );

          if (encontrada) {
            setSeleccionada(encontrada);
          }
        }
      } catch (errorPetCare) {
        setError(errorPetCare.message);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, [searchParams]);

  // Filtra por ID o por cualquier información
  const reservasFiltradas = reservas.filter((reserva) => {
    const informacionCompleta = [
      reserva._id,
      reserva.dueño?.nombre,
      reserva.dueño?.telefono,
      reserva.mascota?.nombre,
      reserva.mascota?.tipo,
      reserva.mascota?.raza,
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

  // Confirma que la reserva seleccionada pertenece a la estudiante
  const seleccionarReserva = (reserva) => {
    const confirmacion = window.confirm(
      `¿Confirma que esta reserva fue creada por usted?\n\n` +
        `Dueño: ${reserva.dueño?.nombre || 'No informado'}\n` +
        `Mascota: ${reserva.mascota?.nombre || 'No informada'}\n` +
        `ID: ${reserva._id}`
    );

    if (confirmacion) {
      setSeleccionada(reserva);
    }
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="fw-bold text-success mb-3">
        Editar reserva
      </h1>

      <div className="alert alert-warning">
        <strong>Importante:</strong> seleccione y modifique
        únicamente una reserva creada por usted. No edite los
        registros de otros estudiantes.
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!seleccionada ? (
        <>
          <Buscador
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />

          {busqueda &&
            reservasFiltradas.length === 0 && (
              <p className="text-muted">
                No se encontraron reservas.
              </p>
            )}

          <div className="list-group">
            {reservasFiltradas.map((reserva) => (
              <button
                type="button"
                className="list-group-item list-group-item-action"
                key={reserva._id}
                onClick={() => seleccionarReserva(reserva)}
              >
                <strong>
                  {reserva.mascota?.nombre || 'Sin nombre'}
                </strong>

                {' — '}

                {reserva.dueño?.nombre || 'Dueño no informado'}

                {' — '}

                <span className="text-muted">
                  ID: {reserva._id}
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <ReservaForm
          reservaEditando={seleccionada}
          onGuardado={() => {
            alert('Reserva actualizada correctamente');
            navigate('/ver');
          }}
          onCancelar={() => setSeleccionada(null)}
        />
      )}
    </main>
  );
}