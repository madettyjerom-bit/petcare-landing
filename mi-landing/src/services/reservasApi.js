const BASE_URL = 'https://apiclases.inacode.cl/mascotas';

export async function getReservas() {
  const respuesta = await fetch(BASE_URL);

  if (!respuesta.ok) {
    throw new Error('Error al obtener las reservas');
  }

  const resultado = await respuesta.json();
  return resultado.datos || [];
}

export async function getReserva(id) {
  const respuesta = await fetch(`${BASE_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error('Reserva no encontrada');
  }

  return respuesta.json();
}

export async function crearReserva(reserva) {
  const respuesta = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reserva),
  });

  if (!respuesta.ok) {
    throw new Error('Error al crear la reserva');
  }

  return respuesta.json();
}

export async function actualizarReserva(id, reserva) {
  const respuesta = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reserva),
  });

  if (!respuesta.ok) {
    throw new Error('Error al actualizar la reserva');
  }

  return respuesta.json();
}

export async function eliminarReserva(id) {
  const respuesta = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!respuesta.ok) {
    throw new Error('Error al eliminar la reserva');
  }

  return respuesta.json();
}