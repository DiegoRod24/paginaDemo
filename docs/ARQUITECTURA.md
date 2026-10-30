# Arquitectura y mantenimiento

## Mapa del código

| Ubicación | Responsabilidad |
| --- | --- |
| `index.html` | Entrada, metadatos y carga de capas CSS/JS públicas |
| `src/main.jsx` | App, modos portal/tech/arch, navegación, showroom, contacto, acompañantes y controladores de cámara |
| `src/architectureScroll.js` | Intención vertical relativa, lateralidad y bucle de desplazamiento de Arquitectura |
| `src/i18n.js` | Textos en español e inglés, instrucciones y leyendas |
| `src/catalog.js` | Catálogo de arquitectura, tecnología y proyectos |
| `src/AnimatedTechAssistant.jsx` | Acompañante tecnológico animado |
| `src/styles.css` | Estilos principales, incluidos HUD y guía gestual |
| `public/assets/` | Imágenes, videos, marca y personajes |
| `public/jym-*.css` | Capas de presentación y correcciones sobre estilos principales |
| `public/jym-*.js` | Mejoras de navegación, visor, transiciones, acompañantes y efectos |
| `tests/architectureScroll.test.js` | Regresiones de dirección, neutral, lateralidad, velocidad, ejes y parada |
| `vite.config.js` | Configuración de Vite y React |

## Estado de aplicación

`App` mantiene modo e idioma en memoria React. Cambiar de modo monta los componentes del recorrido correspondiente. Los enlaces de sección utilizan fragmentos como `#inicio`; no equivalen a rutas independientes para cada mundo. El visor de Arquitectura mantiene su selección de proyecto y evidencia dentro del componente.

Dos controladores de gestos separados: `ArchitectureGestureMode` (cámara opcional flotante en Arquitectura) y `GestureExperience` (laboratorio de Tecnología y modo global). Esta entrega modifica el primero. No cambiar uno suponiendo que el otro heredará el comportamiento.

## Flujo gestual de Arquitectura

1. Solicitud de cámara al pulsar el botón; descarga del runtime MediaPipe Hands y utilidades desde jsDelivr.
2. `startLowLatencyGestureCamera` envía fotogramas nativos de video; `onResults` recibe landmarks y lateralidad.
3. Clasificación de gesto y estabilización. Pinza, puño, señalar, victoria y dos manos conservan sus acciones.
4. La palma derecha abierta establece un origen relativo. Un cambio predominantemente vertical activa scroll; uno horizontal permite el swipe de evidencias.
5. `createScrollDriver` convierte píxeles/segundo en desplazamiento por tiempo real, mediante `requestAnimationFrame` y `behavior: 'instant'`. El CSS global suave permanece para los demás controles.
6. Neutral, otro gesto, mano perdida, dos manos, pestaña oculta o cierre detienen el bucle. El watchdog corta tras 220 ms sin actualización de velocidad. Se ignoran resultados tardíos tras detener/desmontar la cámara.

## Parámetros de interacción

| Parámetro | Valor inicial | Motivo |
| --- | --- | --- |
| Inicio vertical | >0.035 de alto de cámara | Ignorar pequeñas variaciones |
| Retorno a neutral | <0.025 | Histéresis para evitar encendido/apagado repetido |
| Movimiento dominante | Vertical > horizontal × 1.2 | Evitar cambios de evidencia al bajar la mano |
| Velocidad | 180–1600 px/s | Respuesta progresiva con límite |
| Muestras vencidas | 220 ms | Detener ante bloqueo del detector |
| Delta máximo de animación | 50 ms | Evitar saltos tras una pausa larga |
| Lateralidad válida | Confianza ≥0.60 | Evitar activar scroll con mano incierta |

Estos valores son una base de ingeniería pendiente de ajustar con cámara real, no mediciones de comodidad del usuario.

MediaPipe Hands presupone imágenes reflejadas para sus etiquetas de lateralidad. Esta cámara envía píxeles sin reflejar: la etiqueta `Left` corresponde a la mano derecha física. El espejo del canvas solo afecta la visualización. Si se modifica la entrada o se activa `selfieMode`, revisar esta conversión y sus pruebas. Referencia oficial: https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/hands.md#multi_handedness

## Decisiones y deuda técnica

- Separar cálculo y temporización del componente facilita probar direcciones, ejes y paradas sin cámara.
- Mantener medios, identidad de ambos recorridos y controles convencionales.
- No introducir nuevas dependencias para este ajuste.
- El archivo principal y las capas CSS/JS públicas son grandes; antes de una nueva capa de correcciones, localizar qué regla/controlador gobierna la función.
- El build advierte sobre un chunk grande. Este ajuste no incorpora una optimización global ni garantiza rendimiento de toda la página.
- La rama conectada, caché y estado de Cloudflare Pages se configuran externamente. Un commit en GitHub no basta para acreditar despliegue público.
