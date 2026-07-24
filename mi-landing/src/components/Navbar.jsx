import { NavLink } from 'react-router-dom';

// Componente de navegación principal de PetCare
export default function Navbar() {
  const claseEnlace = ({ isActive }) =>
    `nav-link ${isActive ? 'active fw-bold text-white' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink
          className="navbar-brand fw-bold text-success"
          to="/ver"
        >
          PetCare 🐾
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPetCare"
          aria-controls="menuPetCare"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="menuPetCare"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className={claseEnlace}
                to="/ver"
              >
                Ver reservas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={claseEnlace}
                to="/agregar"
              >
                Agregar
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={claseEnlace}
                to="/editar"
              >
                Editar
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={claseEnlace}
                to="/eliminar"
              >
                Eliminar
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}