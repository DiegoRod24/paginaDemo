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

Revisión de HU-07 tras feedback del usuario: el primer diseño actuaba como acelerador por posición. Se sustituye por seguimiento directo del movimiento (opción 1 elegida el 30/10/2026).

Criterios de aceptación:

1. La primera palma derecha abierta establece una referencia cómoda sin desplazar la página.
2. Cada nuevo movimiento hacia abajo/arriba desplaza la página en esa dirección, sin llegar a los bordes de la cámara.
3. El recorrido de página es proporcional a la distancia recorrida por la mano, con ganancia basada en la altura de pantalla y límite por muestra.
4. Dejar quieta la mano detiene la página en cualquier posición, sin volver al centro. Si se sube desde una posición inferior al inicio, la página sube inmediatamente.
5. La mano izquierda y una clasificación de lateralidad insuficiente no activan scroll vertical.
6. Un movimiento vertical bloquea el cambio de evidencia hasta hacer una pausa. Los movimientos horizontales mantienen su función.
7. Cerrar el puño permite recolocar la mano sin scroll. Dos manos suspenden scroll para zoom; reabrir una mano establece una nueva referencia.
8. Pérdida de mano, salida, pestaña oculta y desmontaje detienen el control. No se programa desplazamiento futuro: no hay inercia.
9. Muestras separadas más de 220 ms y saltos grandes del detector reanclan sin mover. A 15/30/60 resultados por segundo, un recorrido equivalente de mano produce distancia equivalente dentro del margen de temblor.
10. La guía ES/EN explica movimiento directo, parada con mano quieta y puño para recolocar; el HUD muestra SUBIENDO, DETENIDO o BAJANDO.

Verificación: 10 pruebas unitarias de lógica y parada + build; recorrido real con cámara y regresiones de visor aún pendientes. Véase [pruebas](PRUEBAS_GESTOS.md).

## HU-10 — Documentación continua

Criterios: README como entrada; propósito y alcance; mapa técnico; historias con estado; historial con evidencia y límites; instrucciones de ejecución y pruebas; reglas para actualizar documentos junto con futuros cambios. Los documentos permanecen en el mismo repositorio y commit que la implementación.

## Backlog para próximas entregas

| ID | Mejora propuesta | Condición de cierre |
| --- | --- | --- |
| HU-11 | Ajustar sensibilidad con cámara real | Probar movimientos cómodos y documentar navegador, equipo y resultado |
| HU-12 | Revisar rendimiento y capas CSS/JS | Medir carga y solapes, consolidar por módulos sin regresiones |
| HU-13 | Unificar navegación gestual de Tecnología y Arquitectura | Definir alcance y probar ambos controladores; no asumir que ya comparten lógica |

En cada entrega: elegir historia → fijar criterios → implementar → comprobar → actualizar estado e historial. No marcar completadas las validaciones físicas por haber pasado únicamente pruebas unitarias.
