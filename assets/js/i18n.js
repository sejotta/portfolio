/* =========================================================
   i18n — ES / EN / ZH
   Traducciones por selector. El español es el HTML original:
   se captura al cargar y se restaura al volver a ES.
   ========================================================= */

const LANGS = ['es', 'en', 'zh'];
const STORAGE_KEY = 'st-lang';
const ico = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const cta = (label) => `${label} ${ico('arrow-up-right')}`;

const projectBody = ({ no, tag, year, title, summary, tags, label, tagsLabel = 'Technologies' }) => `
<div class="project__meta mono"><span>${no}${tag ? ` / ${tag}` : ''}</span><span>${year}</span></div>
<h3 class="project__title"><button class="project__open" type="button" aria-haspopup="dialog">${title}</button></h3>
<p class="project__summary">${summary}</p>
<ul class="tags" aria-label="${tagsLabel}">${tags.map((t) => `<li>${t}</li>`).join('')}</ul>
<span class="project__cta">${cta(label)}</span>`;

const timelineItem = (year, tag, title, text) => `
<article class="tl reveal is-in">
  <div class="tl__when"><span class="tl__year">${year}</span><span class="tl__dot" aria-hidden="true"></span></div>
  <div class="tl__body">
    <p class="mono tl__tag">${tag}</p>
    <h3>${title}</h3>
    <p>${text}</p>
  </div>
</article>`;

const faqItem = (q, a) => `
<details class="faq__item">
  <summary>${q}<span class="faq__icon" aria-hidden="true"></span></summary>
  <p>${a}</p>
</details>`;

const capList = (items) => items
  .map(([n, h, p]) => `<li><span class="cap-list__num">${n}</span><div><h4>${h}</h4><p>${p}</p></div></li>`)
  .join('');

const ui = {
  es: { language: 'Idioma' },
  en: { language: 'Language' },
  zh: { language: '语言' },
};

const messages = {
  es: {
    'toast.copied': 'Email copiado',
    'toast.quiet': 'Chispa está en modo tranquilo',
    'form.opening': 'Abriendo tu cliente de correo…',
    'form.subject': 'Hola Sergio',
    'form.idea': 'una idea',
    'project.fallback': 'Ficha de proyecto',
    'project.repo': 'Míralo en GitHub',
  },
  en: {
    'toast.copied': 'Email copied',
    'toast.quiet': 'Chispa is in quiet mode',
    'form.opening': 'Opening your email client…',
    'form.subject': 'Hello Sergio',
    'form.idea': 'an idea',
    'project.fallback': 'Project sheet',
    'project.repo': 'View on GitHub',
  },
  zh: {
    'toast.copied': '邮箱已复制',
    'toast.quiet': 'Chispa 现在很安静',
    'form.opening': '正在打开你的邮件客户端…',
    'form.subject': '你好 Sergio',
    'form.idea': '一个想法',
    'project.fallback': '项目详情',
    'project.repo': '在 GitHub 上查看',
  },
};

const translations = {
  en: {
    meta: {
      title: 'Sergio Toro Codo — Your bridge between China and the world',
      description: 'Sourcing in China with technical judgement and a business mindset. Founder of ZCH Sourcing. Electronics engineer, robotics and product projects, a bridge between China and the world.',
      ogTitle: 'Your bridge between China and the world — Sergio Toro Codo',
      ogDescription: 'Engineering, business and China. A bridge between China and the world.',
      ogLocale: 'en_GB',
    },
    html: {
      '.skip-link': 'Skip to content',
      '.brand__name small': 'Sourcing · China / World',
      '.nav__links a:nth-child(1)': 'About me',
      '.nav__links a:nth-child(2)': 'Projects',
      '.nav__links a:nth-child(3)': 'Capabilities',
      '.nav__links a:nth-child(4)': 'Journey',
      '.nav__links a:nth-child(5)': 'Contact',
      '.nav__cv': `Technical CV ${ico('arrow-up-right')}`,
      '.nav__cta': `Let's talk ${ico('arrow-up-right')}`,
      '.menu__head > .mono': 'Menu / ST',
      '.menu__nav a:nth-child(1)': '<span>01</span> About me',
      '.menu__nav a:nth-child(2)': '<span>02</span> Current projects',
      '.menu__nav a:nth-child(3)': '<span>03</span> Previous projects',
      '.menu__nav a:nth-child(4)': '<span>04</span> Capabilities',
      '.menu__nav a:nth-child(5)': '<span>05</span> Journey',
      '.menu__nav a:nth-child(6)': '<span>06</span> Contact',
      '.menu__nav a:nth-child(7)': '<span>07</span> Technical CV',
      '.menu__lang > .mono': 'Language',
      '#menu-web-cv': `View technical CV ${ico('arrow-up-right')}`,
      '#menu-download-cv': `Download technical CV ${ico('download')}`,
      '#menu-back': 'Back to portfolio',
      '#footer-cv': `Technical CV ${ico('arrow-up-right')}`,
      '#footer-portfolio': 'Portfolio',
      '#footer-top': `Back to top ${ico('arrow-up')}`,
      '.footer__grid > div:nth-child(1) .footer__label': 'Contact',
      '.footer__grid > div:nth-child(2) .footer__label': 'Location',
      '.footer__grid > div:nth-child(3) .footer__label': 'Navigation',
      '.footer__grid > div:nth-child(4) .footer__label': 'Accessibility',
      '#motion-toggle': 'Reduce motion',
      '.footer__bottom span:nth-child(3)': 'No cookies, no trackers.',
      'body:not(.cv-page) .footer__bottom span:nth-child(2)': 'ZCH Sourcing · launching soon',
      'body:not(.cv-page) .footer__bottom span:nth-child(4)': 'Sourcing · China / World',
      '.cv-page .footer__bottom span:nth-child(4)': 'Technical CV · 2026',
      '.cv-lang-note': 'Technical CV · English document · business/sourcing version in preparation.',

      '.hero-kicker': '<span class="dot" aria-hidden="true"></span> Sergio Toro Codo <span class="kicker__sep">/</span> Sourcing · Engineering · China',
      '.hero__title .line:nth-child(1) > span': 'Your bridge',
      '.hero__title .line:nth-child(2) > span': 'between China',
      '.hero__title .line:nth-child(3) > span': 'and the <em>world.</em>',
      '.hero__lede': 'Engineer by training and founder of ZCH Sourcing. I help companies find, evaluate and develop suppliers in China with technical judgement and a business mindset. China and the world, with Spain as the starting point.',
      '.hero__actions .btn:nth-child(1)': `Let's talk about your project ${ico('arrow-up-right')}`,
      '.hero__actions .btn:nth-child(2)': `See current projects ${ico('arrow-down')}`,
      '.scroll-cue .mono': 'See my approach',
      '.panel__status-text': 'Launching soon',
      '.panel__foot span:nth-child(1)': 'China → World',
      '.panel__foot span:nth-child(2)': 'Engineering + business',
      '.panel__chispa-label': 'Chispa / sourcing assistant',
      '.panel__chispa-btn': 'Say hi to Chispa',

      '.about .label': '<span class="label__num">01</span> About me',
      '.about .section-title': 'Engineering<br>and <em>business.</em>',
      '.about__text': `
        <p class="lead reveal is-in">I'm Sergio Toro Codo. An electronics engineer by training, with my focus on business. I work where engineering, people and the market meet.</p>
        <p class="reveal is-in">I studied Electronics and Automation Engineering at the University of Zaragoza (EINA) and I'm on an exchange in Mechanical Engineering at <strong>Nanjing Tech University</strong> (China). That technical base lets me read a drawing, question a BOM and understand where the cost is. My experience in China is teaching me how things are made, negotiated and how trust is built.</p>
        <p class="reveal is-in">I've worked in R&amp;D at <strong>Escribano Mechanical &amp; Engineering</strong> (EM&amp;E / AUNAV), on the board of <strong>IEEE SB UZ</strong> and in the workshop supporting students. I'm now building <strong>ZCH Sourcing</strong>, a sourcing company in China, and <strong>RockMap</strong>, a travel planning app. I care about leadership, teamwork and the relationships that make a project happen.</p>
        <dl class="facts reveal is-in">
          <div><dt>Where</dt><dd>Nanjing, CN / Zaragoza, ES<br><span>China · current</span></dd></div>
          <div><dt>Focus</dt><dd>Sourcing and supplier development<br><span>ZCH Sourcing · launching soon</span></dd></div>
          <div><dt>Education</dt><dd>Electronic &amp; Automation Eng.<br><span>EINA · Nanjing Tech</span></dd></div>
          <div><dt>Languages</dt><dd>Spanish · English B2 · Chinese HSK 2<br><span>Cross-cultural communication</span></dd></div>
        </dl>`,
      '.stats .stat:nth-child(1) .stat__label': 'Current projects',
      '.stats .stat:nth-child(2) .stat__label': 'Engineering projects',
      '.stats .stat:nth-child(3) .stat__label': 'Languages',
      '.stats .stat:nth-child(4) .stat__label': 'Countries',

      '.current .label': '<span class="label__num">02</span> Current projects',
      '.current .section-title': "What I'm<br><em>building.</em>",
      '.current .section-intro': 'Two projects setting the direction: a sourcing company in China and a travel planning app. Both start from the same idea: understand the problem before selling the solution.',
      '[data-project="zch"] .project__body': projectBody({
        no: '01', tag: 'Company', year: '2026 —', label: 'View project', tagsLabel: 'Areas',
        title: 'ZCH Sourcing',
        summary: 'Sourcing in China for companies that want to produce better. Supplier search and evaluation, technical judgement and negotiation with a business eye.',
        tags: ['Sourcing', 'China', 'Suppliers', 'Business'],
      }),
      '[data-project="zch"] .project__more': `
        <dl class="project__facts">
          <div><dt>Role</dt><dd>Founder · ZCH Sourcing</dd></div>
          <div><dt>Focus</dt><dd>Sourcing · supplier development · negotiation</dd></div>
          <div><dt>Status</dt><dd>Launching soon · website in preparation</dd></div>
        </dl>
        <div class="prose">
          <p>ZCH Sourcing starts from a simple idea: sourcing does not begin with a price, it begins with understanding what is being bought, how it is made and what risk is being taken. The company connects businesses with suppliers in China and brings technical judgement to a conversation that too often stays in the spreadsheet.</p>
          <ul>
            <li>Supplier scouting and evaluation in China.</li>
            <li>A bridge between engineering, quality and negotiation.</li>
            <li>Website and services in preparation.</li>
          </ul>
        </div>
        <p class="project__note">While the website is in preparation, write to me at <a href="mailto:storocodo@gmail.com">storocodo@gmail.com</a>.</p>`,
      '[data-project="rockmap"] .project__body': projectBody({
        no: '02', tag: 'Product', year: '2026 —', label: 'View project', tagsLabel: 'Areas',
        title: 'RockMap',
        summary: 'An app to plan trips: routes, stages and decisions in one place. Digital product in development.',
        tags: ['Product', 'Travel', 'UX', 'App'],
      }),
      '[data-project="rockmap"] .project__more': `
        <dl class="project__facts">
          <div><dt>Role</dt><dd>Product and development</dd></div>
          <div><dt>Focus</dt><dd>Travel planning · user experience</dd></div>
          <div><dt>Status</dt><dd>In development</dd></div>
        </dl>
        <div class="prose">
          <p>RockMap is a travel planning app: a place to organise routes, stages and decisions before setting off. The project explores the product side — what someone needs when planning a trip — and the technical side of turning that idea into a simple tool.</p>
          <ul>
            <li>Route and stage structure.</li>
            <li>A simple experience for organising a trip.</li>
            <li>Digital product in development.</li>
          </ul>
        </div>
        <p class="project__note">In development; more details soon.</p>`,

      '.work .label': '<span class="label__num">03</span> Previous projects',
      '.work .section-title': 'My most technical<br><em>projects.</em>',
      '[data-project="jrg25"] .project__body': projectBody({
        no: '01', tag: 'Robotics', year: '2026', label: 'View project',
        title: 'JRG-25 · autonomous mobile robot',
        summary: 'Autonomous mobile robot for the ASTI Robotics Challenge (ARC 2026). Mechanics, custom PCB, C++ firmware and PID control; finalist and EINA-Proyecta award with Team Mesa Paso 43.',
        tags: ['Mobile robotics', 'PCB', 'ESP32', 'PID'],
      }),
      '[data-project="jrg25"] .project__more': `
        <dl class="project__facts">
          <div><dt>Role</dt><dd>Mechanical design, electronics and firmware · Team Mesa Paso 43 (IEEE SB UZ)</dd></div>
          <div><dt>Stack</dt><dd>SolidWorks / Fusion 360 · KiCad · ESP32 · C++ · PID · ESP-NOW</dd></div>
          <div><dt>Status</dt><dd>ARC 2026 finalist · EINA-Proyecta award</dd></div>
        </dl>
        <div class="prose">
          <p><strong>JRG-25</strong> is an autonomous mobile robot built for the <em>ASTI Robotics Challenge (ARC 2026)</em> with Team Mesa Paso 43. It integrates ToF sensors, an IMU and encoders, differential odometry, PID control with anti-windup, state machines and a layered firmware architecture with CI.</p>
          <ul>
            <li>Mechanical design in SolidWorks/Fusion 360 and 3D printing.</li>
            <li>Custom KiCad PCB with I²C multiplexing and ESP32.</li>
            <li>PID control with anti-windup, odometry and FSM; ESP-NOW and Bluetooth.</li>
          </ul>
        </div>
        <p class="project__note">ARC 2026 finalist and winner of the EINA-Proyecta award (Electronics &amp; Automation category).</p>`,
      '[data-project="agroplant"] .project__body': projectBody({
        no: '02', year: '2025', label: 'View project',
        title: 'AGROPLANT',
        summary: 'A hybrid physical-digital game for learning about farming: ESP32 soil sensor, RFID cards and open data.',
        tags: ['ESP32', 'RFID', 'Wi-Fi', 'Open Data'],
      }),
      '[data-project="agroplant"] .project__more': `
        <dl class="project__facts">
          <div><dt>Role</dt><dd>Hardware and software · NASA Space Apps 2025</dd></div>
          <div><dt>Stack</dt><dd>ESP32 · RFID · Wi-Fi · open data</dd></div>
          <div><dt>Status</dt><dd>NASA Space Apps 2025 hackathon</dd></div>
        </dl>
        <div class="prose">
          <p>AGROPLANT turns a pot or a plot into a game: soil sensors and RFID cards connect the physical world to a digital layer that sets challenges and explains the crop's state with open scientific data.</p>
          <ul>
            <li>ESP32 + RFID integration to identify plants and actions.</li>
            <li>Wi-Fi communication and physical-digital experience design.</li>
            <li>Open datasets used to ground the recommendations.</li>
          </ul>
        </div>
        <p class="project__note">Team project for the NASA Space Apps Challenge 2025.</p>`,
      '[data-project="spit"] .project__body': projectBody({
        no: '03', year: '2026', label: 'View project',
        title: 'S.P.I.T.',
        summary: 'Early wildfire prevention: drones with RGB/thermal cameras, on-board TinyML and a PLC-controlled wet firebreak.',
        tags: ['KiCad', 'PLC', 'TinyML', 'UAV'],
      }),
      '[data-project="spit"] .project__more': `
        <dl class="project__facts">
          <div><dt>Role</dt><dd>Electronics and control · Team InnoviZar</dd></div>
          <div><dt>Stack</dt><dd>KiCad · PLC · TinyML · UAV · 4–20 mA sensors</dd></div>
          <div><dt>Status</dt><dd>WED 2026 hackathon (EINA)</dd></div>
        </dl>
        <div class="prose">
          <p>S.P.I.T. combines drone surveillance (RGB + thermal camera), on-board TinyML inference and an action phase: sprinklers deploy EcoFire to slow the fire. My part: electronics, 4–20 mA flowmeter and pressure sensor reading, pump control and hydraulic sizing.</p>
          <ul>
            <li>Custom KiCad PCB for the control cabin.</li>
            <li>Progressive-cavity pump control and 4–20 mA loops.</li>
            <li>Sensor integration and action protocol with the PLC.</li>
          </ul>
        </div>
        <p class="project__note">Team InnoviZar project presented at the EINA WED 2026 hackathon.</p>`,
      '[data-project="chispa"] .project__body': projectBody({
        no: '04', tag: 'Personal project', year: '2026', label: 'View project',
        title: 'Chispa — interactive 3D robot',
        summary: 'A personal web and 3D experiment: a character that follows the cursor, blinks and reacts. Three.js, canvas and procedural animation.',
        tags: ['Three.js', 'WebGL', 'JS', '3D'],
      }),
      '[data-project="chispa"] .project__more': `
        <dl class="project__facts">
          <div><dt>Role</dt><dd>Concept, 3D integration and front-end</dd></div>
          <div><dt>Stack</dt><dd>Three.js · WebGL · JavaScript · CSS</dd></div>
          <div><dt>Status</dt><dd>Personal project</dd></div>
        </dl>
        <div class="prose">
          <p>Chispa is a web and 3D experiment: an orange robot with a screen, pixel eyes and a leaf that moves on its own. The face is drawn on a canvas and the body is 3D geometry with procedural animation.</p>
          <ul>
            <li>Pixel eyes that follow the cursor and blink.</li>
            <li>Springy leaf, waving arms and click reactions.</li>
            <li>A prototype for web interaction and character design.</li>
          </ul>
        </div>
        <p class="project__note">A personal exploration between design, web and 3D.</p>`,

      '.capabilities .label': '<span class="label__num">04</span> Capabilities',
      '.capabilities .section-title': 'Business, people<br>and technical <em>depth.</em>',
      '.cap-panel--primary .cap-panel__label': '01 / Business & people',
      '.cap-panel--primary h3': 'What I bring<br>to the table.',
      '.cap-panel--primary .cap-list': capList([
        ['01', 'Sourcing & supplier development', 'Supplier search, evaluation and follow-up in China.'],
        ['02', 'Negotiation & cross-cultural communication', 'Spain and China; native Spanish, English B2 and Chinese HSK 2 in progress.'],
        ['03', 'Leadership & teams', 'IEEE SB UZ board, mentoring at the ASTI Robotics Challenge and multidisciplinary teams.'],
        ['04', 'Project management', 'From idea to prototype: scope, priorities, budget and delivery.'],
        ['05', 'Communication & trust', 'Explaining the technical to decision-makers and the commercial to builders.'],
        ['06', 'Network', 'Spain and China: university, IEEE, industry and the startup community.'],
      ]),
      '.cap-panel--secondary .cap-panel__label': '02 / Technical depth',
      '.cap-panel--secondary h3': 'The base that<br>lets me understand.',
      '.cap-panel--secondary .cap-list': capList([
        ['01', 'Electronics & PCB', 'KiCad, Altium, sensors, power.'],
        ['02', 'Firmware & control', 'ESP32, C/C++, PID, wireless communication.'],
        ['03', 'Design & fabrication', 'SolidWorks, Fusion 360, 3D printing.'],
        ['04', 'Data & vision', 'Python, OpenCV, PyTorch.'],
        ['05', 'Web product', 'HTML, CSS, JavaScript, Three.js.'],
        ['06', 'Industrial', 'PLC, 4–20 mA, Modbus.'],
        ['07', 'Tools', 'Linux, Git, MATLAB, SQL.'],
      ]),
      '.cap-panel__note': "I can read a drawing, question a BOM and see where the cost is. That's why I negotiate with context, not just price.",

      '.path .label': '<span class="label__num">05</span> Journey',
      '.path .section-title': 'From engineering<br>to <em>sourcing.</em>',
      '.timeline': [
        timelineItem('2026—', 'Entrepreneurship · China / Spain', 'Founder — ZCH Sourcing', 'ZCH Sourcing is born: sourcing in China with technical judgement and a business mindset. Website and services in preparation.'),
        timelineItem('2026—', 'Product · RockMap', 'RockMap', 'Travel planning app in development: routes, stages and decisions in one place.'),
        timelineItem('2026—27', 'Education · China', 'Exchange in Mechanical Engineering', 'Nanjing Tech University, China. A one-year exchange with a merit scholarship, language, culture and how business is done.'),
        timelineItem('2026—', 'IEEE SB-UZ', 'Board Member — Electronic Rocketry &amp; Robotics', 'Leadership and mentoring in the electronic rocketry and robotics section: project coordination, data acquisition and student support.'),
        timelineItem('2025', 'Internship · R&amp;D', 'R&amp;D Electronic Engineer', 'Escribano Mechanical &amp; Engineering (EM&amp;E / AUNAV), Binéfar. PCB design in Altium, validation of robotic systems and work inside an industrial R&amp;D team.'),
        timelineItem('2024—26', 'IEEE SB-UZ', 'Student Member &amp; Vocal', 'Marketing and communications for the student branch: outreach, partner relations and event organisation.'),
        timelineItem('2024—', 'Workshop · Agenda 2030', 'Repair Café &amp; Workshop', 'Electronics repair workshops for students at EINA: hands-on teaching, communication and knowledge transfer.'),
        timelineItem('2022—27', 'Education', 'B.Sc. Electronic and Automation Engineering', 'University of Zaragoza, EINA. Robotics, control, electronics, automation and programming; the technical base I now put to work for business.'),
      ].join(''),
      '.awards': `
        <p class="label label--stacked">Technical recognition</p>
        <ol class="awards__list">
          <li><span class="awards__num mono">01</span><div><strong>Winner — 1st Prize · Best Performance Award</strong><p>JRG-26 · 10th ASTI Robotics Challenge (ARC 2026)</p></div></li>
          <li><span class="awards__num mono">02</span><div><strong>Participant — NASA Space Apps</strong><p>2025</p></div></li>
          <li><span class="awards__num mono">03</span><div><strong>Participant — WED Hackathon</strong><p>EINA · 2026</p></div></li>
        </ol>
        <a class="link-arrow" href="./cv.html">View technical CV ${ico('arrow-up-right')}</a>
        <p class="awards__note">“Technique is also proven by executing. These awards are the base, not the destination.”</p>`,

      '.contact .label': '<span class="label__num">06</span> Contact',
      '.contact__title': 'Your next<br><em>step.</em>',
      '.contact__lede': "Looking for a supplier in China, developing a product or shaping an idea? Write to me. I'll reply personally.",
      '.contact__links a:nth-child(1)': `Write an email ${ico('arrow-up-right')}`,
      '.contact__links a:nth-child(2)': `See ZCH Sourcing ${ico('arrow-up-right')}`,
      '.contact__links a:nth-child(3)': `Download technical CV ${ico('download')}`,
      'label[for="f-name"]': 'Your name',
      'label[for="f-email"]': 'Your email',
      'label[for="f-msg"]': 'What are you working on?',
      '.form__foot .btn': `Open my email ${ico('arrow-up-right')}`,
      '.form__note': 'Your email client will open with the message written. Nothing is sent to any server.',
      '.faq': `
        <div class="faq__head">
          <p class="label label--stacked">FAQ</p>
          <p class="faq__hint mono">Before you write, just in case</p>
        </div>
        <div class="faq__grid">
          ${faqItem('What is ZCH Sourcing?', 'A sourcing company in China in preparation. It exists to connect companies with suppliers and opportunities, with technical judgement and a business mindset.')}
          ${faqItem('What can you do for my company?', "Sourcing of products and components, supplier search and evaluation, offer comparison and support in negotiation. If the project fits, I'll tell you how I'd approach it.")}
          ${faqItem('Why an engineer for sourcing?', 'Because understanding the process, the material and the tolerance changes the conversation with a supplier. Price matters; real cost matters more.')}
          ${faqItem('Where are you and what languages do you work in?', 'Based in Nanjing, with roots in Zaragoza. I work with China and the world in Spanish, English and Chinese (HSK 2, in progress).')}
          ${faqItem('How do we start?', "Write to me with what you need: product, volume, timeline or the first idea. We'll see if it fits and how I can help.")}
        </div>`,
    },
    attrs: {
      '.hero__panel': { 'aria-label': 'ZCH Sourcing: supplier network between China and the world' },
      '.hero__scene': { 'aria-label': 'Chispa hopping between two containers' },
      '#mascot-canvas': { 'aria-label': 'Chispa, the orange robot from ZCH Sourcing, hops between two containers' },
      '.nav__links': { 'aria-label': 'Main navigation' },
      '.menu__nav': { 'aria-label': 'Mobile menu' },
      '#menu-toggle': { 'aria-label': 'Open menu' },
      '#menu-close': { 'aria-label': 'Close menu' },
      '.portrait img': { alt: 'Portrait of Sergio Toro Codo' },
      '.scroll-cue': { 'aria-label': 'Scroll to about me' },
      '.stats': { 'aria-label': 'Quick facts' },
      '#copy-email': { 'aria-label': 'Copy email address' },
      '#modal-close': { 'aria-label': 'Close project sheet' },
      '#f-name': { placeholder: 'Ada Lovelace' },
      '#f-email': { placeholder: 'ada@example.com' },
      '#f-msg': { placeholder: 'Supplier, product, sourcing...' },
    },
  },

  zh: {
    meta: {
      title: 'Sergio Toro Codo — 连接中国与世界的桥梁',
      description: '以工程判断和商业思维在中国做采购。ZCH Sourcing 创始人。电子工程师，机器人及产品项目，连接中国与世界。',
      ogTitle: '连接中国与世界的桥梁 — Sergio Toro Codo',
      ogDescription: '工程、商业与中国。连接中国与世界的桥梁。',
      ogLocale: 'zh_CN',
    },
    html: {
      '.skip-link': '跳到内容',
      '.brand__name small': '采购 · 中国 / 世界',
      '.nav__links a:nth-child(1)': '关于我',
      '.nav__links a:nth-child(2)': '项目',
      '.nav__links a:nth-child(3)': '能力',
      '.nav__links a:nth-child(4)': '经历',
      '.nav__links a:nth-child(5)': '联系',
      '.nav__cv': `技术简历 ${ico('arrow-up-right')}`,
      '.nav__cta': `聊聊 ${ico('arrow-up-right')}`,
      '.menu__head > .mono': '菜单 / ST',
      '.menu__nav a:nth-child(1)': '<span>01</span> 关于我',
      '.menu__nav a:nth-child(2)': '<span>02</span> 当前项目',
      '.menu__nav a:nth-child(3)': '<span>03</span> 以往项目',
      '.menu__nav a:nth-child(4)': '<span>04</span> 能力',
      '.menu__nav a:nth-child(5)': '<span>05</span> 经历',
      '.menu__nav a:nth-child(6)': '<span>06</span> 联系',
      '.menu__nav a:nth-child(7)': '<span>07</span> 技术简历',
      '.menu__lang > .mono': '语言',
      '#menu-web-cv': `查看技术简历 ${ico('arrow-up-right')}`,
      '#menu-download-cv': `下载技术简历 ${ico('download')}`,
      '#menu-back': '返回作品集',
      '#footer-cv': `技术简历 ${ico('arrow-up-right')}`,
      '#footer-portfolio': '作品集',
      '#footer-top': `回到顶部 ${ico('arrow-up')}`,
      '.footer__grid > div:nth-child(1) .footer__label': '联系',
      '.footer__grid > div:nth-child(2) .footer__label': '位置',
      '.footer__grid > div:nth-child(3) .footer__label': '导航',
      '.footer__grid > div:nth-child(4) .footer__label': '无障碍',
      '#motion-toggle': '减少动效',
      '.footer__bottom span:nth-child(3)': '无 Cookie，无追踪。',
      'body:not(.cv-page) .footer__bottom span:nth-child(2)': 'ZCH Sourcing · 筹备中',
      'body:not(.cv-page) .footer__bottom span:nth-child(4)': '采购 · 中国 / 世界',
      '.cv-page .footer__bottom span:nth-child(4)': '技术简历 · 2026',
      '.cv-lang-note': '技术简历 · 英文文档 · 商业/采购版本正在准备中。',

      '.hero-kicker': '<span class="dot" aria-hidden="true"></span> Sergio Toro Codo <span class="kicker__sep">/</span> 采购 · 工程 · 中国',
      '.hero__title .line:nth-child(1) > span': '你的',
      '.hero__title .line:nth-child(2) > span': '中国与世界',
      '.hero__title .line:nth-child(3) > span': '之间的<em>桥梁。</em>',
      '.hero__lede': '工程出身，ZCH Sourcing 创始人。我帮助企业在华寻找、评估和发展供应商，用工程判断和商业思维，以西班牙为起点，连接中国与世界。',
      '.hero__actions .btn:nth-child(1)': `聊聊你的项目 ${ico('arrow-up-right')}`,
      '.hero__actions .btn:nth-child(2)': `查看当前项目 ${ico('arrow-down')}`,
      '.scroll-cue .mono': '了解我的方式',
      '.panel__status-text': '筹备中',
      '.panel__foot span:nth-child(1)': '中国 → 世界',
      '.panel__foot span:nth-child(2)': '工程 + 商业',
      '.panel__chispa-label': 'Chispa / 采购助手',
      '.panel__chispa-btn': '跟 Chispa 打招呼',

      '.about .label': '<span class="label__num">01</span> 关于我',
      '.about .section-title': '工程<br>与<em>商业。</em>',
      '.about__text': `
        <p class="lead reveal is-in">我是 Sergio Toro Codo。工程出身，把重心放在商业。我在技术、人和市场的交汇处工作。</p>
        <p class="reveal is-in">我在萨拉戈萨大学（EINA）学习电子与自动化工程，现在在<strong>南京工业大学</strong>交换，读机械工程。工程背景让我能读懂图纸、质疑 BOM，并判断成本在哪里。在中国的经历让我理解产品如何制造、如何谈判，以及信任如何建立。</p>
        <p class="reveal is-in">我曾在 <strong>Escribano Mechanical &amp; Engineering</strong>（EM&amp;E / AUNAV）做研发，在 <strong>IEEE SB UZ</strong> 理事会工作，也在工坊里帮助学生。现在我正在创建 <strong>ZCH Sourcing</strong>——一家在中国的采购公司，以及 <strong>RockMap</strong>——一款旅行规划应用。我关心领导力、团队合作，以及让项目真正落地的关系。</p>
        <dl class="facts reveal is-in">
          <div><dt>在哪里</dt><dd>中国南京 / 西班牙萨拉戈萨<br><span>中国 · 当前</span></dd></div>
          <div><dt>重点</dt><dd>采购与供应商开发<br><span>ZCH Sourcing · 筹备中</span></dd></div>
          <div><dt>教育</dt><dd>电子与自动化工程<br><span>EINA · 南京工业大学</span></dd></div>
          <div><dt>语言</dt><dd>西班牙语 · 英语 B2 · 中文 HSK 2<br><span>跨文化沟通</span></dd></div>
        </dl>`,
      '.stats .stat:nth-child(1) .stat__label': '当前项目',
      '.stats .stat:nth-child(2) .stat__label': '工程项目',
      '.stats .stat:nth-child(3) .stat__label': '语言',
      '.stats .stat:nth-child(4) .stat__label': '国家',

      '.current .label': '<span class="label__num">02</span> 当前项目',
      '.current .section-title': '我正在<br><em>做的事。</em>',
      '.current .section-intro': '两个项目，两个方向：一家在中国的采购公司，一款旅行规划应用。它们都始于同一个想法：先理解问题，再给出方案。',
      '[data-project="zch"] .project__body': projectBody({
        no: '01', tag: '公司', year: '2026 —', label: '查看项目', tagsLabel: '领域',
        title: 'ZCH Sourcing',
        summary: '为中国采购：帮助企业找到并评估供应商，用工程判断和商业视角参与谈判。',
        tags: ['采购', '中国', '供应商', '商业'],
      }),
      '[data-project="zch"] .project__more': `
        <dl class="project__facts">
          <div><dt>角色</dt><dd>创始人 · ZCH Sourcing</dd></div>
          <div><dt>重点</dt><dd>采购 · 供应商开发 · 谈判</dd></div>
          <div><dt>状态</dt><dd>筹备中 · 网站即将上线</dd></div>
        </dl>
        <div class="prose">
          <p>ZCH Sourcing 始于一个简单的想法：采购不是从价格开始，而是从理解买什么、怎么制造、承担什么风险开始。公司连接企业与中国的供应商，把工程判断带进一场常常只停留在表格里的对话。</p>
          <ul>
            <li>在中国的供应商寻找与评估。</li>
            <li>工程、质量与谈判之间的桥梁。</li>
            <li>网站与服务筹备中。</li>
          </ul>
        </div>
        <p class="project__note">网站筹备期间，可以写信到 <a href="mailto:storocodo@gmail.com">storocodo@gmail.com</a>。</p>`,
      '[data-project="rockmap"] .project__body': projectBody({
        no: '02', tag: '产品', year: '2026 —', label: '查看项目', tagsLabel: '领域',
        title: 'RockMap',
        summary: '一款旅行规划应用：把路线、阶段和决定放在一个地方。产品开发中。',
        tags: ['产品', '旅行', 'UX', 'App'],
      }),
      '[data-project="rockmap"] .project__more': `
        <dl class="project__facts">
          <div><dt>角色</dt><dd>产品与开发</dd></div>
          <div><dt>重点</dt><dd>旅行规划 · 用户体验</dd></div>
          <div><dt>状态</dt><dd>开发中</dd></div>
        </dl>
        <div class="prose">
          <p>RockMap 是一款旅行规划应用：在出发前整理路线、阶段和决定的地方。项目探索产品的一面——规划旅行时真正需要什么——以及把想法变成简单工具的技术一面。</p>
          <ul>
            <li>路线与阶段结构。</li>
            <li>简单、清楚的旅行组织体验。</li>
            <li>数字产品开发中。</li>
          </ul>
        </div>
        <p class="project__note">开发中；更多细节即将公布。</p>`,

      '.work .label': '<span class="label__num">03</span> 以往项目',
      '.work .section-title': '我最具技术性的<br><em>项目。</em>',
      '[data-project="jrg25"] .project__body': projectBody({
        no: '01', tag: '机器人', year: '2026', label: '查看项目',
        title: 'JRG-25 · 自主移动机器人',
        summary: '为 ASTI 机器人挑战赛（ARC 2026）打造的自主移动机器人。机械、自制 PCB、C++ 固件和 PID 控制；与 Mesa Paso 43 队一起进入决赛，并获得 EINA-Proyecta 奖。',
        tags: ['移动机器人', 'PCB', 'ESP32', 'PID'],
      }),
      '[data-project="jrg25"] .project__more': `
        <dl class="project__facts">
          <div><dt>角色</dt><dd>机械设计、电子与固件 · Mesa Paso 43 队（IEEE SB UZ）</dd></div>
          <div><dt>技术栈</dt><dd>SolidWorks / Fusion 360 · KiCad · ESP32 · C++ · PID · ESP-NOW</dd></div>
          <div><dt>状态</dt><dd>ARC 2026 决赛入围 · EINA-Proyecta 奖</dd></div>
        </dl>
        <div class="prose">
          <p><strong>JRG-25</strong> 是为 <em>ASTI 机器人挑战赛（ARC 2026）</em>与 Mesa Paso 43 队一起开发的自主移动机器人。它集成了 ToF、IMU 和编码器，使用差速里程计、带抗饱和的 PID 控制、状态机，以及带 CI 的分层固件架构。</p>
          <ul>
            <li>SolidWorks/Fusion 360 机械设计与 3D 打印。</li>
            <li>KiCad 自制 PCB，包含 I²C 多路复用与 ESP32。</li>
            <li>带抗饱和的 PID、里程计和 FSM；ESP-NOW 与蓝牙。</li>
          </ul>
        </div>
        <p class="project__note">ARC 2026 决赛入围，EINA-Proyecta 奖（电子与自动化组）得主。</p>`,
      '[data-project="agroplant"] .project__body': projectBody({
        no: '02', year: '2025', label: '查看项目',
        title: 'AGROPLANT',
        summary: '一个学习农业的虚实结合游戏：ESP32 土壤传感器、RFID 卡和开放数据。',
        tags: ['ESP32', 'RFID', 'Wi-Fi', '开放数据'],
      }),
      '[data-project="agroplant"] .project__more': `
        <dl class="project__facts">
          <div><dt>角色</dt><dd>硬件与软件 · NASA Space Apps 2025</dd></div>
          <div><dt>技术栈</dt><dd>ESP32 · RFID · Wi-Fi · 开放数据</dd></div>
          <div><dt>状态</dt><dd>NASA Space Apps 2025 黑客松</dd></div>
        </dl>
        <div class="prose">
          <p>AGROPLANT 把花盆或一块田地变成游戏：土壤传感器和 RFID 卡把物理世界连接到数字层，用开放科学数据提出挑战并解释作物状态。</p>
          <ul>
            <li>ESP32 + RFID 集成，用于识别植物和动作。</li>
            <li>Wi-Fi 通信与虚实结合体验设计。</li>
            <li>使用开放数据集支撑建议。</li>
          </ul>
        </div>
        <p class="project__note">NASA Space Apps Challenge 2025 团队项目。</p>`,
      '[data-project="spit"] .project__body': projectBody({
        no: '03', year: '2026', label: '查看项目',
        title: 'S.P.I.T.',
        summary: '山火早期预警：搭载 RGB/热成像相机的无人机、机载 TinyML，以及由 PLC 控制的湿式防火带。',
        tags: ['KiCad', 'PLC', 'TinyML', '无人机'],
      }),
      '[data-project="spit"] .project__more': `
        <dl class="project__facts">
          <div><dt>角色</dt><dd>电子与控制 · InnoviZar 队</dd></div>
          <div><dt>技术栈</dt><dd>KiCad · PLC · TinyML · 无人机 · 4–20 mA 传感</dd></div>
          <div><dt>状态</dt><dd>WED 2026 黑客松（EINA）</dd></div>
        </dl>
        <div class="prose">
          <p>S.P.I.T. 把无人机巡检（RGB + 热成像）、机载 TinyML 推理和行动阶段结合起来：喷头喷洒 EcoFire 以阻止火势。我负责电子、4–20 mA 流量计与压力传感器读取、泵控制和液压系统选型。</p>
          <ul>
            <li>控制舱的 KiCad 自制 PCB。</li>
            <li>容积泵控制与 4–20 mA 回路。</li>
            <li>传感器集成与 PLC 动作协议。</li>
          </ul>
        </div>
        <p class="project__note">InnoviZar 队在 EINA WED 2026 黑客松上展示的项目。</p>`,
      '[data-project="chispa"] .project__body': projectBody({
        no: '04', tag: '个人项目', year: '2026', label: '查看项目',
        title: 'Chispa — 互动 3D 机器人',
        summary: '个人网页与 3D 实验：一个跟随鼠标、会眨眼、会反应的角色。Three.js、canvas 与程序化动画。',
        tags: ['Three.js', 'WebGL', 'JS', '3D'],
      }),
      '[data-project="chispa"] .project__more': `
        <dl class="project__facts">
          <div><dt>角色</dt><dd>概念、3D 集成与前端</dd></div>
          <div><dt>技术栈</dt><dd>Three.js · WebGL · JavaScript · CSS</dd></div>
          <div><dt>状态</dt><dd>个人项目</dd></div>
        </dl>
        <div class="prose">
          <p>Chispa 是一个网页与 3D 实验：一只带屏幕、像素眼睛和会自己动的叶子的小橘子机器人。脸在 canvas 上绘制，身体是 3D 几何体与程序化动画。</p>
          <ul>
            <li>像素眼睛跟随鼠标并眨眼。</li>
            <li>带弹簧的叶子、会打招呼的手臂和点击反应。</li>
            <li>网页互动与角色设计原型。</li>
          </ul>
        </div>
        <p class="project__note">设计、网页与 3D 之间的个人探索。</p>`,

      '.capabilities .label': '<span class="label__num">04</span> 能力',
      '.capabilities .section-title': '商业、团队<br>与技术<em>基础。</em>',
      '.cap-panel--primary .cap-panel__label': '01 / 商业与人',
      '.cap-panel--primary h3': '我能带来<br>什么。',
      '.cap-panel--primary .cap-list': capList([
        ['01', '采购与供应商开发', '在中国寻找、评估和跟进供应商。'],
        ['02', '谈判与跨文化沟通', '西班牙与中国；西班牙语母语、英语 B2、中文 HSK 2 学习中。'],
        ['03', '领导力与团队', 'IEEE SB UZ 理事会、ASTI 机器人挑战赛指导、跨学科团队。'],
        ['04', '项目管理', '从想法到原型：范围、优先级、预算与交付。'],
        ['05', '沟通与信任', '把技术讲给决策者，把商业讲给工程师。'],
        ['06', '人脉网络', '西班牙与中国：高校、IEEE、产业与创业社群。'],
      ]),
      '.cap-panel--secondary .cap-panel__label': '02 / 技术基础',
      '.cap-panel--secondary h3': '让我看懂<br>的底子。',
      '.cap-panel--secondary .cap-list': capList([
        ['01', '电子与 PCB', 'KiCad、Altium、传感、电源。'],
        ['02', '固件与控制', 'ESP32、C/C++、PID、无线通信。'],
        ['03', '设计与制造', 'SolidWorks、Fusion 360、3D 打印。'],
        ['04', '数据与视觉', 'Python、OpenCV、PyTorch。'],
        ['05', '网页产品', 'HTML、CSS、JavaScript、Three.js。'],
        ['06', '工业控制', 'PLC、4–20 mA、Modbus。'],
        ['07', '工具', 'Linux、Git、MATLAB、SQL。'],
      ]),
      '.cap-panel__note': '我能读图纸、质疑 BOM、判断成本在哪里。所以我谈判时带着上下文，不只看价格。',

      '.path .label': '<span class="label__num">05</span> 经历',
      '.path .section-title': '从工程<br>到<em>采购。</em>',
      '.timeline': [
        timelineItem('2026—', '创业 · 中国 / 西班牙', '创始人 — ZCH Sourcing', 'ZCH Sourcing 成立：以工程判断和商业思维在中国做采购。网站与服务筹备中。'),
        timelineItem('2026—', '产品 · RockMap', 'RockMap', '旅行规划应用开发中：把路线、阶段和决定放在一个地方。'),
        timelineItem('2026—27', '教育 · 中国', '机械工程交换', '南京工业大学。一年交换，获学业奖学金；学习语言、文化，以及商业如何运作。'),
        timelineItem('2026—', 'IEEE SB-UZ', 'Board Member — 电子火箭与机器人', '在电子火箭与机器人分会负责领导与指导：项目协调、数据采集与学生支持。'),
        timelineItem('2025', '实习 · 研发', 'R&amp;D 电子工程师', 'Escribano Mechanical &amp; Engineering（EM&amp;E / AUNAV），Binéfar。Altium PCB 设计、机器人系统验证，以及工业研发团队协作。'),
        timelineItem('2024—26', 'IEEE SB-UZ', '学生会员 &amp; 宣传', '学生分会市场与传播：推广、合作伙伴关系与活动组织。'),
        timelineItem('2024—', '工坊 · Agenda 2030', 'Repair Café &amp; Workshop', 'EINA 学生电子维修工坊：实践教学、沟通与知识分享。'),
        timelineItem('2022—27', '教育', '电子与自动化工程本科', '萨拉戈萨大学 EINA。机器人、控制、电子、自动化与编程；如今用于商业的技术基础。'),
      ].join(''),
      '.awards': `
        <p class="label label--stacked">技术荣誉</p>
        <ol class="awards__list">
          <li><span class="awards__num mono">01</span><div><strong>冠军 — 一等奖 · 最佳表现奖</strong><p>JRG-26 · 第十届 ASTI 机器人挑战赛（ARC 2026）</p></div></li>
          <li><span class="awards__num mono">02</span><div><strong>参与者 — NASA Space Apps</strong><p>2025</p></div></li>
          <li><span class="awards__num mono">03</span><div><strong>参与者 — WED 黑客松</strong><p>EINA · 2026</p></div></li>
        </ol>
        <a class="link-arrow" href="./cv.html">查看技术简历 ${ico('arrow-up-right')}</a>
        <p class="awards__note">“技术也要靠执行来证明。这些奖项是基础，不是终点。”</p>`,

      '.contact .label': '<span class="label__num">06</span> 联系',
      '.contact__title': '你的下一个<br><em>决定。</em>',
      '.contact__lede': '在中国找供应商、开发产品，或把一个想法成形？写信给我。我会亲自回复。',
      '.contact__links a:nth-child(1)': `写封邮件 ${ico('arrow-up-right')}`,
      '.contact__links a:nth-child(2)': `了解 ZCH Sourcing ${ico('arrow-up-right')}`,
      '.contact__links a:nth-child(3)': `下载技术简历 ${ico('download')}`,
      'label[for="f-name"]': '你的名字',
      'label[for="f-email"]': '你的邮箱',
      'label[for="f-msg"]': '你在做什么？',
      '.form__foot .btn': `打开我的邮件 ${ico('arrow-up-right')}`,
      '.form__note': '会打开你的邮件客户端，并填好消息。不会发送到任何服务器。',
      '.faq': `
        <div class="faq__head">
          <p class="label label--stacked">常见问题</p>
          <p class="faq__hint mono">写之前，先看看</p>
        </div>
        <div class="faq__grid">
          ${faqItem('ZCH Sourcing 是什么？', '一家筹备中的中国采购公司。用工程判断和商业思维，把企业与供应商、机会连接起来。')}
          ${faqItem('你能为我的公司做什么？', '产品与零部件采购、供应商寻找与评估、报价比较、谈判支持。如果项目合适，我会告诉你我会怎么做。')}
          ${faqItem('为什么让工程师做采购？', '因为理解工艺、材料和公差，会改变与供应商的对话。价格重要，真实成本更重要。')}
          ${faqItem('你在哪里，使用哪些语言？', '在南京，根在萨拉戈萨。用西班牙语、英语和中文（HSK 2，学习中）与中国和世界合作。')}
          ${faqItem('我们怎么开始？', '写信告诉我你的需求：产品、数量、时间，或最初的想法。我们看看是否合适，以及我能如何帮忙。')}
        </div>`,
    },
    attrs: {
      '.hero__panel': { 'aria-label': 'ZCH Sourcing：连接中国与世界的供应商网络' },
      '.hero__scene': { 'aria-label': 'Chispa 在两个集装箱之间跳跃' },
      '#mascot-canvas': { 'aria-label': 'Chispa，ZCH Sourcing 的小橘子机器人，在两个集装箱之间跳跃' },
      '.nav__links': { 'aria-label': '主导航' },
      '.menu__nav': { 'aria-label': '移动菜单' },
      '#menu-toggle': { 'aria-label': '打开菜单' },
      '#menu-close': { 'aria-label': '关闭菜单' },
      '.portrait img': { alt: 'Sergio Toro Codo 的肖像' },
      '.scroll-cue': { 'aria-label': '向下滚动到关于我' },
      '.stats': { 'aria-label': '快速数据' },
      '#copy-email': { 'aria-label': '复制邮箱地址' },
      '#modal-close': { 'aria-label': '关闭项目详情' },
      '#f-name': { placeholder: 'Ada Lovelace' },
      '#f-email': { placeholder: 'ada@example.com' },
      '#f-msg': { placeholder: '供应商、产品、采购...' },
    },
  },
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const isCv = document.body.classList.contains('cv-page');
const originals = new Map();
const originalMeta = {
  title: document.title,
  description: $('meta[name="description"]')?.content || '',
  ogTitle: $('meta[property="og:title"]')?.content || '',
  ogDescription: $('meta[property="og:description"]')?.content || '',
  ogLocale: $('meta[property="og:locale"]')?.content || '',
};

let current = 'es';
let initialized = false;

function selectedLang() {
  const q = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(q)) return q;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(stored)) return stored;
  } catch { /* private mode */ }
  return 'es';
}

function remember(el) {
  if (!originals.has(el)) {
    originals.set(el, { html: null, hasHtml: false, attrs: {} });
  }
  return originals.get(el);
}

function capture() {
  const htmlSelectors = new Set([
    ...Object.keys(translations.en.html),
    ...Object.keys(translations.zh.html),
  ]);
  for (const sel of htmlSelectors) {
    $$(sel).forEach((el) => {
      const rec = remember(el);
      if (!rec.hasHtml) {
        rec.html = el.innerHTML;
        rec.hasHtml = true;
      }
    });
  }
  const attrSelectors = new Set([
    ...Object.keys(translations.en.attrs),
    ...Object.keys(translations.zh.attrs),
  ]);
  for (const sel of attrSelectors) {
    $$(sel).forEach((el) => {
      const rec = remember(el);
      const attrs = { ...translations.en.attrs[sel], ...translations.zh.attrs[sel] };
      for (const name of Object.keys(attrs)) {
        if (!(name in rec.attrs)) rec.attrs[name] = el.getAttribute(name);
      }
    });
  }
}

function applyAttrs(lang) {
  const map = translations[lang]?.attrs || {};
  for (const [sel, attrs] of Object.entries(map)) {
    $$(sel).forEach((el) => {
      for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
    });
  }
}

function restore() {
  for (const [el, rec] of originals) {
    if (rec.hasHtml) el.innerHTML = rec.html;
    for (const [name, value] of Object.entries(rec.attrs)) {
      if (value === null) el.removeAttribute(name);
      else el.setAttribute(name, value);
    }
  }
  if (!isCv) {
    document.title = originalMeta.title;
    const desc = $('meta[name="description"]');
    const ogTitle = $('meta[property="og:title"]');
    const ogDesc = $('meta[property="og:description"]');
    const ogLocale = $('meta[property="og:locale"]');
    if (desc) desc.content = originalMeta.description;
    if (ogTitle) ogTitle.content = originalMeta.ogTitle;
    if (ogDesc) ogDesc.content = originalMeta.ogDescription;
    if (ogLocale) ogLocale.content = originalMeta.ogLocale;
  }
}

function applyMeta(lang) {
  if (isCv) return;
  const m = translations[lang].meta;
  document.title = m.title;
  const desc = $('meta[name="description"]');
  const ogTitle = $('meta[property="og:title"]');
  const ogDesc = $('meta[property="og:description"]');
  const ogLocale = $('meta[property="og:locale"]');
  if (desc) desc.content = m.description;
  if (ogTitle) ogTitle.content = m.ogTitle;
  if (ogDesc) ogDesc.content = m.ogDescription;
  if (ogLocale) ogLocale.content = m.ogLocale;
}

function forceReveals() {
  $$('.reveal').forEach((el) => el.classList.add('is-in'));
}

function syncSwitchers(lang) {
  $$('[data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });
  $$('[data-i18n-aria-label]').forEach((el) => {
    const key = el.dataset.i18nAriaLabel.split('.').pop();
    const value = ui[lang]?.[key] || ui.es[key];
    if (value) el.setAttribute('aria-label', value);
  });
  $$('.cv-lang-note').forEach((el) => {
    el.lang = document.documentElement.lang;
  });
}

function updateUrl(lang) {
  try {
    const url = new URL(location.href);
    if (lang === 'es') url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  } catch { /* file:// */ }
}

export function setLanguage(lang, { initial = false } = {}) {
  if (!LANGS.includes(lang)) lang = 'es';
  current = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;

  if (lang === 'es') {
    restore();
  } else {
    const map = translations[lang].html;
    for (const [sel, html] of Object.entries(map)) {
      $$(sel).forEach((el) => { el.innerHTML = html; });
    }
    applyAttrs(lang);
    applyMeta(lang);
  }
  syncSwitchers(lang);
  if (!initial) forceReveals();

  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* private mode */ }
  updateUrl(lang);
}

export function initI18n() {
  if (initialized) return current;
  initialized = true;
  capture();
  $$('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  const initial = selectedLang();
  setLanguage(initial, { initial: true });
  return current;
}

export function getLanguage() {
  return current;
}

export function t(key) {
  return messages[current]?.[key] || messages.es[key] || key;
}

