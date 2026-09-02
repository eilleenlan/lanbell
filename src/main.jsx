import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bell, BookOpen, Buildings, CalendarDots, CaretRight, Clock, GraduationCap, House, List, MagnifyingGlass, Megaphone, X } from '@phosphor-icons/react';
import { affairs, events, learningGroups, notices, updatedAt } from './data.js';
import './styles.css';

const routes = [
  { path: '/', label: '首頁', icon: House },
  { path: '/calendar', label: '行事曆', icon: CalendarDots },
  { path: '/learning', label: '課務學習', icon: BookOpen },
  { path: '/affairs', label: '校園事務', icon: Buildings },
  { path: '/notices', label: '公告', icon: Megaphone },
];
const currentPath = () => {
  const value = window.location.hash.replace(/^#/, '') || '/';
  return routes.some((route) => route.path === value) ? value : '/';
};

function Shell() {
  const [path, setPath] = useState(currentPath);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const change = () => { setPath(currentPath()); setMenuOpen(false); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  const page = path === '/' ? <Home /> : path === '/calendar' ? <Calendar /> : path === '/learning' ? <Learning /> : path === '/affairs' ? <Affairs /> : <Notices />;
  return <div className="site-shell">
    <header className="site-header">
      <a className="brand" href="#/" aria-label="薇閣中學資訊站首頁"><GraduationCap weight="duotone" /><span>薇閣中學資訊站</span></a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="切換導覽">{menuOpen ? <X /> : <List />}</button>
      <nav className={menuOpen ? 'open' : ''} aria-label="主要導覽">
        {routes.map(({ path: routePath, label, icon: Icon }) => <a key={routePath} className={path === routePath ? 'active' : ''} href={`#${routePath}`}><Icon /><span>{label}</span></a>)}
      </nav>
    </header>
    <main>{page}</main>
    <footer><GraduationCap /> 薇閣中學資訊站・公開資訊框架 <span>最後更新：{updatedAt}</span></footer>
  </div>;
}

function Home() {
  const cards = routes.slice(1);
  const descriptions = ['考試、活動、假期與截止日', '課表、考試範圍與學習資源', '交通、制服、餐飲與行政流程', '依年級整理的重要通知'];
  return <>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">WEGO MIDDLE SCHOOL PORTAL</span><h1>中學生活的資訊，<br />清楚整理在一處。</h1><p>快速查找重要日期、課務學習、校園事務與最新公告。內容將依正式資料持續補齊。</p><div className="hero-actions"><a className="primary" href="#/calendar"><CalendarDots />查看近期行程</a><a className="secondary" href="#/notices"><Bell />最新公告</a></div></div>
      <aside className="today-card"><span><Clock />近期重點</span><strong>{events[0].date}</strong><h2>{events[0].title}</h2><p>{events[0].detail}</p><a href="#/calendar">查看完整行事曆 <CaretRight /></a></aside>
    </section>
    <section className="quick-section"><div className="section-heading"><span>快速入口</span><h2>你今天要找什麼？</h2></div><div className="quick-grid">{cards.map(({path, label, icon: Icon}, index) => <a href={`#${path}`} key={path}><span className="card-number">0{index + 1}</span><Icon weight="duotone" /><h3>{label}</h3><p>{descriptions[index]}</p><CaretRight className="arrow" /></a>)}</div></section>
    <section className="status-band"><MagnifyingGlass /><div><strong>資料準備中</strong><span>你提供資料後，會沿用這套分類直接補入，不必重做版面。</span></div></section>
  </>;
}

function PageHeader({ eyebrow, title, children }) { return <header className="page-header"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{children}</p></header>; }
function Calendar() { return <><PageHeader eyebrow="CALENDAR" title="重要行事曆">集中整理考試、活動、假期與各項截止日；目前日期均為示意。</PageHeader><section className="timeline">{events.map((item) => <article key={item.date + item.title}><time>{item.date}</time><div><span className="tag">{item.tag}</span><h2>{item.title}</h2><p>{item.detail}</p></div></article>)}</section></>; }
function Learning() { return <><PageHeader eyebrow="LEARNING" title="課務與學習">依「日常課務、學習資源、升學生涯」分組，後續可再依國中部、高中部或年級細分。</PageHeader><section className="content-grid">{learningGroups.map((group) => <article className="content-card" key={group.title}><BookOpen weight="duotone" /><h2>{group.title}</h2><ul>{group.items.map((item) => <li key={item}>{item}<span>待補資料</span></li>)}</ul></article>)}</section></>; }
function Affairs() { return <><PageHeader eyebrow="SCHOOL LIFE" title="校園事務">把常用行政與校園生活資訊變成容易查找的主題清單。</PageHeader><section className="list-panel">{affairs.map((item, index) => <article key={item.title}><span className="list-index">0{index + 1}</span><div><h2>{item.title}</h2><p>{item.detail}</p></div><CaretRight /></article>)}</section></>; }
function Notices() { return <><PageHeader eyebrow="NOTICES" title="最新公告">未來可依全校、國中部、高中部及各年級分類，也可加入搜尋與置頂功能。</PageHeader><section className="notice-list">{notices.map((notice) => <article key={notice.title}><div><time>{notice.date}</time><span className="tag">{notice.audience}</span></div><div><h2>{notice.title}</h2><p>{notice.summary}</p></div></article>)}</section></>; }

createRoot(document.getElementById('root')).render(<React.StrictMode><Shell /></React.StrictMode>);
