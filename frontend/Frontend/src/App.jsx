import React, { useEffect, useState } from "react";
// CORRECCIÓN: Se añade la extensión .jsx a las importaciones
import TarjetaJuego from "./components/TarjetaJuego.jsx";
import ListaReseñas from "./components/ListaReseñas.jsx";


function App() {
  const [juegos, setJuegos] = useState([]);
  const [nuevoJuego, setNuevoJuego] = useState({
    titulo: "", // Usamos el nombre del campo del backend (Game Model)
    plataforma: "",
    horasJugadas: "",
    imagenPortada: "",
  });

  // Función para cargar los juegos
  const fetchJuegos = () => {
    // CORRECCIÓN: Cambiamos /api/games a /api/juegos para que coincida con server.js
    fetch("http://localhost:5000/api/juegos")
      .then((res) => {
        if (!res.ok) {
          throw new Error('La respuesta de la red no fue correcta.');
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Datos recibidos del backend:", data);
        setJuegos(data);
      })
      .catch((err) => console.error("❌ Error al cargar juegos:", err));
  };
  
  // ✅ Cargar juegos desde backend al montar el componente
  useEffect(() => {
    fetchJuegos();
  }, []);

  // ✅ Agregar juego
  const agregarJuego = (e) => {
    e.preventDefault();

    // El objeto nuevoJuego ya tiene los nombres de campos correctos: titulo, plataforma, etc.
    const juegoParaEnviar = {
      ...nuevoJuego,
      // IMPORTANTE: Aseguramos que las horas jugadas sea un número para el backend
      horasJugadas: Number(nuevoJuego.horasJugadas)
    };
    
    // CORRECCIÓN: Cambiamos /api/games a /api/juegos
    fetch("http://localhost:5000/api/juegos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(juegoParaEnviar),
    })
      .then((res) => res.json())
      .then((data) => {
        // Opción B (más eficiente): Añadir el nuevo juego al estado
        setJuegos((prevJuegos) => [...prevJuegos, data]); 
        
        // Resetear el formulario
        setNuevoJuego({ titulo: "", plataforma: "", horasJugadas: "", imagenPortada: "" });
      })
      .catch((err) => console.error("❌ Error al agregar juego:", err));
      
  };

  // ✅ Eliminar juego
  const eliminarJuego = (id) => {
    // CORRECCIÓN: Cambiamos /api/games a /api/juegos
    fetch(`http://localhost:5000/api/juegos/${id}`, { method: "DELETE" })
      .then(() => setJuegos(juegos.filter((j) => j._id !== id)))
      .catch((err) => console.error("Error al eliminar juego:", err));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>🎮 Lista de Juegos</h1>

      <form onSubmit={agregarJuego} style={styles.formulario}>
        <h2>Agregar nuevo juego</h2>

        <input
          type="text"
          placeholder="Nombre del juego"
          value={nuevoJuego.titulo}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, titulo: e.target.value }) // Cambio de 'name' a 'titulo'
          }
          required
        />

        <input
          type="text"
          placeholder="Plataforma"
          value={nuevoJuego.plataforma}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, plataforma: e.target.value }) // Cambio de 'platform' a 'plataforma'
          }
          required
        />

        <input
          type="number"
          placeholder="Horas jugadas"
          value={nuevoJuego.horasJugadas}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, horasJugadas: e.target.value }) // Cambio de 'hoursPlayed' a 'horasJugadas'
          }
          required
        />

        <input
          type="text"
          placeholder="URL de la imagen"
          value={nuevoJuego.imagenPortada}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, imagenPortada: e.target.value }) // Cambio de 'image' a 'imagenPortada'
          }
        />

        <button type="submit">Agregar</button>
      </form>

      <div style={styles.grid}>
        {juegos.length > 0 ? (
          juegos.map((juego) => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onDelete={eliminarJuego}
            />
          ))
        ) : (
          <p>No hay juegos registrados aún 😢</p>
        )}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>📝 Reseñas</h2>
        <ListaReseñas />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#0d0d0d",
    minHeight: "100vh",
    color: "#fff",
  },
  titulo: {
    color: "#00b4d8",
  },
  formulario: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    marginBottom: "20px",
    gap: "10px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },
};

export default App;
