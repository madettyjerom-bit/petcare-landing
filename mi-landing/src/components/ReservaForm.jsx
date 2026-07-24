import { useEffect, useState } from 'react';
import {
  crearReserva,
  actualizarReserva,
} from '../services/reservasApi';

const SERVICIOS = [
  {
    id: '665f11223344556677889901',
    nombre: 'Control Veterinario General',
  },
  {
    id: '665f11223344556677889902',
    nombre: 'Vacunación',
  },
  {
    id: '665f11223344556677889903',
    nombre: 'Desparasitación',
  },
  {
    id: '665f11223344556677889904',
    nombre: 'Peluquería Canina',
  },
];

const ESTADOS = [
  'pendiente',
  'confirmada',
  'completada',
  'cancelada',
];

export default function ReservaForm({
  reservaEditando,
  onGuardado,
  onCancelar,
}) {
  const [duenoNombre, setDuenoNombre] = useState('');
  const [duenoTelefono, setDuenoTelefono] = useState('');

  const [mascotaNombre, setMascotaNombre] = useState('');
  const [mascotaTipo, setMascotaTipo] = useState('');
  const [mascotaRaza, setMascotaRaza] = useState('');

  const [servicioId, setServicioId] = useState('');
  const [servicioNombre, setServicioNombre] = useState('');

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [estado, setEstado] = useState('pendiente');

  useEffect(() => {
    if (reservaEditando) {
      setDuenoNombre(reservaEditando.dueño?.nombre || '');
      setDuenoTelefono(reservaEditando.dueño?.telefono || '');

      setMascotaNombre(reservaEditando.mascota?.nombre || '');
      setMascotaTipo(reservaEditando.mascota?.tipo || '');
      setMascotaRaza(reservaEditando.mascota?.raza || '');

      setServicioId(reservaEditando.servicioId || '');
      setServicioNombre(reservaEditando.servicioNombre || '');

      setFecha(reservaEditando.fecha || '');
      setHora(reservaEditando.hora || '');
      setEstado(reservaEditando.estado || 'pendiente');
    } else {
      setDuenoNombre('');
      setDuenoTelefono('');

      setMascotaNombre('');
      setMascotaTipo('');
      setMascotaRaza('');

      setServicioId('');
      setServicioNombre('');

      setFecha(new Date().toISOString().split('T')[0]);
      setHora('');
      setEstado('pendiente');
    }
  }, [reservaEditando]);

  const handleServicioChange = (e) => {
    const idSeleccionado = e.target.value;

    const servicioSeleccionado = SERVICIOS.find(
      (servicio) => servicio.id === idSeleccionado
    );

    setServicioId(idSeleccionado);
    setServicioNombre(servicioSeleccionado?.nombre || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosReserva = {
      dueño: {
        nombre: duenoNombre,
        telefono: duenoTelefono,
      },
      mascota: {
        nombre: mascotaNombre,
        tipo: mascotaTipo,
        raza: mascotaRaza,
      },
      servicioId,
      servicioNombre,
      fecha,
      hora,
      estado,
    };

    try {
      if (reservaEditando) {
        await actualizarReserva(
          reservaEditando._id,
          datosReserva
        );
      } else {
        await crearReserva(datosReserva);
      }

      if (onGuardado) {
        onGuardado();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form
      className="card bg-body-tertiary p-4 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h5 className="card-title mb-4">
        {reservaEditando
          ? 'Editar reserva PetCare'
          : 'Nueva reserva PetCare'}
      </h5>

      <h6 className="text-success">
        Datos del dueño
      </h6>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">
            Nombre del dueño
          </label>

          <input
            type="text"
            className="form-control"
            value={duenoNombre}
            onChange={(e) => setDuenoNombre(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Teléfono
          </label>

          <input
            type="tel"
            className="form-control"
            placeholder="+56912345678"
            value={duenoTelefono}
            onChange={(e) => setDuenoTelefono(e.target.value)}
            required
          />
        </div>
      </div>

      <h6 className="text-success">
        Datos de la mascota
      </h6>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">
            Nombre de la mascota
          </label>

          <input
            type="text"
            className="form-control"
            value={mascotaNombre}
            onChange={(e) => setMascotaNombre(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">
            Tipo
          </label>

          <select
            className="form-select"
            value={mascotaTipo}
            onChange={(e) => setMascotaTipo(e.target.value)}
            required
          >
            <option value="">
              Seleccione el tipo
            </option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="ave">Ave</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">
            Raza
          </label>

          <input
            type="text"
            className="form-control"
            value={mascotaRaza}
            onChange={(e) => setMascotaRaza(e.target.value)}
            required
          />
        </div>
      </div>

      <h6 className="text-success">
        Datos de la reserva
      </h6>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">
            Servicio
          </label>

          <select
            className="form-select"
            value={servicioId}
            onChange={handleServicioChange}
            required
          >
            <option value="">
              Seleccione un servicio
            </option>

            {SERVICIOS.map((servicio) => (
              <option
                key={servicio.id}
                value={servicio.id}
              >
                {servicio.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">
            Fecha
          </label>

          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">
            Hora
          </label>

          <input
            type="time"
            className="form-control"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Estado
          </label>

          <select
            className="form-select"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            {ESTADOS.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex gap-2 mt-4">
        <button
          type="submit"
          className="btn btn-success"
        >
          {reservaEditando
            ? 'Actualizar reserva'
            : 'Crear reserva'}
        </button>

        {onCancelar && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}