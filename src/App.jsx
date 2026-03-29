"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

const projects = [
  {
    title: "Small Flock",
    tag: "SaaS / Agriculture",
    year: "2024",
    desc: "Poultry management platform with subscriptions, dashboards, flock tracking, and community workflows.",
    stack: ["Bubble.io", "Stripe", "Responsive Web App"],
    metrics: ["Mobile-first UX", "Subscription flows", "Centralized data tracking"],
    details: [
      "Built core product workflows for flock tracking and operational management.",
      "Implemented subscription-related flows and responsive UI patterns.",
      "Focused on usability, dashboard clarity, and structured data handling.",
    ],
    contributionTitle: "Project details",
    link: "https://smallflock.io/",
  },
  {
    title: "Eight Times Eight",
    tag: "CRM / Education",
    year: "2025",
    desc: "Chess academy CRM focused on scheduling, attendance, and reducing repetitive admin work.",
    stack: ["Bubble.io", "Automation", "Admin Dashboard"],
    metrics: [
      "Attendance Manager (real-time batch tracking)",
      "WhatsApp notifications (automated updates)",
      "Batch management & scheduling",
      "Advanced CRM (student & tutor visibility)",
      "Admin dashboard insights",
      "Class scheduling system",
      "LMS integration",
    ],
    details: [
      "Built scheduling and attendance workflows to reduce repetitive admin effort.",
      "Implemented batch-level controls and improved operational visibility.",
      "Worked on CRM-style flows for managing tutors, students, and class activity.",
    ],
    contributionTitle: "Project details",
  },
  {
    title: "Pivot Blogs",
    tag: "Content / Monetization",
    year: "2025",
    desc: "Publishing platform for niche content with payments, audience engagement, and creator monetization.",
    stack: ["Bubble.io", "Stripe", "Content Workflows"],
    metrics: ["Creator monetization", "Engagement features", "Scalable publishing setup"],
    details: [
      "Worked on publishing and monetization-related workflows for creators.",
      "Helped structure content experiences around engagement and payments.",
      "Focused on scalability and smooth user interaction across the platform.",
    ],
    contributionTitle: "Project details",
  },
  {
    title: "Long Shot",
    tag: "Gaming / Community",
    year: "2025",
    desc: "Odds-based platform with leaderboard dynamics, wallet tracking, and competitive user experiences.",
    stack: ["Bubble.io", "Real-time Logic", "Gamification"],
    metrics: ["Leaderboard system", "Wallet flows", "Engagement loops"],
    details: [
      "Built interaction flows around leaderboard movement and user engagement.",
      "Contributed to wallet-related experiences and competitive product mechanics.",
      "Improved the product feel with more dynamic and repeatable user loops.",
    ],
    contributionTitle: "Project details",
  },
  {
    title: "Proseek Connect",
    tag: "Marketplace / Fitness",
    year: "2026",
    desc: "Fitness marketplace where I contributed to QA systems, webinar features, and mobile optimization for app store deployment.",
    stack: ["Bubble.io", "AWS", "Mobile Optimization"],
    metrics: [
      "QA feature development",
      "Webinar system implementation",
      "Performance optimization",
      "Mobile app readiness (Play Store & App Store)",
    ],
    details: [
      "Contributed specific product work rather than building the full platform end to end.",
      "Built QA-related features and webinar functionality within the existing app.",
      "Optimized the product for mobile and helped make it ready for Play Store and App Store availability.",
    ],
    contributionTitle: "My contribution",
  },
];

const skills = [
  "Bubble.io Development",
  "MVP Building",
  "Product Strategy",
  "Responsive Design",
  "API Integrations",
  "Stripe Payments",
  "Dashboard UX",
  "Workflow Automation",
];

const stats = [
  { label: "Years building", value: "2.5+" },
  { label: "Products shipped", value: "7+" },
  { label: "Focus", value: "MVPs" },
  { label: "Specialty", value: "No-code SaaS" },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function runPortfolioSmokeTests() {
  assert(Array.isArray(projects) && projects.length > 0, "Expected at least one project.");
  assert(Array.isArray(skills) && skills.length > 0, "Expected at least one skill.");
  assert(Array.isArray(stats) && stats.length > 0, "Expected at least one stat.");
  assert(
    new Set(projects.map((project) => project.title)).size === projects.length,
    "Project titles must be unique."
  );
  assert(
    stats.every((item) => item.label && item.value),
    "Each stat must include both a label and value."
  );
  assert(
    skills.every((skill) => typeof skill === "string" && skill.trim().length > 0),
    "Every skill must be a non-empty string."
  );
  assert(
    projects.every((project) => project.year && /^\d{4}$/.test(project.year)),
    "Each project year must be a 4-digit string."
  );
  assert(
    projects.every((project) => typeof project.desc === "string" && project.desc.length > 20),
    "Each project description should be meaningful."
  );
  assert(
    projects.every(
      (project) => typeof project.contributionTitle === "string" && project.contributionTitle.length > 0
    ),
    "Each project must include a contribution title."
  );
  assert(
    projects.filter((project) => project.link).every((project) => /^https?:\/\//.test(project.link)),
    "Each project link must be an absolute URL when present."
  );

  projects.forEach((project, index) => {
    assert(Boolean(project.title), `Project at index ${index} is missing a title.`);
    assert(Boolean(project.tag), `Project "${project.title || index}" is missing a tag.`);
    assert(Boolean(project.desc), `Project "${project.title || index}" is missing a description.`);
    assert(Array.isArray(project.stack), `Project "${project.title || index}" must have a stack array.`);
    assert(
      project.stack.length > 0,
      `Project "${project.title || index}" must include at least one stack item.`
    );
    assert(
      Array.isArray(project.metrics),
      `Project "${project.title || index}" must have a metrics array.`
    );
    assert(
      project.metrics.length > 0,
      `Project "${project.title || index}" must include at least one metric.`
    );
    assert(
      Array.isArray(project.details),
      `Project "${project.title || index}" must have a details array.`
    );
    assert(
      project.details.length >= 2,
      `Project "${project.title || index}" should include at least two detail points.`
    );
    assert(
      project.details.every((detail) => typeof detail === "string" && detail.trim().length > 10),
      `Project "${project.title || index}" contains an invalid detail item.`
    );
  });
}

runPortfolioSmokeTests();

function IconBase({ className = "h-4 w-4", children, viewBox = "0 0 24 24" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </IconBase>
  );
}

function BriefcaseIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </IconBase>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 14v5H5V5h5" />
    </IconBase>
  );
}

function GithubIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </IconBase>
  );
}

function MailIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </IconBase>
  );
}

function SparklesIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
      <path d="M5 18l.9 2.1L8 21l-2.1.9L5 24l-.9-2.1L2 21l2.1-.9L5 18Z" />
      <path d="M19 14l1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" />
    </IconBase>
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-sky-500">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-slate-400">{copy}</p> : null}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[2rem] border border-white/10 bg-slate-950 p-8 text-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-sky-300">{project.tag}</p>
            <h3 id="project-modal-title" className="mt-2 text-3xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">{project.desc}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
            type="button"
          >
            Close
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-medium text-sky-300">{project.contributionTitle}</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {project.details.map((detail) => (
              <li key={detail} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-slate-400">Highlights</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.metrics.map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>

        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-1"
          >
            Visit live project <ExternalLinkIcon className="h-4 w-4" />
          </a>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const headerRef = useRef(null);

  const handleNavClick = (event, targetId) => {
    event.preventDefault();

    const target = document.getElementById(targetId);
    if (!target) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const extraOffset = 24;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(targetTop - headerHeight - extraOffset, 0),
      behavior: "smooth",
    });
  };

  return (
    <div className="dark min-h-screen bg-slate-950 text-white transition-colors duration-300">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8rem] top-16 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute right-[-6rem] top-48 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(148,163,184,0.08)_50%,transparent_100%)] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <header ref={headerRef} className="sticky top-4 z-30 mb-8 py-4">
            <div className="mx-auto flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-6 py-3 shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold shadow-sm">
                  S
                </div>
                <div>
                  <p className="font-semibold tracking-tight">Sreejith C S</p>
                  <p className="text-sm text-slate-400">Bubble.io Developer</p>
                </div>
              </div>

              <nav className="hidden items-center gap-6 md:flex">
                <a
                  href="#projects"
                  onClick={(event) => handleNavClick(event, "projects")}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  Projects
                </a>
                <a
                  href="#skills"
                  onClick={(event) => handleNavClick(event, "skills")}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  Skills
                </a>
                <a
                  href="#about"
                  onClick={(event) => handleNavClick(event, "about")}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  About
                </a>
                <a
                  href="#contact"
                  onClick={(event) => handleNavClick(event, "contact")}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  Contact
                </a>
              </nav>

              <div className="hidden w-[120px] md:block" aria-hidden="true" />
            </div>
          </header>

          <main>
            <section id="home" className="grid min-h-[92vh] items-center gap-12 pb-20 pt-8 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm text-sky-300"
                >
                  <SparklesIcon className="h-4 w-4" />
                  Open to full-time roles
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
                >
                  I build scalable <span className="text-sky-500">Apps</span> that feel fast and ready to launch.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
                >
                  I help founders turn ideas into functional products with clean UX, scalable workflows,
                  and production-ready no-code systems.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="mt-10 flex flex-wrap items-center gap-4"
                >
                  <a
                    href="#projects"
                    onClick={(event) => handleNavClick(event, "projects")}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-950 shadow-lg transition hover:-translate-y-1"
                  >
                    View projects <ArrowRightIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="#contact"
                    onClick={(event) => handleNavClick(event, "contact")}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:-translate-y-1"
                  >
                    Let&apos;s work together <MailIcon className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Role</p>
                        <p className="text-xl font-semibold">No-code Product Builder</p>
                      </div>
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                        Open to projects
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {stats.map((item, i) => (
                        <motion.div
                          key={item.label}
                          variants={fadeUp}
                          initial="hidden"
                          animate="visible"
                          custom={i + 1}
                          className="rounded-2xl border border-white/10 p-5"
                        >
                          <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                          <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 p-5">
                      <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
                        <BriefcaseIcon className="h-4 w-4" />
                        Project focus
                      </div>
                      <p className="text-sm leading-7 text-slate-300">
                        SaaS dashboards, marketplaces, education tools, monetization systems, scheduling
                        flows, and operational products.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="projects" className="py-20">
              <SectionHeading
                eyebrow="Featured work"
                title="Selected projects and product builds"
                copy="A few projects that showcase my approach to UX, workflow design, integrations, and MVP execution."
              />

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                {projects.map((project, i) => (
                  <motion.button
                    key={project.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={i}
                    onClick={() => setSelectedProject(project)}
                    className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-7 text-left shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-sky-500">{project.tag}</p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs">
                        {project.year}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-300">{project.desc}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-sm text-slate-400">Click to view details</div>
                      <div className="inline-flex items-center gap-1 text-sm font-medium text-sky-500">
                        Explore
                        <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            <section id="skills" className="py-20">
              <SectionHeading
                eyebrow="Capabilities"
                title="What I can help you build"
                copy="From idea validation to launch-ready workflows, I focus on products that are clear, useful, and easy to maintain."
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={i}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm font-medium shadow-sm backdrop-blur"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="about" className="py-20">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <SectionHeading
                  eyebrow="About me"
                  title="I care about clean UX and useful product systems"
                  copy="I enjoy taking rough product ideas and shaping them into usable, thoughtful experiences. My work usually sits at the intersection of speed, clarity, and practical business needs."
                />

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur">
                  <p className="text-base leading-8 text-slate-300">
                    Over the last 2.5+ years, I&apos;ve worked on platforms spanning agriculture, education,
                    publishing, fitness, and community products. I focus on building strong MVP foundations,
                    responsive interfaces, and workflows that scale without becoming hard to manage.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-950">Fast execution</span>
                    <span className="rounded-full border border-white/10 px-4 py-2 text-sm">
                      Scalable logic
                    </span>
                    <span className="rounded-full border border-white/10 px-4 py-2 text-sm">
                      Founder-friendly
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" className="py-20">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900 px-8 py-10 text-white shadow-2xl">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Contact</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                      Need a polished MVP or Bubble.io build?
                    </h2>
                    <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                      I&apos;m open to freelance projects, product collaborations, and helping founders launch
                      faster with better UX.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 lg:justify-end">
                    <a
                      href="mailto:sreejithcs936@gmail.com"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-1"
                    >
                      <MailIcon className="h-4 w-4" />
                      sreejithcs936@gmail.com
                    </a>

                    <a
                      href="tel:7306016427"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-1"
                    >
                      📞 7306016427
                    </a>

                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-1"
                    >
                      <GithubIcon className="h-4 w-4" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="border-t border-white/10 py-8 text-sm text-slate-400">
            © 2026 Sreejith. Built with Bubble experience, product thinking, and clean interfaces.
          </footer>
        </div>

        <AnimatePresence>
          {selectedProject ? (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}