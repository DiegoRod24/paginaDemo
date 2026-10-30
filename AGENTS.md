# Trabajo en JYM Experience

## Antes de modificar

- Leer README.md, docs/PROYECTO.md, docs/ARQUITECTURA.md y la historia de usuario relacionada.
- Revisar el estado real del código y los últimos commits. No interpretar el número V15 como versión actual de todas las funciones.
- Conservar los recorridos Tecnología y Arquitectura, su identidad visual y sus medios existentes.

## Al implementar

- Relacionar cambios de comportamiento con una historia en docs/HISTORIAS_DE_USUARIO.md; definir criterios verificables.
- Registrar en CHANGELOG.md qué cambió, por qué, cómo se verificó y qué queda pendiente.
- Actualizar el mapa técnico si se crean o trasladan módulos.
- Mantener los textos de interfaz en español e inglés en src/i18n.js.
- Evitar agregar capas de hotfix sobre funciones que ya tienen un controlador: preferir editar su fuente.
- No incluir credenciales, archivos .env, dependencias instaladas ni dist en commits.

## Al validar y entregar

- Ejecutar npm test cuando cambie la navegación gestual y npm run build para cambios de aplicación.
- Si cambia cámara, comprobar pérdida de mano, cambio de gesto, cambio de pestaña y cierre/desmontaje. La cámara siempre es optativa.
- Distinguir pruebas automáticas de comprobación con cámara física. No declarar verificado lo que no se ejecutó.
- Distinguir código guardado en GitHub de despliegue confirmado en Cloudflare.
- No eliminar historial ni sobrescribir cambios ajenos para publicar.
