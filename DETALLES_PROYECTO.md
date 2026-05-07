# Webamp Luis - Reproductor Retro Web

Este proyecto es una implementación personalizada de **Webamp**, un reproductor de música en el navegador que recrea la experiencia clásica de Winamp (versión 2.9). Incluye soporte para visualizaciones avanzadas (Milkdrop via Butterchurn), pieles personalizadas y optimización para dispositivos móviles.

## 🚀 Características Principales

- **Interfaz Clásica**: Fiel recreación de Winamp 2.9 en HTML5 y JavaScript.
- **Visualizaciones Butterchurn**: Implementación de Milkdrop para efectos visuales psicodélicos que reaccionan a la música.
- **Skin Personalizada**: Incluye el tema `Luis.wsz` cargado por defecto.
- **Soporte de Radio**: Preconfigurado con estaciones de radio de Heavy Metal y Rock.
- **Media Session API**: Control de reproducción desde la pantalla de bloqueo y barra de notificaciones (ideal para móviles).
- **Wake Lock & Anti-Suspension**: Optimizado para evitar que el navegador detenga la reproducción en segundo plano o apague la pantalla.

## 🛠️ Tecnologías y Dependencias

El proyecto es extremadamente ligero y no requiere un proceso de compilación complejo (Zero Config), ya que utiliza dependencias vía CDN:

- **Core**: [Webamp](https://webamp.org/) (versión butterchurn).
- **Tipografía**: Google Fonts (Inter).
- **Iconografía**: Símbolos Unicode para una interfaz minimalista.
- **Lógica**: JavaScript ES6 (Módulos).
- **Estilos**: CSS3 con Glassmorphism (filtros de desenfoque).

## 📥 Instalación

Al ser un proyecto estático, tienes varias formas de ejecutarlo:

### Opción 1: Servidor Local (Recomendado)
Si tienes XAMPP instalado (como es el caso), simplemente accede a:
`http://localhost/Proyectospy/webamp-luis/index.html`

### Opción 2: Abrir directamente
Puedes abrir el archivo `index.html` en cualquier navegador moderno, aunque algunas funcionalidades de carga de archivos locales podrían requerir un servidor por políticas de CORS.

## ⚙️ Configuración

Para personalizar el reproductor, edita el archivo `index.html` en la sección del script modular:

### Cambiar Canciones
Busca la constante `tracks` y añade o modifica los objetos:
```javascript
{
  metaData: {
    artist: "Nombre del Artista",
    title: "Nombre de la Canción",
  },
  url: "ruta/al/archivo.mp3",
  duration: 200 // Duración en segundos
}
```

### Cambiar Skin
Modifica la propiedad `initialSkin` en la inicialización de Webamp:
```javascript
const webamp = new Webamp({
  initialTracks: tracks,
  initialSkin: {
    url: "TuNuevaSkin.wsz",
  },
});
```

## 📱 Uso en Móviles

El proyecto ha sido diseñado pensando en la portabilidad:
1. **Instalación como PWA**: Puedes "Añadir a la pantalla de inicio" desde Chrome para usarlo como una app nativa.
2. **Controles Externos**: Gracias a la Media Session API, puedes pausar, saltar canciones y ver la carátula (`bgluis.jpg`) desde los controles de tu sistema operativo sin entrar al navegador.
3. **Refresco Rápido**: El botón inferior central (↻) permite reiniciar el reproductor rápidamente si hay algún error de carga de audio.

---
*Desarrollado con ❤️ usando Webamp.*
