import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, useParams, Router as WouterRouter, Link } from 'wouter';
import { ArrowRight, Menu, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const queryClient = new QueryClient();
const baseUrl = import.meta.env.BASE_URL;
const image = (name: string) => `${baseUrl}images/${name}`;
const paths = [
  { label: 'About', href: '/about' },
  { label: 'What We Do', href: '/services' },
  { label: 'Careers', href: '/careers' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

const articles = [
  { slug: 'what-makes-a-financial-plan-useful', category: 'Financial Planning', date: '18 March 2025', read: '5 min read', title: 'What makes a financial plan truly useful?', img: 'family-interior.jpg', excerpt: 'A useful plan is not a document to file away. It is a clear way to make decisions as life changes.' },
  { slug: 'financial-confidence-priorities-change', category: 'Retirement', date: '04 March 2025', read: '4 min read', title: 'Building financial confidence as priorities change', img: 'dubai-evening.jpg', excerpt: 'The decisions that matter most rarely stay still. A thoughtful plan makes room for that.' },
  { slug: 'questions-before-important-decision', category: 'Protection', date: '20 February 2025', read: '6 min read', title: 'Questions to ask before an important financial decision', img: 'dubai-hero.jpg', excerpt: 'A few considered questions can bring perspective to a decision with long-term implications.' },
  { slug: 'making-space-for-retirement', category: 'Retirement', date: '06 February 2025', read: '5 min read', title: 'Making space for the retirement you imagine', img: 'family-interior.jpg', excerpt: 'Start with the life you would like to lead, then give the practical details their place.' },
  { slug: 'investing-with-a-long-view', category: 'Investing', date: '23 January 2025', read: '7 min read', title: 'Investing with a longer view', img: 'dubai-evening.jpg', excerpt: 'A considered approach begins with your time horizon, circumstances and comfort with uncertainty.' },
  { slug: 'a-career-built-on-curiosity', category: 'Career', date: '15 January 2025', read: '3 min read', title: 'A career in advice, built on curiosity', img: 'culture.jpg', excerpt: 'Good advice starts with the willingness to listen, learn and keep asking better questions.' },
];
const articleCategories = ['All', 'Financial Planning', 'Retirement', 'Protection', 'Investing', 'Career'];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location]);
  return <>
    <header className={`nav ${scrolled || menuOpen ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="brand" data-testid="link-brand">NOVA<small>WEALTH ADVISORY</small></Link>
        <nav className="nav-links" aria-label="Main navigation">
          {paths.map((item) => <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
        </nav>
        <Link href="/book" className="btn nav-cta" data-testid="link-book-conversation">Book a Conversation <ArrowRight size={14} /></Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
    <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
      {paths.map((item) => <Link key={item.href} href={item.href} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
      <Link href="/book" className="btn dark" data-testid="link-mobile-book">Book a Conversation <ArrowRight size={15} /></Link>
    </nav>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="wrap">
      <div className="footer-main">
        <div><Link href="/" className="brand" data-testid="link-footer-brand">NOVA<small>WEALTH ADVISORY</small></Link><p>Clarity for today. Confidence for tomorrow.</p><p>Dubai, United Arab Emirates</p></div>
        <div><div className="footer-title">Explore</div><nav className="footer-nav">{paths.map((p) => <Link key={p.href} href={p.href} data-testid={`link-footer-${p.label.toLowerCase().replaceAll(' ', '-')}`}>{p.label}</Link>)}<Link href="/book" data-testid="link-footer-book">Book a Conversation</Link></nav></div>
        <div><div className="footer-title">Stay connected</div><nav className="footer-nav"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-testid="link-social-linkedin">LinkedIn</a><a href="https://www.instagram.com" target="_blank" rel="noreferrer" data-testid="link-social-instagram">Instagram</a><a href="https://www.youtube.com" target="_blank" rel="noreferrer" data-testid="link-social-youtube">YouTube</a></nav><div className="footer-title" style={{ marginTop: 30 }}>Legal</div><nav className="footer-nav"><a href="#privacy" data-testid="link-privacy">Privacy</a><a href="#terms" data-testid="link-terms">Terms</a><a href="#disclaimer" data-testid="link-disclaimer">Disclaimer</a></nav></div>
      </div>
      <div className="disclaimer" id="disclaimer" data-testid="text-disclaimer">Demo website. Content is for portfolio demonstration purposes only and does not constitute financial, investment, insurance or legal advice.</div>
      <div className="footer-bottom"><span>© 2025 NOVA Wealth Advisory · Demonstration concept</span><span>Dubai · UAE</span></div>
    </div>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site"><Header />{children}<Footer /></div>;
}

function Eyebrow({ children }: { children: ReactNode }) { return <div className="eyebrow">{children}</div>; }
function CTA({ title = "Let's make the next decision clearer.", text = 'Start with a conversation about what matters to you.' }: { title?: string; text?: string }) {
  return <section className="final-cta"><div className="wrap"><h2 className="section-title">{title}</h2><p>{text}</p><div className="final-cta-actions"><Link href="/book" className="btn dark" data-testid="link-final-book">Book a Conversation <ArrowRight size={14} /></Link><Link href="/contact" className="btn" data-testid="link-final-contact">Contact Us</Link></div></div></section>;
}
function Team() {
  const people = [
    { name: 'Omar Al Nouri', role: 'Senior Financial Consultant', img: 'omar.jpg', bio: 'Omar brings a measured perspective to complex financial decisions, beginning with what matters to each person and family.' },
    { name: 'Sara Rahman', role: 'Financial Planning Consultant', img: 'sara.jpg', bio: 'Sara believes a thoughtful plan is one that makes the important choices feel easier to understand.' },
    { name: 'Daniel Mercer', role: 'Wealth Advisory Consultant', img: 'daniel.jpg', bio: 'Daniel works with clients to connect today’s choices with the longer-term picture they have in mind.' },
  ];
  return <section className="team" id="team"><div className="wrap"><Eyebrow>Our People</Eyebrow><div className="section-head"><h2 className="section-title">People behind the advice.</h2></div><div className="team-grid" role="region" aria-label="NOVA team profiles" tabIndex={0}>{people.map((p) => <article className="person" key={p.name} data-testid={`card-person-${p.name.split(' ')[0].toLowerCase()}`}><div className="person-image"><img src={image(p.img)} alt={`Portrait of ${p.name}`} /></div><div className="person-info"><h3>{p.name}</h3><span>{p.role}</span></div><div className="person-bio">{p.bio}</div></article>)}</div></div></section>;
}
function InsightsCards({ list = articles.slice(0, 3) }: { list?: typeof articles }) {
  return <div className="article-grid">{list.map((a, i) => <Link href={`/insights/${a.slug}`} className="article-card" key={a.slug} data-testid={`card-article-${a.slug}`}><div className="article-img"><img src={image(a.img)} alt="" /></div><div className="article-meta"><span>{a.category}</span><span>·</span><span>{a.date}</span><span>·</span><span>{a.read}</span></div><h3>{a.title}</h3><span className="article-arrow"><ArrowRight size={18} /></span></Link>)}</div>;
}

function Home() {
  const services = [
    ['01', 'Financial Planning', 'A clear view of where you are, what matters and the choices ahead.'],
    ['02', 'Protection Planning', 'Consider the people and priorities that depend on you.'],
    ['03', 'Retirement Planning', 'Shape a considered plan for the next chapter of life.'],
    ['04', 'Investment Planning', 'Make investment decisions in the context of your wider plan.'],
  ];
  return <Shell>
    <main>
      <section className="wrap hero">
        <div className="hero-copy reveal"><Eyebrow>Financial guidance · Dubai</Eyebrow><h1 className="display">Financial clarity for the life you're building.</h1><p className="body-copy">Thoughtful financial planning for individuals and families in the UAE, built around your goals, priorities and future.</p><div className="hero-actions"><Link href="/book" className="btn dark" data-testid="link-hero-start">Start a Conversation <ArrowRight size={14} /></Link><Link href="/about" className="btn" data-testid="link-hero-approach">Our Approach</Link></div></div>
        <div className="hero-image reveal delay-1"><img src={image('dubai-hero.jpg')} alt="Contemporary Dubai architecture in the late afternoon" /><span className="image-caption">Dubai · UAE</span></div>
      </section>
      <section className="trust-bar"><div className="wrap trust-grid">{[['Personal', 'Advice shaped around you'], ['Clear', 'A considered way forward'], ['Long-Term', 'Plans that can evolve'], ['Thoughtful', 'Care in every conversation']].map(([h, p]) => <div className="trust-item" key={h}><strong>{h}</strong><span>{p}</span></div>)}</div></section>
      <section className="wrap intro"><div><Eyebrow>A different approach</Eyebrow><h2 className="section-title">Your finances should support your life — not complicate it.</h2></div><div className="intro-right"><p className="body-copy">Financial decisions rarely happen in isolation. They connect to family, work, plans for the future and the life you are building here in the UAE.</p><p className="body-copy">At NOVA, we take time to understand the person behind the numbers. The aim is not more complexity, but a clearer view of what comes next.</p><Link href="/about" className="text-link" data-testid="link-philosophy">Discover our philosophy <span>→</span></Link></div></section>
      <section className="services"><div className="wrap"><div className="section-head"><div><Eyebrow>What we do</Eyebrow><h2 className="section-title">Advice built around your priorities.</h2></div><Link href="/services" className="text-link" data-testid="link-all-services">View all services <span>→</span></Link></div><div>{services.map(([n, title, desc]) => <Link href="/services" className="service-row" key={n} data-testid={`link-service-${n}`}><span className="service-num">{n}</span><h3>{title}</h3><p>{desc}</p><span className="arrow">→</span></Link>)}</div></div></section>
      <section className="feature"><div className="feature-image"><img src={image('family-interior.jpg')} alt="A couple in conversation at home" /></div><div className="feature-copy"><Eyebrow>Start with the whole picture</Eyebrow><h2 className="serif">Financial planning</h2><p className="body-copy">A clear plan begins with understanding where you are and where you want to go.</p><Link href="/services" className="text-link" data-testid="link-feature-service">Explore Financial Planning <span>→</span></Link></div></section>
      <section className="approach"><div className="wrap"><Eyebrow>A considered process</Eyebrow><h2 className="section-title">A clear way forward, together.</h2><div className="steps">{[['01','Understand','We begin by understanding your circumstances, goals and priorities.'],['02','Plan','We bring those priorities together into a clear framework.'],['03','Review','Plans should evolve as life changes.'],['04','Move Forward','Clear next steps create greater confidence.']].map(([n,t,p]) => <div className="step" key={n}><span className="step-no">{n}</span><h3>{t}</h3><p>{p}</p></div>)}</div></div></section>
      <section className="uae"><img src={image('dubai-evening.jpg')} alt="" /><div className="wrap uae-inner"><Eyebrow>Rooted in the region</Eyebrow><h2 className="section-title">Built around real lives in the UAE.</h2><p className="body-copy">Families, careers, businesses and international lifestyles can create complex financial decisions. Our approach starts with understanding the person behind the numbers.</p></div></section>
      <Team />
      <section className="careers-preview"><div className="wrap"><div className="career-layout"><div><Eyebrow>Join NOVA</Eyebrow><h2 className="section-title">Build a career with room to grow.</h2><p className="body-copy">Develop your skills, learn from experienced professionals and build a long-term career within a supportive consulting team.</p><div className="career-benefits">{[['01 · TRAINING','Structured learning and professional development.'],['02 · MENTORSHIP','Guidance from experienced team members.'],['03 · GROWTH','A clear path toward greater responsibility.']].map(([h,p])=><div key={h}><strong>{h}</strong><p>{p}</p></div>)}</div><Link href="/careers" className="text-link" data-testid="link-careers-preview">Explore Careers <span>→</span></Link></div><div className="career-photo"><img src={image('culture.jpg')} alt="Colleagues sharing a thoughtful conversation in a modern office" /></div></div></div></section>
      <section className="insights"><div className="wrap"><Eyebrow>Insights</Eyebrow><div className="section-head"><h2 className="section-title">Ideas worth understanding.</h2><Link href="/insights" className="text-link" data-testid="link-all-insights">All insights <span>→</span></Link></div><InsightsCards /></div></section>
      <CTA />
    </main>
  </Shell>;
}

function About() {
  return <Shell><main><section className="wrap page-hero"><Eyebrow>About NOVA</Eyebrow><h1 className="display">Advice should feel personal.</h1><p className="body-copy">Thoughtful guidance begins with listening. We make room for the details that shape your decisions, and build a clear way forward around them.</p></section><div className="wide-image"><img src={image('family-interior.jpg')} alt="A calm, considered home interior" /></div><section className="wrap intro"><div><Eyebrow>Our philosophy</Eyebrow><h2 className="section-title">A good plan makes space for real life.</h2></div><div className="intro-right"><p className="body-copy">The most useful financial conversations start with what you hope to make possible. We take time to understand your circumstances before discussing the choices in front of you.</p><p className="body-copy">NOVA is a fictional Dubai advisory brand created around a simple idea: sound guidance should be clear, personal and grounded in the life it is meant to support.</p><Link href="/book" className="text-link" data-testid="link-about-book">Start a conversation <span>→</span></Link></div></section><section className="values"><div className="wrap values-grid"><div><Eyebrow>What guides us</Eyebrow><h2 className="section-title">Principles we return to.</h2></div><div className="value-list">{[['Integrity','Be candid, thoughtful and consistent in the way we work.'],['Clarity','Make important choices easier to understand.'],['Responsibility','Treat every conversation and decision with care.'],['Partnership','Work alongside people through change, not just at a moment in time.']].map(([h,p])=><div className="value-item" key={h}><h3>{h}</h3><p>{p}</p></div>)}</div></div></section><Team /><CTA title="Let's begin with what matters to you." /></main></Shell>;
}

function Services() {
  const items = [
    { n:'01', title:'Financial Planning', desc:'Understand the full picture and bring your priorities into focus. Together, we explore where you are today, what you would like life to look like and the decisions that can connect the two.', considerations:'Your goals · Cash flow · Family priorities · Future plans', img:'family-interior.jpg' },
    { n:'02', title:'Protection Planning', desc:'Consider how the people and commitments that matter to you may be supported through unexpected change. The conversation begins with your responsibilities and what you want to protect.', considerations:'Family needs · Existing cover · Responsibilities · Changing circumstances', img:'omar.jpg' },
    { n:'03', title:'Retirement Planning', desc:'Build a thoughtful picture of the next chapter, from the lifestyle you imagine to the choices that may help you prepare for it over time.', considerations:'Timing · Lifestyle · Income needs · Long-term priorities', img:'dubai-evening.jpg' },
    { n:'04', title:'Investment Planning', desc:'Place investment decisions within the context of your wider circumstances, time horizon and comfort with uncertainty. Clear thinking comes before any recommendation.', considerations:'Time horizon · Risk comfort · Objectives · Wider financial plan', img:'sara.jpg' },
  ];
  return <Shell><main><section className="wrap page-hero"><Eyebrow>What we do</Eyebrow><h1 className="display">Financial planning designed around your priorities.</h1><p className="body-copy">A considered approach to the decisions that shape your life in the UAE. Each conversation begins with your circumstances, not a product.</p></section>{items.map((it,i)=><section className="service-detail" key={it.n}><div className={`wrap detail-grid ${i%2 ? 'reverse' : ''}`}><div className="detail-image"><img src={image(it.img)} alt={`${it.title} editorial illustration`} /></div><div className="detail-text"><span className="num">{it.n}</span><h2 className="section-title">{it.title}</h2><p className="body-copy">{it.desc}</p><div className="considerations"><strong>Considerations may include</strong><p>{it.considerations}</p></div><Link href="/book" className="text-link" data-testid={`link-service-book-${it.n}`}>Talk through your priorities <span>→</span></Link></div></div></section>)}<CTA title="A clear first step starts with a conversation." /></main></Shell>;
}

function Careers() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); if (!e.currentTarget.reportValidity()) return; setSubmitted(true); }
  return <Shell><main>
    <section className="careers-hero"><div className="wrap career-hero-grid"><div><Eyebrow>Careers at NOVA</Eyebrow><h1 className="display">Build your career with people who invest in your growth.</h1><p className="body-copy">Join a team that values considered advice, curious minds and a long view of professional development.</p><a href="#interest" className="btn dark" data-testid="link-register-interest">Register Your Interest <ArrowRight size={14} /></a></div><div className="career-hero-photo"><img src={image('culture.jpg')} alt="A welcoming, collaborative office environment" /></div></div></section>
    <section className="why"><div className="wrap why-grid"><div><Eyebrow>Why NOVA?</Eyebrow><h2 className="section-title">Room to learn. Space to contribute.</h2></div><div className="why-list">{[['Training','Structured learning and professional development help build strong foundations.'],['Mentorship','Learn through close guidance from experienced colleagues.'],['Growth','Take on responsibility at a pace that supports lasting progress.'],['Culture','Work with people who value thoughtful collaboration and care.']].map(([h,p])=><div className="why-item" key={h}><h3>{h}</h3><p>{p}</p></div>)}</div></div></section>
    <section className="journey"><div className="wrap"><Eyebrow>Career journey</Eyebrow><h2 className="section-title">Progress, with purpose.</h2><div className="journey-list">{[['01','Start','Bring your perspective, curiosity and willingness to learn.'],['02','Learn','Develop the knowledge and judgement that good advice requires.'],['03','Develop','Build confidence through thoughtful work and shared experience.'],['04','Grow','Take on greater responsibility as your skills and contribution grow.']].map(([n,h,p])=><div className="journey-row" key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></div>)}</div></div></section>
    <section className="feature"><div className="feature-image"><img src={image('team.jpg')} alt="NOVA colleagues working together" /></div><div className="feature-copy"><Eyebrow>Team culture</Eyebrow><h2 className="serif">Ambition works better when it's shared.</h2><p className="body-copy">We make room for open questions, generous collaboration and the kind of work that gets better when perspectives are shared.</p></div></section>
    <section className="qualities"><div className="wrap qualities-grid"><div><Eyebrow>Who we're looking for</Eyebrow><h2 className="section-title">How you work matters.</h2></div><div className="qualities-list">{['Curious','Communicative','Responsible','Driven','Collaborative'].map((q)=><div className="quality" key={q}>{q}</div>)}</div></div></section>
    <section className="form-section" id="interest"><div className="wrap form-layout"><div><Eyebrow>Join NOVA</Eyebrow><h2 className="section-title">Register your interest.</h2><p className="body-copy">Tell us a little about yourself and the kind of work you hope to grow into.</p></div>{submitted ? <div className="success-box" role="status" data-testid="status-career-success">Thank you. We've received your interest.<br /><span style={{fontFamily:'var(--app-font-sans)',fontSize:13,color:'#626560'}}>This is a local demonstration confirmation; your details have not been sent.</span></div> : <form className="form" onSubmit={submit} data-testid="form-careers">
      <Field label="Full Name" name="name" required /><Field label="Email" name="email" type="email" required /><Field label="Phone" name="phone" type="tel" required /><Field label="Current Location" name="location" required /><Field label="Current Profession" name="profession" required /><Field label="Years of Experience" name="experience" type="number" min="0" required /><Field label="Why are you interested?" name="interest" textarea required /><div className="field full"><label htmlFor="cv">CV Upload</label><input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" onChange={(e)=>setFileName(e.currentTarget.files?.[0]?.name || '')} data-testid="input-cv" /><small>{fileName || 'PDF or Word document'}</small></div><div className="field full"><button className="btn dark" type="submit" data-testid="button-submit-careers">Register My Interest <ArrowRight size={14} /></button><span className="form-error">Demo form only. Submission is not transmitted or stored.</span></div>
    </form>}</div></section>
    <CTA title="Your next chapter can start with a conversation." text="Tell us what you are looking for." />
  </main></Shell>;
}

function Field({ label, name, type = 'text', required = false, textarea = false, min }: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean; min?: string }) {
  return <div className={`field ${textarea ? 'full' : ''}`}><label htmlFor={name}>{label}{required ? ' *' : ''}</label>{textarea ? <textarea id={name} name={name} required={required} data-testid={`input-${name}`} /> : <input id={name} name={name} type={type} min={min} required={required} data-testid={`input-${name}`} />}</div>;
}

function Insights() {
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => filter === 'All' ? articles.slice(1) : articles.filter((a) => a.category === filter && a.slug !== articles[0].slug), [filter]);
  const featured = articles[0];
  return <Shell><main><section className="insights-hero"><div className="wrap"><Eyebrow>Insights · NOVA journal</Eyebrow><div className="featured-article"><div><div className="article-meta"><span>{featured.category}</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.read}</span></div><h1>{featured.title}</h1><p className="body-copy">{featured.excerpt}</p><Link href={`/insights/${featured.slug}`} className="text-link" data-testid="link-featured-article">Read the article <span>→</span></Link></div><Link href={`/insights/${featured.slug}`} className="featured-article-image" data-testid="link-featured-image"><img src={image(featured.img)} alt="" /></Link></div></div></section><section className="wrap all-articles"><Eyebrow>Explore ideas</Eyebrow><div className="filter-bar" aria-label="Filter articles">{articleCategories.map((cat)=><button type="button" className={filter === cat ? 'active' : ''} onClick={()=>setFilter(cat)} key={cat} data-testid={`button-filter-${cat.toLowerCase().replaceAll(' ','-')}`}>{cat}</button>)}</div>{filtered.length ? <InsightsCards list={filtered} /> : <div className="body-copy" style={{padding:'55px 0'}}>No articles in this category yet.</div>}</section></main></Shell>;
}

function Article() {
  const params = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return <Shell><main className="wrap page-hero"><Eyebrow>NOVA Journal</Eyebrow><h1 className="display">This article isn't here.</h1><Link href="/insights" className="text-link" data-testid="link-back-insights">Back to insights <span>→</span></Link></main></Shell>;
  return <Shell><main className="wrap article-page"><article className="article-reading"><Eyebrow>{article.category} · {article.date} · {article.read}</Eyebrow><h1>{article.title}</h1><p className="body-copy">{article.excerpt}</p></article><div className="article-cover"><img src={image(article.img)} alt="" /></div><div className="article-body">
    <p>Financial planning is most useful when it helps you make decisions in the context of your own life. That sounds straightforward, but it asks for more than a set of numbers. It asks for a clear understanding of what matters and what may change.</p>
    <h2>Begin with the life around the numbers</h2><p>Goals often sit alongside competing priorities: family, work, a move, a business or a different idea of what the future could hold. Taking the time to bring those considerations together can make the choices ahead easier to see.</p>
    <p>A useful plan gives you a framework to return to. It should be clear enough to guide a decision, while flexible enough to be revisited as your circumstances evolve.</p>
    <h2>Make room for review</h2><p>Planning is not a one-time exercise. Conversations can help you understand what has changed, what remains important and whether the next steps still fit. The value is in the clarity of the process, rather than the length of a document.</p>
    <p>Any financial decision should be considered in light of your individual circumstances. The ideas in this fictional demonstration article are general in nature and do not constitute financial, investment, insurance or legal advice.</p>
    <Link href="/book" className="text-link" data-testid="link-article-conversation">Continue the conversation <span>→</span></Link>
  </div><section className="wrap insights" style={{paddingBottom:0}}><Eyebrow>Continue reading</Eyebrow><InsightsCards list={articles.filter((a)=>a.slug!==article.slug).slice(0,2)} /></section></main></Shell>;
}

function Contact() {
  const [sent,setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); if (!e.currentTarget.reportValidity()) return; setSent(true); }
  return <Shell><main><section className="wrap contact-hero"><div className="contact-grid"><div className="contact-info"><Eyebrow>Contact NOVA</Eyebrow><h1 className="display">Let's start with a conversation.</h1><p className="body-copy">A first conversation is a chance to share what is on your mind and see whether our approach feels right for you.</p><div className="contact-details"><div><strong>Visit</strong><span>Dubai, United Arab Emirates</span></div><div><strong>Email</strong><a href="mailto:hello@novaadvisory.example" data-testid="link-contact-email">hello@novaadvisory.example</a></div><div><strong>Conversation</strong><Link href="/book" className="text-link" data-testid="link-contact-book">Choose a time <span>→</span></Link></div></div></div><div>{sent ? <div className="success-box" role="status" data-testid="status-contact-success">Thank you for getting in touch.<br /><span style={{fontFamily:'var(--app-font-sans)',fontSize:13,color:'#626560'}}>Your message has not been sent; this is a local demonstration confirmation.</span></div> : <form className="form" onSubmit={submit} data-testid="form-contact"><Field label="Name" name="name" required /><Field label="Email" name="email" type="email" required /><Field label="Phone" name="phone" type="tel" /><div className="field"><label htmlFor="subject">Subject *</label><select id="subject" name="subject" required defaultValue="" data-testid="input-subject"><option value="" disabled>Select a subject</option><option>Financial planning</option><option>Protection planning</option><option>Retirement planning</option><option>Investment planning</option><option>Other enquiry</option></select></div><Field label="Message" name="message" textarea required /><div className="field full"><button className="btn dark" type="submit" data-testid="button-submit-contact">Send Enquiry <ArrowRight size={14} /></button><span className="form-error">Demo form only. Your details are not transmitted or stored.</span></div></form>}</div></div></section><section className="location"><div className="wrap location-grid"><div><Eyebrow>Our location</Eyebrow><h2 className="section-title">Dubai, UAE.</h2><p>Our fictional advisory practice is based in Dubai, a city shaped by international perspectives and lives lived across borders.</p></div><div className="location-art"><img src={image('dubai-evening.jpg')} alt="Dubai skyline at dusk" /></div></div></section></main></Shell>;
}

function Booking() {
  const [current, setCurrent] = useState(() => new Date());
  const [selected, setSelected] = useState<number | null>(null);
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const thankYouDialogRef = useRef<HTMLDialogElement>(null);
  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const monthLabel = current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const slots = ['09:00','10:30','13:00','15:30'];
  const dates = [...Array(firstDay).fill(null), ...Array(days).fill(0).map((_,i)=>i+1)];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateValue = selected ? new Date(year, month, selected) : null;
  const isDisabled = (day: number | null) =>
    !day ||
    new Date(year, month, day) < today ||
    new Date(year, month, day).getDay() === 0 ||
    new Date(year, month, day).getDay() === 6;

  useEffect(() => {
    const dialog = thankYouDialogRef.current;
    if (!dialog) return;
    if (thankYouOpen && !dialog.open) dialog.showModal();
    if (!thankYouOpen && dialog.open) dialog.close();
  }, [thankYouOpen]);

  function clearSelection() {
    setSelected(null);
    setTime('');
    setEmail('');
    setPhone('');
    setConfirmed(false);
    setThankYouOpen(false);
  }

  function monthStep(delta: number) {
    setCurrent(new Date(year, month + delta, 1));
    clearSelection();
  }

  function confirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selected && time) {
      setConfirmed(true);
      setThankYouOpen(true);
      setEmail('');
      setPhone('');
    }
  }

  return (
    <Shell>
      <main className="wrap booking">
        <div className="booking-grid">
          <div className="booking-copy">
            <Eyebrow>Book a conversation</Eyebrow>
            <h1 className="display">A first conversation should be simple.</h1>
            <p className="body-copy">
              Choose a convenient weekday and time for a complimentary introductory conversation.
              No preparation is needed; simply bring the questions you have.
            </p>
            <p className="body-copy">This is a demonstration calendar. No appointment is actually booked.</p>
          </div>
          <div className="booking-card">
            <div className="booking-top">
              <h2>{monthLabel}</h2>
              <div className="month-controls">
                <button type="button" onClick={() => monthStep(-1)} aria-label="Previous month" data-testid="button-previous-month">
                  <ChevronLeft size={17} />
                </button>
                <button type="button" onClick={() => monthStep(1)} aria-label="Next month" data-testid="button-next-month">
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
            <div className="weekdays">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map((day) => <span key={day}>{day}</span>)}
            </div>
            <div className="calendar-grid">
              {dates.map((day, index) => (
                <button
                  key={`${day}-${index}`}
                  type="button"
                  disabled={isDisabled(day)}
                  className={day !== null && day === selected ? 'selected' : ''}
                  onClick={() => {
                    if (day) {
                      setSelected(day);
                      setTime('');
                      setEmail('');
                      setPhone('');
                      setConfirmed(false);
                      setThankYouOpen(false);
                    }
                  }}
                  aria-label={day ? `Select ${monthLabel} ${day}` : 'empty'}
                  data-testid={day ? `button-date-${day}` : `calendar-empty-${index}`}
                >
                  {day || ''}
                </button>
              ))}
            </div>
            {selected ? (
              <>
                <div className="times" aria-label="Available times">
                  {slots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      className={time === slot ? 'selected' : ''}
                      onClick={() => {
                        setTime(slot);
                        setConfirmed(false);
                        setThankYouOpen(false);
                      }}
                      data-testid={`button-time-${slot.replace(':', '')}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {time && !confirmed && (
                  <form className="booking-contact" onSubmit={confirm} data-testid="form-booking-contact">
                    <h3>Where can we reach you?</h3>
                    <p id="booking-contact-help">Enter either an email address or a phone number to continue.</p>
                    <div className="booking-contact-fields">
                      <label htmlFor="booking-email">
                        Email address
                        <input
                          id="booking-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(event) => setEmail(event.currentTarget.value)}
                          required={!phone.trim()}
                          aria-describedby="booking-contact-help"
                          data-testid="input-booking-email"
                        />
                      </label>
                      <label htmlFor="booking-phone">
                        Phone number
                        <input
                          id="booking-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+971 50 123 4567"
                          value={phone}
                          onChange={(event) => setPhone(event.currentTarget.value)}
                          required={!email.trim()}
                          pattern={"[+0-9().\\s-]{7,20}"}
                          title="Enter a phone number with at least 7 characters."
                          aria-describedby="booking-contact-help"
                          data-testid="input-booking-phone"
                        />
                      </label>
                    </div>
                    <button className="btn dark" type="submit" data-testid="button-confirm-booking">
                      Continue <ArrowRight size={14} />
                    </button>
                  </form>
                )}
                <div className="booking-note" role="status" data-testid="status-booking">
                  {confirmed
                    ? `Your request is noted for ${dateValue?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${time}. No appointment has been reserved.`
                    : time
                      ? `Selected: ${dateValue?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${time}`
                      : 'Select an available time to continue.'}
                </div>
              </>
            ) : (
              <div className="booking-note">Select an available weekday to view times.</div>
            )}
            <dialog
              ref={thankYouDialogRef}
              className="booking-thanks"
              aria-labelledby="booking-thanks-title"
              aria-describedby="booking-thanks-copy"
              onClose={() => setThankYouOpen(false)}
            >
              <div className="booking-thanks-mark" aria-hidden="true"><Check size={18} /></div>
              <span className="booking-thanks-eyebrow">Conversation request</span>
              <h2 id="booking-thanks-title">Thank you.</h2>
              <p id="booking-thanks-copy">
                Your request for {dateValue?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {time} has been noted. This demo does not send your contact details or reserve an appointment.
              </p>
              <button className="btn dark" type="button" onClick={() => setThankYouOpen(false)} data-testid="button-close-thank-you">
                Close
              </button>
            </dialog>
          </div>
        </div>
      </main>
    </Shell>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/services" component={Services} />
    <Route path="/careers" component={Careers} />
    <Route path="/insights" component={Insights} />
    <Route path="/insights/:slug" component={Article} />
    <Route path="/contact" component={Contact} />
    <Route path="/book" component={Booking} />
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={baseUrl.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
