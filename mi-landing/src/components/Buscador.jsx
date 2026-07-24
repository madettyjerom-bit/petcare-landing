// Componente reutilizable para buscar reservas
export default function Buscador({
  busqueda,
  setBusqueda,
}) {
  return (
    <div className="input-group mb-4 shadow-sm">
      <span className="input-group-text">
        🔎
      </span>

      <input
        type="search"
        className="form-control"
        placeholder="Buscar por ID o información de la reserva"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        aria-label="Buscar reservas"
      />

      {busqueda && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setBusqueda('')}
        >
          Limpiar
        </button>
      )}
    </div>
  );
}