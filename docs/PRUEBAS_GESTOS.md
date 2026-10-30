# Pruebas de navegación gestual

## Validación automatizada

```bash
npm ci
npm test
npm run build
```

El conjunto de 8 pruebas usa `node:test`, sin cámara ni dependencias nuevas. Comprueba lateralidad invertida de la cámara sin espejo, origen cómodo, temblor neutral, direcciones, aceleración, separación horizontal/vertical, equivalencia temporal a 15/30/60 FPS del detector, una sola animación, parada, watchdog y ausencia de inercia al invertir dirección.

El build verifica compilación y empaquetado. Ninguno de estos pasos valida la precisión del reconocimiento de una mano física.

## Recorrido manual con cámara

Preparar HTTPS o localhost, navegador con permiso de cámara, iluminación suficiente y página con recorrido vertical disponible. Entrar en Arquitectura. Mantener el ratón disponible para salir.

| Paso | Acción | Resultado esperado |
| --- | --- | --- |
| 1 | Activar y abrir mano derecha cómodamente | Primer centro sin scroll; guía visible |
| 2 | Bajar la palma unos centímetros sin llegar al borde | Página desciende; indicador BAJAR |
| 3 | Bajar más | Mayor velocidad sin salto ni cambio de evidencia |
| 4 | Volver al centro | Scroll se detiene |
| 5 | Subir la palma | Página asciende; indicador SUBIR |
| 6 | Cerrar puño, señalar o hacer pinza | Scroll se detiene; el otro gesto sigue disponible |
| 7 | Quitar mano de cámara | No continúa desplazándose |
| 8 | Mostrar solo mano izquierda abierta | No activa scroll vertical; mensaje pide derecha |
| 9 | Mover palma horizontalmente | Cambia evidencia sin scroll vertical |
| 10 | Mostrar dos manos y separarlas/juntarlas | Zoom del visor, sin scroll de página |
| 11 | Volver a una mano abierta | Nuevo centro sin salto |
| 12 | Cambiar de pestaña y volver | Se detiene; nueva referencia al retomar |
| 13 | Salir y activar nuevamente | Cámara se apaga y reinicia con centro nuevo |
| 14 | Cambiar a Tecnología/portal con cámara activa | No queda scroll ni cámara del componente anterior |
| 15 | Alternar español/inglés y reiniciar cámara | Guía y leyenda en el idioma seleccionado |
| 16 | Navegar con ratón/táctil con cámara apagada | Comportamiento habitual |
| 17 | Rechazar permiso de cámara | Mensaje de error; sitio navegable |

Probar desktop y pantalla estrecha: guía, leyenda y salida deben ser legibles y no bloquear controles importantes. Registrar navegador, sistema operativo, cámara, iluminación, paso y resultado al reportar errores.

## Resultado de esta entrega (30/10/2026)

- 8 pruebas automáticas aprobadas.
- Build de producción aprobado, con advertencia de tamaño de bundle existente.
- Preview local no disponible: `sites-preview` informó que no existe el relay. No se sustituyó esa infraestructura.
- Validación visual local y cámara física pendientes. No se declara probado el reconocimiento, la comodidad ni todos los gestos del visor en un dispositivo real.
