import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS",] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "GraphQL"] },
    { category: "Tools", items: ["Git", "Docker", "Vercel", "Figma", "VS Code"] },
];

const PROJECTS = [
    {
        title: "Expense Tracker website",
        description: "A real-time Expense tracker app which is used to track our expense through a lot of commodities.",
        tags: ["HTML", "CSS", "JS"],
        link: "https://github.com/abelzeleke0949-cell/ExpenseTracker.git",
        accent: "#7C3AED",
    },
    {
        title: "To-Do-List App",
        description: "A Reminder App Which is used to show the events we were attended and will atended on the future with time and date.",
        tags: ["HTML", "CSS", "JS"],
        link: "https://github.com/abelzeleke0949-cell/To_Do-List_APP.git",
        accent: "#0EA5E9",
    },
    {
        title: "E-commerce Website",
        description: "Fully Integrated E-commerce website with product details and payment options too.",
        tags: ["Node.js", "React", "Tailwind", "Mongodb"],
        link: "https://github.com/gulitgebeya03-ops/Gulit.git",
        accent: "#10B981",
    },
];

function TypewriterText({ phrases }) {
    const [displayed, setDisplayed] = useState("");
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = phrases[phraseIdx];
        let timeout;
        if (!deleting && charIdx < current.length) {
            timeout = setTimeout(() => setCharIdx(c => c + 1), 65);
        } else if (!deleting && charIdx === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx(c => c - 1), 35);
        } else if (deleting && charIdx === 0) {
            setDeleting(false);
            setPhraseIdx(i => (i + 1) % phrases.length);
        }
        setDisplayed(current.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, phraseIdx, phrases]);

    return (
        <span>
            {displayed}
            <span className="animate-pulse text-violet-400">|</span>
        </span>
    );
}

function NavBar({ active, onNav }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0A0F]/95 backdrop-blur border-b border-[#2D2D44]" : "bg-transparent"}`}>
            <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
                <span className="font-mono text-violet-400 text-sm tracking-widest font-semibold">abel.dev</span>
                <ul className="hidden md:flex gap-8">
                    {NAV_LINKS.map(link => (
                        <li key={link}>
                            <button
                                onClick={() => onNav(link)}
                                className={`font-mono text-sm tracking-wide transition-colors ${active === link ? "text-violet-400" : "text-[#8888AA] hover:text-white"}`}
                            >
                                {link.toLowerCase()}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => setMenuOpen(o => !o)}
                    className="md:hidden text-[#8888AA] hover:text-white p-1"
                    aria-label="Toggle menu"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
                    </svg>
                </button>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-[#0A0A0F]/98 border-b border-[#2D2D44] px-6 pb-4">
                    {NAV_LINKS.map(link => (
                        <button key={link} onClick={() => { onNav(link); setMenuOpen(false); }} className="block w-full text-left font-mono text-sm text-[#8888AA] hover:text-white py-3 tracking-wide">
                            {link.toLowerCase()}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}

function Section({ id, children, className = "" }) {
    return (
        <section id={id} className={`max-w-5xl mx-auto px-6 ${className}`}>
            {children}
        </section>
    );
}

function SectionLabel({ children }) {
    return (
        <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase">{children}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-violet-900/60 to-transparent" />
        </div>
    );
}

export default function Portfolio() {
    const [activeNav, setActiveNav] = useState("");
    const sectionsRef = useRef({});

    const scrollTo = (id) => {
        const el = document.getElementById(id.toLowerCase());
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); }),
            { threshold: 0.4 }
        );
        NAV_LINKS.forEach(link => {
            const el = document.getElementById(link.toLowerCase());
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F5] font-sans">
            <NavBar active={activeNav} onNav={scrollTo} />

            {/* Hero */}
            <div className="relative min-h-screen flex flex-col justify-center max-w-5xl mx-auto px-6 pt-24 pb-16">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-violet-900/20 blur-3xl" />
                    <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-violet-800/10 blur-3xl" />
                </div>
                <p className="font-mono text-violet-500 text-sm tracking-widest mb-6">Hello, I'm</p>
                <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-4">
                    Abel Zeleke
                </h1>
                <h2 className="text-2xl md:text-4xl font-light text-[#8888AA] mb-8 min-h-[3rem]">
                    <TypewriterText phrases={["Web Developer", "UI Engineer", "Problem Solver", "Open Source Contributor"]} />
                </h2>
                <p className="text-[#8888AA] text-lg max-w-xl leading-relaxed mb-10">
                    I build fast, accessible web experiences that feel effortless to use. leveraging modern technologies like React, Tailwind CSS, Next.js for crafting highly responsive and intuitive
                    user interfaces. on the backend , i design robust architectures using Node.js , Express and MongoDB.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => scrollTo("Projects")}
                        className="px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors text-sm"
                    >
                        View my work →
                    </button>
                    <button
                        onClick={() => scrollTo("Contact")}
                        className="px-6 py-3 border border-[#2D2D44] hover:border-violet-700 text-[#8888AA] hover:text-white font-medium rounded-lg transition-colors text-sm"
                    >
                        Get in touch
                    </button>
                </div>

                <div className="absolute bottom-8 left-6 animate-bounce">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444466" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>

            {/* About */}
            <Section id="about" className="py-24">
                <SectionLabel>About me</SectionLabel>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-[#C0C0D8] leading-relaxed mb-5 text-lg">
                            I'm a front-end focused full-stack developer based in Addis Ababa. I care deeply about the craft , writing code that's readable, interfaces that respond to intent, and products that just work.
                        </p>

                    </div>
                    <div className="relative">
                        <div className="aspect-square max-w-sm mx-auto bg-[#1A1A2E] border border-[#2D2D44] rounded-2xl flex items-center justify-center overflow-hidden">
                            <div className="p-8 font-mono text-sm text-left w-full">
                                <p className="text-[#444466] mb-1">// pseudocode for my brain</p>
                                <p className="text-violet-400">const <span className="text-[#F0F0F5]">alex</span> = {"{"}</p>
                                <p className="ml-4 text-[#8888AA]">role: <span className="text-emerald-400">"web dev"</span>,</p>
                                <p className="ml-4 text-[#8888AA]">loves: [</p>
                                <p className="ml-8 text-emerald-400">"clean code",</p>
                                <p className="ml-8 text-emerald-400">"good UX",</p>
                                <p className="ml-8 text-emerald-400">"coffee ☕"</p>
                                <p className="ml-4 text-[#8888AA]">],</p>
                                <p className="ml-4 text-[#8888AA]">available: <span className="text-violet-400">true</span></p>
                                <p className="text-violet-400">{"}"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Skills */}
            <Section id="skills" className="py-24">
                <SectionLabel>Skills &amp; tools</SectionLabel>
                <div className="grid md:grid-cols-3 gap-6">
                    {SKILLS.map(({ category, items }) => (
                        <div key={category} className="bg-[#1A1A2E] border border-[#2D2D44] rounded-xl p-6 hover:border-violet-900 transition-colors">
                            <h3 className="font-mono text-xs text-violet-500 tracking-widest uppercase mb-5">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map(item => (
                                    <span key={item} className="font-mono text-xs bg-[#0A0A0F] border border-[#2D2D44] text-[#C0C0D8] px-3 py-1.5 rounded-md">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Projects */}
            <Section id="projects" className="py-24">
                <SectionLabel>Selected work</SectionLabel>
                <div className="grid md:grid-cols-3 gap-6">
                    {PROJECTS.map(({ title, description, tags, link, accent }) => (
                        <a
                            key={title}
                            href={link}
                            className="group bg-[#1A1A2E] border border-[#2D2D44] hover:border-[#3D3D5A] rounded-xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent + "22", border: `1px solid ${accent}44` }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                                    </svg>
                                </div>
                                <svg className="opacity-0 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="1.5">
                                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-base mb-2 text-[#F0F0F5]">{title}</h3>
                            <p className="text-sm text-[#8888AA] leading-relaxed flex-1 mb-5">{description}</p>
                            <div className="flex flex-wrap gap-1.5">
                                {tags.map(t => (
                                    <span key={t} className="font-mono text-[10px] tracking-wide text-[#8888AA] bg-[#0A0A0F] border border-[#2D2D44] px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </Section>

            {/* Contact */}
            <Section id="contact" className="py-24 pb-32">
                <SectionLabel>Get in touch</SectionLabel>
                <div className="max-w-xl">
                    <h2 className="text-3xl font-bold mb-4">Let's build something.</h2>
                    <p className="text-[#8888AA] leading-relaxed mb-10">
                        Currently open to freelance projects and full-time opportunities. If you have a problem worth solving, I'd love to hear about it.
                    </p>
                    <div className="space-y-4">
                        {[
                            { icon: "✉", label: "abelzeleke0949@gmail.com", href: "abelzeleke0949@gmail.com" },
                            { icon: "🐙", label: "github.com/abelzeleke0949-cell", href: "https://github.com/abelzeleke0949-cell" },
                            { icon: "💼", label: "linkedin.com/in/abel-zeleke-611409372", href: "https://linkedin.com/in/abel-zeleke-611409372" },
                        ].map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="flex items-center gap-4 bg-[#1A1A2E] border border-[#2D2D44] hover:border-violet-800 text-[#8888AA] hover:text-white rounded-lg px-5 py-4 transition-all group"
                            >
                                <span className="text-lg">{icon}</span>
                                <span className="font-mono text-sm">{label}</span>
                                <svg className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </Section>

            <footer className="border-t border-[#1A1A2E] py-8">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="font-mono text-[#444466] text-xs tracking-widest">abel.dev</span>
                    <span className="font-mono text-[#444466] text-xs">Built with React &amp; Tailwind CSS</span>
                </div>
            </footer>
        </div>
    );
}