(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];
  const mode = () => document.documentElement.dataset.mode;

  const TECH_HTML = `
    <section class="jym-experience-block jym-tech-story" id="transformacion-sistemas">
      <div class="jym-experience-heading">
        <small>ANTES / DESPUÉS · JYM SYSTEMS</small>
        <h2>De trabajo repetitivo a un flujo controlado</h2>
        <p>Una forma simple de entender lo que hacemos: quitamos pasos manuales, conectamos reglas y dejamos a la persona revisando solo lo importante.</p>
      </div>
      <div class="jym-tech-transformation">
        <article class="jym-flow-card before">
          <small>ANTES</small>
          <h3>Proceso manual</h3>
          <div class="jym-flow-list">
            <div class="jym-flow-step"><i></i><span>Abrir Excel y revisar registro por registro</span></div>
            <div class="jym-flow-step"><i></i><span>Consultar información en distintas fuentes</span></div>
            <div class="jym-flow-step"><i></i><span>Copiar resultados y marcar observaciones</span></div>
            <div class="jym-flow-step"><i></i><span>Consolidar y preparar el reporte final</span></div>
          </div>
        </article>
        <div class="jym-flow-center" aria-hidden="true">
          <div class="jym-automation-core">JYM</div>
          <span>AUTOMATION<br>ENGINE</span>
        </div>
        <article class="jym-flow-card after">
          <small>DESPUÉS</small>
          <h3>Flujo automatizado</h3>
          <div class="jym-flow-list">
            <div class="jym-flow-step"><i></i><span>El sistema recibe el archivo</span></div>
            <div class="jym-flow-step"><i></i><span>Aplica reglas, consultas y validaciones</span></div>
            <div class="jym-flow-step"><i></i><span>Separa válidos, alertas y errores</span></div>
            <div class="jym-flow-step"><i></i><span>Entrega reporte y evidencia para revisión humana</span></div>
          </div>
        </article>
        <div class="jym-transformation-result">
          <div class="jym-result-chip"><b>Menos trabajo repetitivo</b><span>La persona revisa excepciones, no todo el volumen.</span></div>
          <div class="jym-result-chip"><b>Más trazabilidad</b><span>Errores y resultados quedan organizados.</span></div>
          <div class="jym-result-chip"><b>Control humano</b><span>Las decisiones sensibles siguen en manos del equipo.</span></div>
        </div>
      </div>
    </section>`;

  const PROJECTS = [
    { key:'spa', title:'Spa', tag:'Bienestar', a:'/assets/arquitectura/spa.webp', b:'/assets/arquitectura/spa6.webp', text:'Compara dos vistas del mismo concepto y observa cómo cambian iluminación, composición y experiencia del espacio.' },
    { key:'barberia', title:'Barbería', tag:'Diseño comercial', a:'/assets/arquitectura/barber.webp', b:'/assets/arquitectura/barber5.webp', text:'Explora distintas decisiones visuales dentro de una propuesta comercial orientada a atención y marca.' },
    { key:'estilismo', title:'Estilismo', tag:'Belleza profesional', a:'/assets/arquitectura/estilismo.webp', b:'/assets/arquitectura/estilismo4.webp', text:'Compara ángulos y tratamiento visual de un espacio diseñado para atención, circulación y presencia de marca.' },
  ];

  const ARCH_HTML = `
    <section class="jym-experience-block jym-arch-story" id="comparador-arquitectura">
      <div class="jym-experience-heading">
        <small>EXPLORA EL PROYECTO</small>
        <h2>No mires una sola imagen. Compara el espacio.</h2>
        <p>Usamos material real del portafolio JYM. Arrastra el control para comparar dos vistas del proyecto seleccionado.</p>
      </div>
      <div class="jym-project-compare">
        <div class="jym-compare-stage" style="--split:50%">
          <img class="jym-compare-base" src="${PROJECTS[0].b}" alt="${PROJECTS[0].title} vista B" />
          <img class="jym-compare-top" src="${PROJECTS[0].a}" alt="${PROJECTS[0].title} vista A" />
          <span class="jym-compare-label left">VISTA A</span><span class="jym-compare-label right">VISTA B</span>
          <div class="jym-compare-divider"></div>
          <input class="jym-compare-range" type="range" min="0" max="100" value="50" aria-label="Comparar dos vistas del proyecto" />
        </div>
        <aside class="jym-project-panel">
          <small>PORTAFOLIO JYM</small>
          <h3>${PROJECTS[0].title}</h3>
          <p>${PROJECTS[0].text}</p>
          <div class="jym-project-tabs">
            ${PROJECTS.map((p,i)=>`<button type="button" data-project="${p.key}" class="${i===0?'active':''}"><b>${p.title}</b><span>${p.tag}</span></button>`).join('')}
          </div>
        </aside>
      </div>
    </section>`;

  const TRUST_HTML = `
    <section class="jym-trust" aria-label="Por qué trabajar con JYM">
      <div class="jym-trust-grid">
        <article><strong>01</strong><b>Soluciones a medida</b><p>Partimos del problema real y no de una plantilla genérica.</p></article>
        <article><strong>02</strong><b>Control humano</b><p>Automatizamos y diseñamos sin perder supervisión en decisiones importantes.</p></article>
        <article><strong>03</strong><b>Evidencia del trabajo</b><p>Mostramos procesos, proyectos y resultados de forma visual.</p></article>
        <article><strong>04</strong><b>Dos especialidades</b><p>Tecnología y arquitectura bajo una misma identidad de trabajo.</p></article>
      </div>
    </section>`;

  const contextHints = {
    tech: {
      home:'Puedo mostrarte cómo convertimos tareas repetitivas en flujos automáticos.',
      solutions:'Busca una tarea que hoy dependa demasiado de copiar, revisar o repetir.',
      demos:'Prueba las demos: la idea es que veas el flujo, no solo que te lo contemos.',
      process:'Aquí ves cómo pasamos del diagnóstico a una solución controlada.',
      contact:'Cuéntanos tu proceso y podemos evaluar por dónde empezar.'
    },
    arch: {
      home:'Puedo acompañarte por proyectos, servicios y proceso de trabajo.',
      projects:'Usa el showroom y el comparador para revisar distintas vistas de nuestros proyectos.',
      services:'Aquí puedes identificar el tipo de intervención que necesitas.',
      process:'Este recorrido explica cómo pasamos de idea a diseño y ejecución.',
      contact:'Cuéntanos el tipo de espacio y en qué etapa estás para orientar la cotización.'
    }
  };

  const mountExperience = () => {
    const current = mode();
    document.querySelectorAll('.jym-experience-block,.jym-trust').forEach(node => node.remove());
    if (current !== 'tech' && current !== 'arch') return;

    const showroom = document.getElementById('showroom');
    if (showroom) showroom.insertAdjacentHTML('afterend', current === 'tech' ? TECH_HTML : ARCH_HTML);

    const contact = document.getElementById('contacto');
    if (contact) contact.insertAdjacentHTML('beforebegin', TRUST_HTML);

    bindInteractions();
    ensureContextHint();
  };

  const bindInteractions = () => {
    const stage = qs('.jym-compare-stage');
    const range = qs('.jym-compare-range');
    if (stage && range) {
      range.addEventListener('input', () => stage.style.setProperty('--split', `${range.value}%`));
    }

    const panel = qs('.jym-project-panel');
    qsa('.jym-project-tabs button').forEach(btn => btn.addEventListener('click', () => {
      const project = PROJECTS.find(p => p.key === btn.dataset.project);
      if (!project || !stage || !panel) return;
      qsa('.jym-project-tabs button').forEach(b => b.classList.toggle('active', b === btn));
      const base = qs('.jym-compare-base');
      const top = qs('.jym-compare-top');
      base.src = project.b; base.alt = `${project.title} vista B`;
      top.src = project.a; top.alt = `${project.title} vista A`;
      qs('h3', panel).textContent = project.title;
      qs('p', panel).textContent = project.text;
      stage.style.setProperty('--split','50%');
      if (range) range.value = '50';
    }));
  };

  const ensureContextHint = () => {
    const current = mode();
    const companion = qs(`.companion-system.companion-${current}`);
    if (!companion) return;
    let hint = qs('.jym-context-hint', companion);
    if (!hint) {
      hint = document.createElement('div');
      hint.className = 'jym-context-hint';
      companion.appendChild(hint);
    }
    const chapter = companion.dataset.jymChapter || 'home';
    hint.textContent = contextHints[current]?.[chapter] || '';
  };

  let lastMode = '';
  let lastChapter = '';
  const sync = () => {
    const current = mode() || '';
    const companion = current ? qs(`.companion-system.companion-${current}`) : null;
    const chapter = companion?.dataset.jymChapter || '';
    if (current !== lastMode) {
      lastMode = current;
      mountExperience();
    }
    if (chapter !== lastChapter) {
      lastChapter = chapter;
      ensureContextHint();
    }
  };

  document.addEventListener('DOMContentLoaded', sync);
  window.addEventListener('load', sync);
  const observer = new MutationObserver(() => requestAnimationFrame(sync));
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['data-mode','data-jym-chapter','class']});
})();
