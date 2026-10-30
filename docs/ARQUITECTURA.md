# Arquitectura y mantenimiento

## Mapa del código

| Ubicación | Responsabilidad |
| --- | --- |
| `index.html` | Entrada, metadatos y carga de capas CSS/JS públicas |
| `src/main.jsx` | App, modos portal/tech/arch, navegación, showroom, contacto, acompañantes y controladores de cámara |
| `src/architectureScroll.js` | Movimiento directo de palma, lateralidad y aplicación de desplazamientos de Arquitectura |
| `src/i18n.js` | Textos en español e inglés, instrucciones y leyendas |
| `src/catalog.js` | Catálogo de arquitectura, tecnología y proyectos |
| `src/AnimatedTechAssistant.jsx` | Acompañante tecnológico animado |
| `src/styles.css` | Estilos principales, incluidos HUD y guía gestual |
| `public/assets/` | Imágenes, videos, marca y personajes |
| `public/jym-*.css` | Capas de presentación y correcciones sobre estilos principales |
| `public/jym-*.js` | Mejoras de navegación, visor, transiciones, acompañantes y efectos |
| `tests/architectureScroll.test.js` | Regresiones de dirección, mano quieta, lateralidad, distancia, ejes y parada |
| `vite.config.js` | Configuración de Vite y React |

## Estado de aplicación

`App` mantiene modo e idioma en memoria React. Cambiar de modo monta los componentes del recorrido correspondiente. Los enlaces de sección utilizan fragmentos como `#inicio`; no equivalen a rutas independientes para cada mundo. El visor de Arquitectura mantiene su selección de proyecto y evidencia dentro del componente.

Dos controladores de gestos separados: `ArchitectureGestureMode` (cámara opcional flotante en Arquitectura) y `GestureExperience` (laboratorio de Tecnología y modo global). Esta entrega modifica el primero. No cambiar uno suponiendo que el otro heredará el comportamiento.

## Flujo gestual de Arquitectura

1. Solicitud de cámara al pulsar el botón; descarga del runtime MediaPipe Hands y utilidades desde jsDelivr.
2. `startLowLatencyGestureCamera` envía fotogramas nativos de video; `onResults` recibe landmarks y lateralidad.
3. Clasificación de gesto y estabilización. Pinza, puño, señalar, victoria y dos manos conservan sus acciones.
4. La primera palma derecha abierta establece una referencia. El centro de palma promedia muñeca y cuatro nudillos para reducir variaciones de dedos. Se bloquea el eje dominante de movimiento durante el recorrido; una pausa libera el eje.
5. `updatePalmScroll` devuelve distancia nueva de la mano, nunca velocidad por sostener una posición. `palmDeltaToPixels` convierte esa distancia con ganancia de tres alturas de pantalla por altura normalizada de cámara. `createScrollDriver.move` aplica una sola orden `behavior: 'instant'` por movimiento; no hay inercia ni animaciones de scroll pendientes. El CSS suave global permanece para otros controles.
6. Mano quieta, otro gesto, mano perdida, dos manos, pestaña oculta o cierre detienen el desplazamiento. El temporizador de 120 ms solo limpia el indicador cuando dejan de llegar muestras; nunca ejecuta scroll. Resultados espaciados más de 220 ms o saltos de tracking establecen una referencia nueva, sin salto. Se ignoran resultados tardíos tras detener/desmontar la cámara.

## Parámetros de interacción

| Parámetro | Valor inicial | Motivo |
| --- | --- | --- |
| Activación vertical | >0.018 de altura de cámara | Ignorar temblor antes de decidir intención |
| Activación horizontal | >0.025 de ancho de cámara | Separar navegación de evidencias |
| Movimiento dominante | Eje principal > otro eje × 1.3 | Evitar acciones diagonales ambiguas |
| Margen por muestra | 0.004 normalizado | Ignorar pequeñas variaciones conservando distancia acumulada |
| Liberación de eje | 160 ms quieto | Permitir cambiar entre vertical y horizontal |
| Ganancia | Delta × altura de ventana × 3 | Recorrer contenido sin grandes movimientos del brazo |
| Límite por muestra | 40% de altura de ventana | Evitar saltos excesivos |
| Muestra vencida / salto de tracking | >220 ms / >0.16 normalizado | Reanclar sin desplazar |
| Indicador sin muestras | 120 ms | Mostrar DETENIDO sin ninguna inercia |
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
