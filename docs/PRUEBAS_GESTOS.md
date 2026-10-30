# Pruebas de navegación gestual

## Validación automatizada

```bash
npm ci
npm test
npm run build
```

El conjunto de 10 pruebas usa `node:test`, sin cámara ni dependencias nuevas. Comprueba lateralidad de cámara sin espejo, posiciones iniciales cómodas, temblor, direcciones, parada manteniendo la mano alejada del inicio, inversión de dirección sin volver al centro, distancia equivalente a 15/30/60 FPS, separación de ejes, reanclaje por muestras vencidas/saltos, escala por viewport y ausencia de scroll diferido tras parar.

El build verifica compilación y empaquetado. Ninguno de estos pasos valida la precisión del reconocimiento de una mano física.

## Recorrido manual con cámara

Preparar HTTPS o localhost, navegador con permiso de cámara, iluminación suficiente y página con recorrido vertical disponible. Entrar en Arquitectura. Mantener el ratón disponible para salir.

| Paso | Acción | Resultado esperado |
| --- | --- | --- |
| 1 | Activar y abrir mano derecha cómodamente | Primera referencia sin scroll; guía visible |
| 2 | Bajar la palma unos centímetros sin llegar al borde | Página desciende; indicador BAJANDO |
| 3 | Bajar más y dejar la mano quieta abajo | Página acompaña el recorrido y se detiene al parar la mano |
| 4 | Subir un poco desde abajo sin llegar al inicio | Página sube sin exigir volver al centro |
| 5 | Subir la palma | Página asciende; indicador SUBIENDO |
| 6 | Cerrar puño, señalar o hacer pinza | Scroll se detiene; el otro gesto sigue disponible |
| 7 | Quitar mano de cámara | No continúa desplazándose |
| 8 | Mostrar solo mano izquierda abierta | No activa scroll vertical; mensaje pide derecha |
| 9 | Mover palma horizontalmente | Cambia evidencia sin scroll vertical |
| 10 | Mostrar dos manos y separarlas/juntarlas | Zoom del visor, sin scroll de página |
| 11 | Volver a una mano abierta | Nueva referencia sin salto |
| 12 | Cambiar de pestaña y volver | Se detiene; nueva referencia al retomar |
| 13 | Salir y activar nuevamente | Cámara se apaga y reinicia con centro nuevo |
| 14 | Cambiar a Tecnología/portal con cámara activa | No queda scroll ni cámara del componente anterior |
| 15 | Alternar español/inglés y reiniciar cámara | Guía y leyenda en el idioma seleccionado |
| 16 | Navegar con ratón/táctil con cámara apagada | Comportamiento habitual |
| 17 | Rechazar permiso de cámara | Mensaje de error; sitio navegable |

Probar desktop y pantalla estrecha: guía, leyenda y salida deben ser legibles y no bloquear controles importantes. Registrar navegador, sistema operativo, cámara, iluminación, paso y resultado al reportar errores.

## Resultado de esta entrega (30/10/2026)

- 10 pruebas automáticas aprobadas.
- Build de producción aprobado, con advertencia de tamaño de bundle existente.
- Preview local no disponible en la revisión anterior: `sites-preview` informó que no existe el relay; el navegador tampoco pudo iniciarse. No se sustituyó esa infraestructura.
- Validación visual local y cámara física pendientes. No se declara probado el reconocimiento, la comodidad ni todos los gestos del visor en un dispositivo real.
