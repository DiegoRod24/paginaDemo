# JYM Experience

Sitio comercial interactivo de **JYM Diseño y Arquitectura S.A.C.** que reúne dos recorridos: tecnología y automatización, y arquitectura y ejecución de espacios. Incluye showroom multimedia, acompañantes animados, contacto y experiencias opcionales con cámara.

- Sitio público: https://jym-experience.pages.dev/
- Código: https://github.com/DiegoRod24/paginaDemo
- Base revisada: `13286db` (21/09/2026). La denominación V15 de `package.json` es histórica; los commits identifican los cambios actuales.

## Guía del proyecto

| Documento | Para qué sirve |
| --- | --- |
| [Proyecto y alcance](docs/PROYECTO.md) | Qué hace el sitio, para quién y qué incluye |
| [Historias de usuario](docs/HISTORIAS_DE_USUARIO.md) | Necesidades, criterios de aceptación y trabajo pendiente |
| [Arquitectura y mantenimiento](docs/ARQUITECTURA.md) | Dónde se encuentra cada función y cómo modificarla |
| [Historial de cambios](CHANGELOG.md) | Cambios comprobados y límites de cada entrega |
| [Pruebas de gestos](docs/PRUEBAS_GESTOS.md) | Validación automática y recorrido manual con cámara |
| [Guía para colaboradores](AGENTS.md) | Reglas para mantener código y documentación sincronizados |

## Ejecutar

Usar una versión vigente de Node.js con `node:test` (recomendado Node 22 o posterior).

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Vite genera el sitio estático en `dist/`. Para Cloudflare Pages: comando `npm run build`, salida `dist`. Revisar en Cloudflare qué rama está conectada: esa configuración no está declarada en este repositorio.

## Desplazamiento con la mano derecha (Arquitectura)

1. Entra en Arquitectura y pulsa **Controlar showroom con gestos**. Autoriza la cámara.
2. Abre la mano derecha en una posición cómoda: el primer fotograma establece la referencia sin mover la página.
3. Baja la mano para bajar por la página; súbela para subir. La página acompaña la distancia recorrida por tu mano.
4. Deja quieta la mano para detenerte, incluso si está abajo o arriba. Cierra el puño para recolocar la mano sin desplazar la página; vuelve a abrirla para continuar.
5. El movimiento horizontal cambia evidencias; dos manos controlan zoom y desplazamiento del visor. Ambos suspenden el scroll vertical.
6. **Salir** apaga la cámara. El ratón y el desplazamiento táctil siguen disponibles.

La cámara requiere HTTPS o localhost, permisos y un navegador compatible. MediaPipe se carga desde un CDN al activar la experiencia. La mejora del 30/10/2026 corresponde al control de Arquitectura; el laboratorio gestual de Tecnología tiene su propio controlador.
