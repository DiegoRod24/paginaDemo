# Proyecto y alcance

Revisión documental: 30/10/2026. Referencia inicial: commit `13286db`. Este documento describe el código inspeccionado; no acredita pruebas funcionales completas de las funciones preexistentes.

## Propósito

Presentar servicios y trabajos de JYM mediante dos recorridos reconocibles y permitir que una persona interesada explore evidencias y solicite una cotización.

| Recorrido | Contenido y experiencia existentes |
| --- | --- |
| Portal | Elección entre Tecnología y Arquitectura |
| Tecnología | Automatización, bots, validación de datos, dashboards, demostraciones, casos y laboratorio de gestos |
| Arquitectura | Diseño y ejecución, catálogo de ambientes/proyectos, imágenes y videos, showroom y gestos |
| Transversal | Navegación por secciones, español/inglés, acompañantes, contacto y WhatsApp |

## Personas y necesidades

- Visitante: entender qué ofrece JYM, revisar trabajos y contactar sin fricción.
- Visitante que prueba gestos: navegar sin ratón con instrucciones claras y poder detener la cámara.
- Responsable de JYM: mantener contenidos, medios y datos de contacto.
- Desarrollador o asistente de mantenimiento: ubicar funciones, conocer decisiones y revisar qué cambió.

## Flujo principal

Entrar al portal → escoger recorrido → explorar servicios/showroom/proyectos → contactar para cotizar. El control por cámara es una alternativa opcional dentro de la experiencia; la navegación convencional permanece disponible.

## Alcance actual y límites

Aplicación React estática construida con Vite, escenas y acompañantes 3D, animaciones y archivos multimedia. En el código inspeccionado no se identifica un servidor propio, autenticación de clientes ni base de datos para registrar solicitudes. No presentar las demostraciones visuales de automatización como operaciones ejecutadas contra servicios reales.

La cámara se solicita al activar gestos. Los fotogramas se entregan al motor MediaPipe del navegador; el flujo revisado no los sube a un servidor de JYM. Los scripts y recursos del motor se descargan de jsDelivr. Requiere permisos de cámara, conexión para el motor y HTTPS/localhost.

## Prioridades de mantenimiento

1. Sustituir el desplazamiento por posición por seguimiento directo del movimiento de la mano derecha (HU-07; implementado, validación física pendiente).
2. Mantener propósito, historias, arquitectura, pruebas e historial junto al código (HU-10).
3. Validar la interacción real con cámara y ajustar sensibilidad con resultados observados.
4. Revisar las capas CSS/JS superpuestas y el tamaño del bundle antes de ampliar efectos.

Las prioridades 3 y 4 son trabajo pendiente, no mejoras declaradas como terminadas.
