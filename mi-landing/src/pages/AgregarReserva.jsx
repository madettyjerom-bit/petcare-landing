import { useNavigate } from 'react-router-dom';
import ReservaForm from '../components/ReservaForm';

// Página que permite crear una nueva reserva
export default function AgregarReserva() {
  const navigate = useNavigate();

  // Se ejecuta después de guardar correctamente
  const manejarGuardado = () => {
    alert('Reserva creada correctamente');
    navigate('/ver');
  };

  return (
    <main className="container py-5">
      <div className="mb-4">
        <h1 className="fw-bold text-success">
          Agregar reserva
        </h1>

        <p className="text-muted">
          Complete los datos del dueño, la mascota y el servicio.
        </p>
      </div>

      <ReservaForm
        onGuardado={manejarGuardado}
        onCancelar={() => navigate('/ver')}
      />
    </main>
  );
}