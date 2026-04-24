/* Builds section markup and injects into #main */
(function () {
  const main = document.getElementById('main');

  // Data ---------------------------------------------------------------
  const PROJECTS = [
    { idx: '01', name: 'Lattice',      year: '2026', tag: 'Systems',   desc: 'Distributed consensus visualizer for teaching Paxos.', pattern: 'grid-dots' },
    { idx: '02', name: 'Marginalia',   year: '2025', tag: 'Writing',   desc: 'Annotated reader for math papers — side-by-side proofs.', pattern: 'rings' },
    { idx: '03', name: 'Pinecone',     year: '2025', tag: 'iOS',       desc: 'Offline-first note app for fieldwork, built on CRDTs.',    pattern: 'spiral' },
    { idx: '04', name: 'Tidepool',     year: '2025', tag: 'ML',        desc: 'Tiny local model playground — swap weights, see attention.', pattern: 'waves' },
    { idx: '05', name: 'Solenoid',     year: '2024', tag: 'Open src',  desc: 'Rust state-machine crate with typed transitions.',         pattern: 'coil' },
    { idx: '06', name: 'Cartograph',   year: '2024', tag: 'Tool',      desc: 'Map campus Wi-Fi signal strength over time.',             pattern: 'topo' },
    { idx: '07', name: 'Bindweed',     year: '2024', tag: 'Web',       desc: 'Browser extension that tracks essay revisions as a graph.', pattern: 'graph' },
    { idx: '08', name: 'Quartermaster',year: '2023', tag: 'CLI',       desc: 'Dotfiles manager with profiles and atomic switches.',     pattern: 'bars' },
    { idx: '09', name: 'Foghorn',      year: '2023', tag: 'Audio',     desc: 'Small synth built in the browser — one afternoon project.', pattern: 'sine' },
    { idx: '10', name: 'Almanac',      year: '2022', tag: 'Personal',  desc: 'A private yearly review generator — no cloud, no login.',  pattern: 'calendar' },
  ];

  const EXPERIENCE = [
    { when: '2025 — now', role: 'Software Engineering Intern', org: 'Company Placeholder, Inc.', loc: 'Remote' },
    { when: '2024 — 25',  role: 'Research Assistant',          org: 'UNB · Applied Math Lab',       loc: 'Fredericton' },
    { when: '2024',       role: 'Teaching Assistant',          org: 'UNB · Data Structures',        loc: 'Fredericton' },
    { when: '2023 — 24',  role: 'Software Developer',          org: 'Student Project Placeholder',  loc: 'Fredericton' },
    { when: '2023',       role: 'Hackathon Organizer',         org: 'UNB CS Society',               loc: 'Fredericton' },
    { when: '2022 — now', role: 'B.Sc. Software Eng. + Math',  org: 'University of New Brunswick',  loc: 'Fredericton, CA' },
  ];

  // Helpers -----------------------------------------------------------
  function patternMarkup(p) {
    // SVG placeholder patterns — subtle, monochrome
    switch (p) {
      case 'grid-dots':
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">
          <defs><pattern id="gd-${Math.random()}" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.7" fill="rgba(255,255,255,0.3)"/></pattern></defs>
          <rect width="200" height="200" fill="url(#gd-a)"/>
          <circle cx="100" cy="100" r="42" fill="none" stroke="rgba(255,255,255,0.4)"/>
          <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(255,255,255,0.2)"/>
        </svg>`;
      case 'rings':
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">
          ${Array.from({length:14},(_,i)=>`<circle cx="100" cy="100" r="${(i+1)*8}" fill="none" stroke="rgba(255,255,255,${0.06 + i*0.015})" stroke-width="0.5"/>`).join('')}
        </svg>`;
      case 'spiral':
        { let d = 'M 100 100 '; for (let i=0;i<240;i++){const a=i*0.14;const r=i*0.28;d+=`L ${100+Math.cos(a)*r} ${100+Math.sin(a)*r} `;}
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%"><path d="${d}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.4"/></svg>`; }
      case 'waves':
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">
          ${Array.from({length:16},(_,i)=>{
            const y=20+i*10; let d=`M 0 ${y} `;
            for(let x=0;x<=200;x+=4){d+=`L ${x} ${y + Math.sin((x+i*10)*0.08)*5} `;}
            return `<path d="${d}" fill="none" stroke="rgba(255,255,255,${0.08+i*0.01})" stroke-width="0.4"/>`;
          }).join('')}
        </svg>`;
      case 'coil':
        { let d=''; for(let i=0;i<60;i++){const a=i*0.4;d+=`M ${20+i*3} ${100+Math.sin(a)*40} A 6 6 0 0 1 ${20+i*3+3} ${100+Math.sin(a+0.4)*40} `;}
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%"><path d="${d}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/></svg>`; }
      case 'topo':
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">
          ${Array.from({length:8},(_,i)=>`<path d="M 0 ${40+i*16} Q 50 ${20+i*16} 100 ${50+i*16} T 200 ${30+i*16}" fill="none" stroke="rgba(255,255,255,${0.12+i*0.02})" stroke-width="0.5"/>`).join('')}
        </svg>`;
      case 'graph':
        { const nodes = Array.from({length:10},()=>[20+Math.random()*160, 20+Math.random()*160]);
        let edges=''; for(let i=0;i<nodes.length;i++){for(let j=i+1;j<nodes.length;j++){if(Math.random()<0.25){edges+=`<line x1="${nodes[i][0]}" y1="${nodes[i][1]}" x2="${nodes[j][0]}" y2="${nodes[j][1]}" stroke="rgba(255,255,255,0.15)" stroke-width="0.4"/>`;}}}
        const pts = nodes.map(n=>`<circle cx="${n[0]}" cy="${n[1]}" r="2" fill="rgba(255,255,255,0.7)"/>`).join('');
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">${edges}${pts}</svg>`; }
      case 'bars':
        { let b=''; for(let i=0;i<24;i++){const h=20+Math.abs(Math.sin(i*0.7))*140; b+=`<rect x="${8+i*8}" y="${180-h}" width="4" height="${h}" fill="rgba(255,255,255,${0.2+i*0.02})"/>`;}
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">${b}</svg>`; }
      case 'sine':
        { let d='M 0 100 '; for(let x=0;x<=200;x+=2){d+=`L ${x} ${100+Math.sin(x*0.08)*30*(1-x/400)} `;}
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">
          <path d="${d}" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.7"/>
          <path d="${d}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        </svg>`; }
      case 'calendar':
        { let c=''; for(let y=0;y<8;y++){for(let x=0;x<12;x++){const fill=Math.random()<0.5?(0.08+Math.random()*0.3):0.03; c+=`<rect x="${10+x*15}" y="${20+y*18}" width="12" height="14" fill="rgba(255,255,255,${fill})"/>`;}}
        return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">${c}</svg>`; }
      default: return '';
    }
  }

  // Section markup ---------------------------------------------------
  function hero() {
    return `
    <section id="hero" data-screen-label="01 Hero">
      <div class="wrap">
        <div class="hero-eyebrow mono reveal">
          <span class="pulse"></span>
          <span>Available for 2026 internships</span>
          <span class="sep">·</span>
          <span>Fredericton, NB</span>
        </div>

        <h1 class="hero-name">
          <span class="block" data-decrypt="Dax Manuel"></span>
          <span class="block indent"><span class="italic">software</span> engineering</span>
          <span class="block">+ <span class="italic">mathematics</span></span>
        </h1>

        <div class="hero-sub">
          <p class="bio reveal">
            Third-year student at <span class="italic serif">UNB</span>, building small, careful software
            at the intersection of systems and math. Currently thinking about
            distributed consensus, type systems, and why beautiful proofs feel so much
            like beautiful code.
          </p>
          <div class="meta mono reveal">
            <div class="meta-row"><span class="k">UTC</span><span class="v" id="utc-clock">—</span></div>
            <div class="meta-row"><span class="k">Lat</span><span class="v">45.9636° N</span></div>
            <div class="meta-row"><span class="k">Lon</span><span class="v">66.6431° W</span></div>
            <div class="meta-row"><span class="k">Status</span><span class="v"><span class="live-dot"></span>writing code</span></div>
          </div>
        </div>
      </div>
      <div class="scroll-hint mono">
        <span>scroll</span>
        <span class="line"></span>
      </div>
    </section>`;
  }

  function about() {
    return `
    <section id="about" data-screen-label="02 About">
      <div class="wrap">
        <div>
          <div class="section-label reveal">
            <span class="num">02</span>
            <span class="rule"></span>
            <span class="title" data-decrypt="About"></span>
          </div>
          <div class="about-copy">
            <p class="reveal">I like software that feels <span class="em">inevitable</span> — the kind where the data model, the UI, and the math all agree.</p>
            <p class="reveal">I started programming in grade 9 by writing a chess engine that only knew how to move pawns. Since then I've become interested in what makes programs <em>understandable</em> — which turns out to be mostly a question of math. I care about small tools, clear abstractions, and the quiet satisfaction of a green test run.</p>
            <p class="reveal">Outside of code I run, read physical books, and over-invest in my cup of morning coffee. I'm currently learning <span class="em">Rust</span>, <span class="em">type theory</span>, and how to draw topology by hand.</p>
          </div>
        </div>
        <div class="about-facts reveal">
          <div class="fact mono"><span class="k">Based in</span><span class="v">Fredericton, CA</span></div>
          <div class="fact mono"><span class="k">Studying</span><span class="v">Softw. Eng + Math</span></div>
          <div class="fact mono"><span class="k">School</span><span class="v">UNB · '27</span></div>
          <div class="fact mono"><span class="k">Writing</span><span class="v">Rust / TS / Python</span></div>
          <div class="fact mono"><span class="k">Reading</span><span class="v">TAPL · Pierce</span></div>
          <div class="fact mono"><span class="k">Listening</span><span class="v">Ambient / Jazz</span></div>
          <div class="fact mono"><span class="k">Hours awake</span><span class="v" id="awake-count">—</span></div>
          <div class="fact mono"><span class="k">Coffees today</span><span class="v">2</span></div>
        </div>
      </div>
    </section>`;
  }

  function work() {
    const items = PROJECTS.map((p, i) => `
      <article class="project" data-magnetic data-warp data-cursor="view">
        <div class="project-visual">
          <span class="mono project-idx">${p.idx}</span>
          <span class="mono project-tag">${p.tag}</span>
          ${patternMarkup(p.pattern)}
        </div>
        <div class="project-meta">
          <div class="row">
            <span class="name">${p.name}</span>
            <span class="year mono">${p.year}</span>
          </div>
          <div class="desc">${p.desc}</div>
        </div>
      </article>
    `).join('');

    return `
    <section id="work" data-screen-label="03 Work">
      <div class="work-pin">
        <div class="work-sticky">
          <div class="work-head">
            <div class="left">
              <div class="section-label" style="margin-bottom:20px">
                <span class="num mono">03</span>
                <span class="rule"></span>
                <span class="title mono" data-decrypt="Selected work"></span>
              </div>
              <h2>Ten things I <span class="italic">made</span>.</h2>
            </div>
            <div class="right mono">
              <div class="counter"><span class="cur" id="work-cur">01</span> / ${String(PROJECTS.length).padStart(2,'0')}</div>
              <div>Scroll horizontally →</div>
            </div>
          </div>
          <div class="work-progress"><div class="fill" id="work-fill"></div></div>
          <div class="work-track" id="work-track">${items}</div>
          <div class="work-foot mono">
            <span>drag / scroll</span>
            <span>end of line</span>
          </div>
        </div>
      </div>
    </section>`;
  }

  function experience() {
    const rows = EXPERIENCE.map(e => `
      <div class="tl-row reveal" data-magnetic>
        <div class="when mono">${e.when}</div>
        <div class="role">${e.role.replace(/(Engineering|Research|Teaching|Developer|Math)/, '<span class="italic">$1</span>')}</div>
        <div class="org">${e.org}</div>
        <div class="loc">${e.loc}</div>
      </div>
    `).join('');
    return `
    <section id="experience" data-screen-label="04 Experience">
      <div class="wrap">
        <div class="section-label reveal">
          <span class="num mono">04</span>
          <span class="rule"></span>
          <span class="title mono" data-decrypt="Experience"></span>
        </div>
        <div class="timeline">${rows}</div>
      </div>
    </section>`;
  }

  function now() {
    return `
    <section id="now" data-screen-label="05 Now">
      <div class="wrap">
        <div class="section-label reveal">
          <span class="num mono">05</span>
          <span class="rule"></span>
          <span class="title mono" data-decrypt="Currently"></span>
        </div>

        <div class="now-grid">
          <div class="now-card nc-1 reveal" data-warp>
            <div class="ncat mono"><span>Building</span><span><span class="live-dot"></span>live</span></div>
            <div class="nbody">A <span class="em">type-safe</span> state machine library in Rust, with transitions you can't misspell. Most of my weekends, lately.</div>
            <div class="nmeta mono">Commit · 2 hours ago</div>
          </div>
          <div class="now-card nc-2 reveal" data-warp>
            <div class="ncat mono"><span>Reading</span><span>03 / 18</span></div>
            <div class="nbody">Pierce, <span class="em">Types and Programming Languages</span>. Slow going — in the best way.</div>
            <div class="nmeta mono">Ch. 11 — Simple Types</div>
          </div>
          <div class="now-card nc-3 reveal" data-warp>
            <div class="ncat mono"><span>Course</span><span>W26</span></div>
            <div class="nbody">CS 4403 · <span class="em">Algorithms</span> and a proofs-heavy abstract algebra seminar.</div>
            <div class="nmeta mono">UNB · Term 2</div>
          </div>
          <div class="now-card nc-4 reveal" data-warp>
            <div class="ncat mono"><span>Listening</span><span>repeat</span></div>
            <div class="nbody">A quiet ambient mix for coding, and a long jazz playlist for reading days.</div>
            <div class="nmeta mono">★ 4.7 avg bpm</div>
          </div>
          <div class="now-card nc-5 reveal" data-warp>
            <div class="ncat mono"><span>Writing</span><span>draft</span></div>
            <div class="nbody">An essay on why <span class="em">CRDTs</span> feel like algebra — I've rewritten the opening four times.</div>
            <div class="nmeta mono">~ 1,400 words</div>
          </div>
          <div class="now-card nc-6 reveal" data-warp>
            <div class="ncat mono"><span>Looking for</span><span>2026</span></div>
            <div class="nbody">An <span class="em">internship</span> where I can write meaningful systems code with thoughtful people.</div>
            <div class="nmeta mono">Open to relocation</div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function contact() {
    return `
    <section id="contact" data-screen-label="06 Contact">
      <div class="wrap">
        <div class="section-label reveal">
          <span class="num mono">06</span>
          <span class="rule"></span>
          <span class="title mono" data-decrypt="Say hello"></span>
        </div>
        <h2 class="contact-big reveal">
          <span class="block">Let's <span class="italic">build</span></span>
          <span class="block">something —</span>
          <span class="block"><a href="mailto:hello@placeholder.dev" data-magnetic data-cursor="email">hello@placeholder.dev</a></span>
        </h2>

        <div class="contact-grid">
          <div class="cbox mono"><span class="k">Email</span><span class="v"><a href="mailto:hello@placeholder.dev" data-cursor="send">hello@placeholder.dev</a></span></div>
          <div class="cbox mono"><span class="k">GitHub</span><span class="v"><a href="#" data-cursor="open">@placeholder</a></span></div>
          <div class="cbox mono"><span class="k">Read</span><span class="v"><a href="#" data-cursor="read">/writing</a></span></div>
          <div class="cbox mono"><span class="k">Resume</span><span class="v"><a href="#" data-cursor="pdf">[PDF]</a></span></div>
        </div>
      </div>
      <footer>
        <div class="mono">© 2026 Dax Manuel · All thoughts my own</div>
        <pre class="ascii-sig">   ___  __  __
  / _ \\|  \\/  |
 | | | | |\\/| |
 | |_| | |  | |
  \\___/|_|  |_|</pre>
        <div class="mono"><button id="tweaks-toggle" data-cursor="tweak">[Tweaks]</button></div>
      </footer>
    </section>`;
  }

  main.innerHTML = hero() + about() + work() + experience() + now() + contact();

  window.__sections = { PROJECTS, EXPERIENCE };
})();
