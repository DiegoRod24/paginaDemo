# Historias de usuario

Actualizado: 30/10/2026. «Existente» indica función localizada en la base `13286db`; no significa que se haya realizado una auditoría funcional completa. «Implementada; cámara pendiente» distingue pruebas de lógica de pruebas físicas.

| ID | Como usuario quiero… | Para… | Estado |
| --- | --- | --- | --- |
| HU-01 | Elegir Tecnología o Arquitectura | Explorar la oferta que necesito | Existente |
| HU-02 | Navegar entre secciones y volver a Inicio | Orientarme dentro del recorrido | Existente |
| HU-03 | Elegir un proyecto y ver sus fotos/videos | Evaluar trabajos y resultados | Existente |
| HU-04 | Consultar servicios, proceso y casos | Entender cómo trabaja JYM | Existente |
| HU-05 | Contactar por WhatsApp u otros enlaces | Solicitar una cotización | Existente |
| HU-06 | Activar cámara, apuntar y seleccionar con pinza | Probar navegación sin ratón | Existente |
| HU-07 | Bajar/subir mi mano derecha para bajar/subir la página | Desplazarme con rapidez y control | Implementada; cámara pendiente |
| HU-08 | Cambiar evidencia lateralmente y usar dos manos para zoom | Explorar el showroom | Existente; validar regresión |
| HU-09 | Leer instrucciones en español o inglés | Comprender las acciones disponibles | Existente; guía de scroll actualizada |
| HU-10 | Consultar una guía e historial actualizados | Continuar el desarrollo sin perder contexto | Implementada |

## HU-07 — Desplazamiento vertical natural

**Solicitud:** «Cuando llevo la mano derecha hacia abajo, la página baja; cuando la subo, la página sube». Prioridad alta. Ámbito: `ArchitectureGestureMode`.

Problema anterior: la palma debía superar las zonas absolutas 0.30/0.70 de la cámara y se enviaban pequeños desplazamientos por cada resultado del detector. Con `scroll-behavior: smooth`, las órdenes sucesivas podían reiniciar la animación; la velocidad dependía además del rendimiento de detección.

Criterios de aceptación:

1. La primera palma derecha abierta establece un centro cómodo sin desplazar la página.
2. Bajar la palma respecto al centro genera scroll descendente; subirla genera scroll ascendente, sin tener que alcanzar los bordes de la cámara.
3. La distancia al centro aumenta progresivamente la velocidad, con límite de 1600 píxeles/segundo.
4. Pequeñas variaciones alrededor del centro no desplazan la página. Volver al centro o dejar de abrir la mano detiene el scroll.
5. La mano izquierda y una clasificación de lateralidad insuficiente no activan scroll vertical.
6. Un movimiento vertical no dispara la flecha de siguiente/anterior evidencia. El desplazamiento horizontal mantiene su función.
7. Dos manos suspenden el scroll vertical para permitir zoom; al volver a una mano abierta se establece un nuevo centro.
8. Pérdida de mano, salida de cámara, cambio de pestaña y desmontaje detienen el bucle. Si no llegan nuevos resultados durante más de 220 ms, se detiene.
9. La integración usa tiempo transcurrido y un único bucle de animación. A igual velocidad solicitada, 15/30/60 resultados por segundo producen distancias equivalentes.
10. La interfaz explica la dirección, la parada y la velocidad en ambos idiomas.

Verificación: pruebas unitarias de lógica y temporización + build; recorrido real con cámara y regresiones de visor aún pendientes. Véase [pruebas](PRUEBAS_GESTOS.md).

## HU-10 — Documentación continua

Criterios: README como entrada; propósito y alcance; mapa técnico; historias con estado; historial con evidencia y límites; instrucciones de ejecución y pruebas; reglas para actualizar documentos junto con futuros cambios. Los documentos permanecen en el mismo repositorio y commit que la implementación.

## Backlog para próximas entregas

| ID | Mejora propuesta | Condición de cierre |
| --- | --- | --- |
| HU-11 | Ajustar sensibilidad con cámara real | Probar movimientos cómodos y documentar navegador, equipo y resultado |
| HU-12 | Revisar rendimiento y capas CSS/JS | Medir carga y solapes, consolidar por módulos sin regresiones |
| HU-13 | Unificar navegación gestual de Tecnología y Arquitectura | Definir alcance y probar ambos controladores; no asumir que ya comparten lógica |

En cada entrega: elegir historia → fijar criterios → implementar → comprobar → actualizar estado e historial. No marcar completadas las validaciones físicas por haber pasado únicamente pruebas unitarias.
