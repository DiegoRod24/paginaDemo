# JYM Experience V8 — Asistentes animados

Versión completa React + Vite + Three.js.

## Qué conserva
- Portal dividido entre Tecnología y Arquitectura.
- Modelos 3D interactivos: monitor tecnológico y casa arquitectónica.
- Los modelos se renderizan por delante y fuera de las tarjetas para evitar cortes.
- Showroom, proyectos, servicios, contacto, videos, imágenes y cambio ES/EN.

## Novedad V8
- Acompañante animado durante el scroll.
- Personaje tecnológico y personaje de arquitectura.
- Detecta automáticamente la sección visible mediante IntersectionObserver.
- Cambia de actividad en Inicio, Showroom, Servicios, Proceso, Proyectos, Automatización y Contacto.
- En escritorio cambia de lado para no cubrir el contenido.
- En móvil se reduce y oculta el globo de texto.
- Respeta la opción de accesibilidad “reducir movimiento”.

## Ejecutar
```powershell
npm install
npm run dev
```

## Compilar
```powershell
npm run build
```

## Cloudflare Pages
- Framework: React (Vite)
- Build command: npm run build
- Output: dist
- Branch: main

## GitHub
```powershell
git init
git branch -M main
git add .
git commit -m "JYM Experience V8 asistentes animados"
git remote add origin https://github.com/DiegoRod24/paginaDemo.git
git push -u origin main --force
```
