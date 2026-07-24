// Componente reutilizable para mostrar una reserva de PetCare
export default function ReservaCard({ reserva }) {
  // Chwazi koulè etikèt la selon eta rezèvasyon an
  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'confirmada':
        return 'bg-success';
      case 'completada':
        return 'bg-primary';
      case 'cancelada':
        return 'bg-danger';
      default:
        return 'bg-warning text-dark';
    }
  };

  return (
    <article className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title text-success fw-bold mb-0">
            🐾 {reserva.mascota?.nombre || 'Mascota sin nombre'}
          </h5>

          <span
            className={`badge ${obtenerColorEstado(
              reserva.estado
            )}`}
          >
            {reserva.estado || 'sin estado'}
          </span>
        </div>

        <h6 className="fw-bold">Datos del dueño</h6>

        <p className="mb-1">
          <strong>Nombre:</strong>{' '}
          {reserva.dueño?.nombre || 'No informado'}
        </p>

        <p className="mb-3">
          <strong>Teléfono:</strong>{' '}
          {reserva.dueño?.telefono || 'No informado'}
        </p>

        <h6 className="fw-bold">Datos de la mascota</h6>

        <p className="mb-1">
          <strong>Tipo:</strong>{' '}
          {reserva.mascota?.tipo || 'No informado'}
        </p>

        <p className="mb-3">
          <strong>Raza:</strong>{' '}
          {reserva.mascota?.raza || 'No informada'}
        </p>

        <h6 className="fw-bold">Datos de la reserva</h6>

        <p className="mb-1">
          <strong>Servicio:</strong>{' '}
          {reserva.servicioNombre || 'No informado'}
        </p>

        <p className="mb-1">
          <strong>Fecha:</strong>{' '}
          {reserva.fecha || 'No informada'}
        </p>

        <p className="mb-1">
          <strong>Hora:</strong>{' '}
          {reserva.hora || 'No informada'}
        </p>

        <hr />

        <p className="small text-muted mb-0">
          <strong>ID:</strong> {reserva._id || 'Sin ID'}
        </p>
      </div>
    </article>
  );
}