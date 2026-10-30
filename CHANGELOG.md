# Historial de cambios

Las entradas nuevas distinguen implementación y validación. Las anteriores son hitos recuperados del historial Git, no una reconstrucción completa de todas las conversaciones.

## 2026-10-30 — Mano derecha y documentación de continuidad

**Problema:** desplazamiento de Arquitectura lento y dependiente de zonas extremas de cámara, llamadas por resultado del detector y desplazamiento suave global.

**Cambio (HU-07):** posición inicial de palma derecha como centro; bajar/subir controla la dirección; distancia regula velocidad; neutral o gesto distinto detiene. Detección de intención vertical separada del swipe horizontal. Temporización por animación con scroll inmediato, watchdog de 220 ms y limpieza al perder mano, usar dos manos, cambiar pestaña o salir. Guía ES/EN visible.

**Documentación (HU-10):** propósito, alcance, historias y backlog, mapa técnico, decisiones, pruebas y reglas para mantener el historial junto al código.

**Validación:** 8 pruebas de lógica/temporización y build aprobados. Advertencia de chunk grande en Vite. Preview local y cámara física sin verificar por indisponibilidad del relay. No se afirma que el sitio público esté desplegado solo por existir este cambio.

**Ámbito:** `ArchitectureGestureMode`. El laboratorio de Tecnología conserva su controlador anterior. Base: `13286db`.

## 2026-09-21 — Gestos de Arquitectura

Hitos del repositorio: `8c4c418` (scroll vertical y tracking), `0474018` (instrucciones subir/bajar), `5a3b3e7` (motor gestual), `787b872` (webcam nativa de baja latencia), `f401627` (guía), `ce5ea9b` (leyenda activa) y `13286db` (feedback y leyenda). Esta documentación no presume que esos cambios anteriores se validaron físicamente.

## 2026-08-28 a 2026-08-29 — Recorridos y acompañantes

`dc5a2b6`: casos reales y diagnóstico de automatización. `a510e9a`: reconstrucción de los dos mundos y recorrido comercial. `1e049d9`: renovación de asistentes; `a09c350`: sincronización con sección visible; `ba8d409`: acompañante tecnológico 3D; `38658ac`: protección ante fallos de WebGL.

## 2026-07-17 a 2026-07-19 — Base de historial disponible

`16d78cd`: posición del acompañante. `8102672` y `efb65d4`: ajustes de despliegue Cloudflare. Son los primeros hitos del historial disponible en esta revisión; no se atribuye una fecha de creación original del producto.
