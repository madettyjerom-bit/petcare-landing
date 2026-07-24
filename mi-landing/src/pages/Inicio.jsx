import React, { useState } from 'react';

export default function Inicio() {
  // === ESTADOS (HOOKS) ===
  // Estado para controlar si el Modal de testimonios se muestra (true) o se oculta (false)
  const [showModal, setShowModal] = useState(false);
  // Estado para guardar el correo que escribe el usuario en el Newsletter
  const [email, setEmail] = useState('');

  // Función para manejar el envío del formulario de suscripción
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`¡Gracias por suscribirte con: ${email}!`);
    setEmail('');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light text-dark">
      
      

      {/* === 2. HERO SECTION (Sección principal con Imagen y CTA) === */}
      <header id="inicio" className="bg-white py-5 border-bottom">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <span className="badge bg-success mb-2 px-3 py-2 rounded-pill fs-6">Tu Veterinario en Casa</span>
              <h1 className="display-4 fw-bold mb-3 text-dark">El cuidado que tu mascota merece</h1>
              <p className="lead text-muted mb-4">Consulta con veterinarios expertos 24/7 y monitorea la salud de tu mejor amigo desde nuestra app móvil.</p>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                <a href="#newsletter" className="btn btn-success btn-lg px-4 fw-bold shadow text-white">Descargar Gratis</a>
              </div>
            </div>
            <div className="col-md-6 text-center mt-5 mt-md-0">
              <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80" alt="Mascota" className="img-fluid rounded shadow-lg" style={{ maxHeight: "350px", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-shrink-0">
        {/* === 3. ACORDÉÓN (Interactividad - Características) === */}
        <section id="features" className="py-5 bg-light">
          <div className="container py-4">
            <h2 className="text-center fw-bold mb-5 text-dark">¿Por qué elegir PetCare?</h2>
            <div className="row justify-content-center mb-5">
              <div className="col-md-8">
                <div className="accordion shadow-sm" id="accordionFeatures">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        🩺 Telemedicina Veterinaria 24/7
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFeatures">
                      <div className="accordion-body text-muted">Conéctate con un médico veterinario certificado en tiempo real mediante videollamada a cualquier hora del día.</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed fw-bold text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                        📅 Historial Clínico Digital
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFeatures">
                      <div className="accordion-body text-muted">Llevan el control estricto de todas las vacunas y recetas médicas en un solo perfil seguro.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* === 4. TARJETAS DE BENEFICIOS (Grid responsivo) === */}
            <div id="beneficios" className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 shadow-sm border-0 bg-white p-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-dark">🚀 Ahorro de Tiempo</h5>
                    <p className="card-text text-muted">Evita largas salas de espera resolviendo dudas desde tu celular.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 shadow-sm border-0 bg-white p-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-dark">🔒 Alertas Automáticas</h5>
                    <p className="card-text text-muted">Recordatorios directos para que nunca olvides la próxima vacuna.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* === 5. FOOTER & NEWSLETTER (Formulario con validación required) === */}
      <footer id="newsletter" className="bg-dark text-white py-5 mt-auto">
        <div className="container text-center text-md-start">
          <div className="row g-4 align-items-center">
            <div className="col-md-4">
              <h5 className="fw-bold text-success">PetCare 🐾</h5>
              <p className="text-muted small">Cuidamos a tu mejor amigo con la mejor tecnología y amor.</p>
            </div>
            {/* Botón que activa el Modal cambiando el estado a true */}
            <div className="col-md-4 text-center">
              <button type="button" className="btn btn-outline-success btn-sm rounded-pill px-4 text-white" onClick={() => setShowModal(true)}>Ver Testimonios ⭐</button>
            </div>
            <div className="col-md-4">
              <form onSubmit={handleSubscribe} className="d-flex gap-2">
                <input type="email" className="form-control form-control-sm" placeholder="Tu correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit" className="btn btn-success btn-sm text-white">Unirse</button>
              </form>
            </div>
          </div>
          <hr className="my-4 border-secondary" />
          <p className="text-center text-muted small">&copy; 2026 PetCare App - INACAP Sede Renca. Desarrollado por Madette J. Sainvil.</p>
        </div>

        {/* === 6. MODAL INTERACTIVO (Se muestra solo si showModal es true) === */}
        {showModal && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-dark bg-white">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title fw-bold">Testimonios 🐶</h5>
                  {/* Botón X para cerrar el modal */}
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body text-center">
                  <p><em>"Excelente app. Pude hablar con una veterinaria a las 3 AM cuando mi gatito se sentía mal."</em></p>
                  <strong className="small text-success">- María Rojas, Santiago</strong>
                </div>
                <div className="modal-footer">
                  {/* Botón Cerrar para ocultar el modal poniendo el estado en false */}
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}