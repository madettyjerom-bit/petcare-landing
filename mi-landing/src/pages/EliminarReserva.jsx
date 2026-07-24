import { useEffect, useState } from 'react';
import Buscador from '../components/Buscador';
import { eliminarReserva, getReservas } from '../services/reservasApi';

// Página que permite eliminar una reserva con protección
export default function EliminarReserva() {
  const [reservas, setReservas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [seleccionada, setSeleccionada] = useState(null);
  const [idConfirmacion, setIdConfirmacion] = useState('');
  const [confirmacionPropiedad, setConfirmacionPropiedad] =
    useState(false);
  const [cargando, setCargando] = useState(true);
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState('');

  // Obtiene todas las reservas al cargar la página
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

  // Filtra las reservas por ID o información
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

  // Selecciona una reserva sin eliminarla todavía
  const seleccionarReserva = (reserva) => {
    setSeleccionada(reserva);
    setIdConfirmacion('');
    setConfirmacionPropiedad(false);
    setError('');
  };

  // Cancela la selección y regresa a la lista
  const cancelarEliminacion = () => {
    setSeleccionada(null);
    setIdConfirmacion('');
    setConfirmacionPropiedad(false);
  };

  // Ejecuta DELETE únicamente después de validar todo
  const confirmarEliminacion = async () => {
    if (!confirmacionPropiedad) {
      setError(
        'Debe confirmar que la reserva fue creada por usted.'
      );
      return;
    }

    if (
      idConfirmacion.trim() !== String(seleccionada._id)
    ) {
      setError('El ID ingresado no coincide con la reserva.');
      return;
    }

    const confirmacionFinal = window.confirm(
      'Esta acción no se puede deshacer.\n\n' +
        '¿Confirma que desea eliminar únicamente su reserva?'
    );

    if (!confirmacionFinal) {
      return;
    }

    try {
      setEliminando(true);
      setError('');

      await eliminarReserva(seleccionada._id);

      setReservas((reservasActuales) =>
        reservasActuales.filter(
          (reserva) => reserva._id !== seleccionada._id
        )
      );

      alert('Reserva eliminada correctamente');
      cancelarEliminacion();
    } catch (errorPetCare) {
      setError(errorPetCare.message);
    } finally {
      setEliminando(false);
    }
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-danger"></div>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="fw-bold text-danger mb-3">
        Eliminar reserva
      </h1>

      <div className="alert alert-danger">
        <strong>Advertencia:</strong> la API es compartida.
        Elimine únicamente una reserva creada por usted.
        No elimine los registros de otros estudiantes.
      </div>

      {error && (
        <div className="alert alert-warning">
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
        <section className="card border-danger shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-danger">
              Confirme la reserva seleccionada
            </h5>

            <p>
              <strong>Dueño:</strong>{' '}
              {seleccionada.dueño?.nombre || 'No informado'}
            </p>

            <p>
              <strong>Mascota:</strong>{' '}
              {seleccionada.mascota?.nombre || 'No informada'}
            </p>

            <p>
              <strong>Servicio:</strong>{' '}
              {seleccionada.servicioNombre || 'No informado'}
            </p>

            <p>
              <strong>ID:</strong> {seleccionada._id}
            </p>

            <div className="form-check mb-3">
              <input
                id="confirmarPropiedad"
                type="checkbox"
                className="form-check-input"
                checked={confirmacionPropiedad}
                onChange={(e) =>
                  setConfirmacionPropiedad(e.target.checked)
                }
              />

              <label
                className="form-check-label"
                htmlFor="confirmarPropiedad"
              >
                Confirmo que esta reserva fue creada por mí.
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Escriba el ID exacto para confirmar
              </label>

              <input
                type="text"
                className="form-control"
                value={idConfirmacion}
                onChange={(e) =>
                  setIdConfirmacion(e.target.value)
                }
              />
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmarEliminacion}
                disabled={eliminando}
              >
                {eliminando
                  ? 'Eliminando...'
                  : 'Eliminar mi reserva'}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelarEliminacion}
                disabled={eliminando}
              >
                Cancelar
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}