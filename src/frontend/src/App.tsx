import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  type Variants,
  motion,
  useInView,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Course } from "./backend.d";
import { useGetCourses, useSubmitEnquiry } from "./hooks/useQueries";

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// ─── Section Wrapper ─────────────────────────────────────────────────────────

function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", id: "home", ocid: "nav.home.link" },
    { label: "About", id: "about", ocid: "nav.about.link" },
    { label: "Courses", id: "courses", ocid: "nav.courses.link" },
    { label: "Why Us", id: "why-us", ocid: "nav.about.link" },
    { label: "Contact", id: "contact", ocid: "nav.contact.link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-insd-dark/95 backdrop-blur-xl border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="INSD Hisar home"
        >
          <img
            src="/assets/generated/insd-logo-transparent.dim_300x100.png"
            alt="INSD Hisar logo"
            className="h-8 w-auto object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              data-ocid={link.ocid}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-insd-terracotta group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <Button
            data-ocid="nav.apply.button"
            onClick={() => scrollTo("contact")}
            size="sm"
            className="bg-insd-terracotta hover:bg-insd-terracotta/90 text-white border-0 rounded-sm px-5 font-medium tracking-wide"
          >
            Apply Now
          </Button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-foreground p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-insd-dark/98 backdrop-blur-xl border-b border-border"
          >
            <nav
              className="flex flex-col py-4 px-6 gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid={link.ocid}
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-3 px-2 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/40 last:border-0 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                data-ocid="nav.apply.button"
                onClick={() => scrollTo("contact")}
                className="mt-3 bg-insd-terracotta hover:bg-insd-terracotta/90 text-white border-0 rounded-sm w-full font-medium"
              >
                Apply Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/hero-banner.dim_1400x600.jpg')`,
        }}
      />
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-insd-dark/75 via-insd-dark/60 to-insd-dark/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-insd-dark/80 via-transparent to-insd-dark/50" />

      {/* Atmospheric large text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[clamp(6rem,20vw,18rem)] text-white/[0.025] tracking-[0.3em] uppercase whitespace-nowrap">
          DESIGN
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase text-insd-terracotta border border-insd-terracotta/30 px-4 py-2 rounded-sm">
              <span className="w-4 h-px bg-insd-terracotta" />
              International School of Design
              <span className="w-4 h-px bg-insd-terracotta" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="font-display text-[clamp(2.8rem,7vw,6rem)] font-black leading-[0.95] tracking-tight text-foreground mb-6"
          >
            Shape Your
            <br />
            <span className="text-gradient-warm">Creative Future</span>
          </motion.h1>

          {/* Sub headline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Premier design education in Hisar — where imagination meets industry
            excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <Button
              data-ocid="hero.explore_courses.button"
              onClick={() => scrollTo("courses")}
              size="lg"
              className="bg-insd-terracotta hover:bg-insd-terracotta/90 text-white border-0 rounded-sm px-8 font-medium tracking-wide gap-2 group shadow-glow"
            >
              Explore Courses
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
            <Button
              data-ocid="hero.enquire.button"
              onClick={() => scrollTo("contact")}
              variant="outline"
              size="lg"
              className="rounded-sm px-8 font-medium tracking-wide border-foreground/30 hover:border-insd-terracotta hover:text-insd-terracotta bg-transparent text-foreground"
            >
              Enquire Now
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              { value: "15+", label: "Years" },
              { value: "6", label: "Programs" },
              { value: "500+", label: "Alumni" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl font-black text-insd-gold mb-0.5">
                  {value}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-muted-foreground to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  const highlights = [
    {
      icon: Award,
      title: "Nationally Accredited",
      desc: "Affiliated with International School of Design network",
    },
    {
      icon: Briefcase,
      title: "100% Placement",
      desc: "Dedicated placement cell with top-tier industry connections",
    },
    {
      icon: GraduationCap,
      title: "Expert Faculty",
      desc: "Industry practitioners with decades of design experience",
    },
    {
      icon: Palette,
      title: "Modern Studios",
      desc: "State-of-the-art design labs and creative workspaces",
    },
  ];

  return (
    <AnimatedSection
      id="about"
      className="relative py-24 md:py-32 bg-insd-surface overflow-hidden"
    >
      {/* Decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-insd-terracotta/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div variants={fadeInUp} className="mb-3">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-insd-terracotta">
                Our Story
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-tight text-foreground mb-6"
            >
              About <span className="text-insd-gold">INSD Hisar</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground leading-relaxed text-base mb-5"
            >
              INSD Hisar is a premier design institute, part of the prestigious
              International School of Design network — one of India's foremost
              design education brands. Located in the heart of Hisar, Haryana,
              we provide industry-aligned design education that bridges
              creativity with commercial excellence.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground leading-relaxed text-base mb-8"
            >
              Our curriculum is crafted in partnership with industry leaders,
              ensuring every graduate steps out ready to shape the visual world.
              From fashion design to interior spaces, digital media to graphic
              communication — we nurture the complete designer.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="outline"
                className="rounded-sm border-insd-terracotta/50 text-insd-terracotta hover:bg-insd-terracotta hover:text-white gap-2 group"
              >
                Get in Touch
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </motion.div>
          </div>

          {/* Right: Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                custom={i}
                className="group p-6 bg-insd-dark border border-border hover:border-insd-terracotta/40 rounded-sm transition-all duration-300 hover:shadow-card"
              >
                <div className="w-10 h-10 rounded-sm bg-insd-terracotta/10 flex items-center justify-center mb-4 group-hover:bg-insd-terracotta/20 transition-colors">
                  <Icon size={20} className="text-insd-terracotta" />
                </div>
                <h3 className="font-sans-custom font-semibold text-foreground text-sm mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────

function CourseCard({
  course,
  index,
}: {
  course: Course;
  index: number;
}) {
  const categoryColors: Record<string, string> = {
    Fashion: "bg-rose-500/15 text-rose-300 border-rose-500/20",
    Interior: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    Graphic: "bg-sky-500/15 text-sky-300 border-sky-500/20",
    Digital: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    default:
      "bg-insd-terracotta/15 text-insd-terracotta border-insd-terracotta/20",
  };

  const colorClass = categoryColors[course.category] || categoryColors.default;

  return (
    <motion.div
      variants={fadeInUp}
      data-ocid={`courses.item.${index + 1}`}
      className="group flex flex-col h-full bg-insd-surface border border-border hover:border-insd-terracotta/40 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
    >
      {/* Color strip at top based on category */}
      <div className="h-1 bg-gradient-to-r from-insd-terracotta via-insd-gold to-transparent" />

      <div className="p-6 flex flex-col flex-1">
        {/* Category + Level */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`text-[10px] font-medium tracking-wider uppercase border px-2 py-0.5 rounded-sm ${colorClass}`}
          >
            {course.category}
          </span>
          <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
            {course.level}
          </span>
        </div>

        <h3 className="font-display font-bold text-foreground text-lg leading-snug mb-3 group-hover:text-insd-gold transition-colors">
          {course.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BookOpen size={12} />
            <span>{course.duration}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-insd-terracotta hover:text-insd-terracotta hover:bg-insd-terracotta/10 rounded-sm gap-1 px-2 py-1 h-auto"
          >
            Learn More
            <ArrowRight size={12} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Courses Section ──────────────────────────────────────────────────────────

function CoursesSection() {
  const { data: courses, isLoading, isError } = useGetCourses();

  // Fallback courses if backend is unavailable
  const fallbackCourses: Course[] = [
    {
      id: BigInt(1),
      title: "Bachelor in Fashion Design",
      category: "Fashion",
      level: "Undergraduate",
      duration: "3 Years",
      description:
        "Comprehensive fashion design program covering garment construction, textile science, trend forecasting, and brand development for the modern fashion industry.",
    },
    {
      id: BigInt(2),
      title: "Diploma in Interior Design",
      category: "Interior",
      level: "Diploma",
      duration: "2 Years",
      description:
        "Master spatial design, architectural drawings, material selection, and client project management in this intensive interior design program.",
    },
    {
      id: BigInt(3),
      title: "Certificate in Graphic Design",
      category: "Graphic",
      level: "Certificate",
      duration: "1 Year",
      description:
        "Develop core visual communication skills — typography, branding, print, and digital layout — with industry-standard software and live project briefs.",
    },
    {
      id: BigInt(4),
      title: "Bachelor in Visual Communication",
      category: "Graphic",
      level: "Undergraduate",
      duration: "3 Years",
      description:
        "Explore advertising, illustration, motion graphics, and multimedia design in this creative program built for visual storytellers.",
    },
    {
      id: BigInt(5),
      title: "Diploma in Digital Design & UI/UX",
      category: "Digital",
      level: "Diploma",
      duration: "18 Months",
      description:
        "User experience design, interface prototyping, web design systems, and digital product thinking for the modern digital economy.",
    },
    {
      id: BigInt(6),
      title: "Certificate in Jewellery Design",
      category: "Fashion",
      level: "Certificate",
      duration: "1 Year",
      description:
        "Learn traditional and contemporary jewellery design techniques, gemology basics, CAD for jewellery, and entrepreneurship in the luxury accessories space.",
    },
  ];

  const displayCourses =
    courses && courses.length > 0 ? courses : isLoading ? [] : fallbackCourses;

  return (
    <AnimatedSection
      id="courses"
      className="relative py-24 md:py-32 bg-insd-dark overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.94 0.015 85) 1px, transparent 1px), linear-gradient(90deg, oklch(0.94 0.015 85) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <motion.div variants={fadeInUp} className="mb-3">
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-insd-terracotta">
              Programs
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-tight text-foreground mb-4"
          >
            Our Programs
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground text-base"
          >
            Six industry-aligned design programs crafted to ignite creativity
            and build real-world skills.
          </motion.p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div
            data-ocid="courses.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-insd-surface border border-border rounded-sm overflow-hidden"
              >
                <div className="h-1 bg-border" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-4 w-24 bg-secondary" />
                  <Skeleton className="h-6 w-3/4 bg-secondary" />
                  <Skeleton className="h-4 w-full bg-secondary" />
                  <Skeleton className="h-4 w-4/5 bg-secondary" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div
            data-ocid="courses.error_state"
            className="text-center py-12 text-muted-foreground"
          >
            <AlertCircle className="mx-auto mb-3 text-destructive" size={32} />
            <p>Unable to load courses. Showing default programs.</p>
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && (
          <motion.div
            variants={staggerContainer}
            data-ocid="courses.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayCourses.length === 0 ? (
              <div
                data-ocid="courses.empty_state"
                className="col-span-full text-center py-16 text-muted-foreground"
              >
                <Palette className="mx-auto mb-3 opacity-30" size={40} />
                <p>No courses available at the moment.</p>
              </div>
            ) : (
              displayCourses.map((course, i) => (
                <CourseCard key={String(course.id)} course={course} index={i} />
              ))
            )}
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}

// ─── Why Us Section ───────────────────────────────────────────────────────────

function WhyUsSection() {
  const features = [
    {
      icon: GraduationCap,
      title: "Industry-Expert Faculty",
      desc: "Learn from practicing designers and creative directors with decades of real-world experience.",
    },
    {
      icon: Building2,
      title: "Modern Studios & Labs",
      desc: "State-of-the-art design studios, computer labs, and dedicated material libraries.",
    },
    {
      icon: TrendingUp,
      title: "100% Placement Assistance",
      desc: "Dedicated placement cell with partnerships across top design studios, agencies, and brands.",
    },
    {
      icon: Users,
      title: "National Network",
      desc: "Part of INSD's pan-India network, giving you access to events, workshops, and opportunities.",
    },
    {
      icon: Palette,
      title: "Hands-on Learning",
      desc: "Project-based curriculum with real client briefs, industry visits, and live presentations.",
    },
    {
      icon: Star,
      title: "Scholarships Available",
      desc: "Merit-based and need-based scholarships to ensure deserving talent is never held back.",
    },
  ];

  return (
    <AnimatedSection
      id="why-us"
      className="relative py-24 md:py-32 bg-insd-surface overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-insd-gold/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <motion.div variants={fadeInUp} className="mb-3">
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-insd-terracotta">
              Why INSD Hisar
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-tight text-foreground mb-4"
          >
            Why Choose
            <br />
            <span className="text-insd-gold">INSD Hisar</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground text-base"
          >
            More than a design school — a launchpad for creative careers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              custom={i}
              className="group relative p-7 bg-insd-dark border border-border hover:border-insd-gold/30 rounded-sm transition-all duration-300 hover:shadow-glow-gold overflow-hidden"
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{
                  background:
                    "radial-gradient(circle at top right, oklch(0.75 0.15 78), transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div className="w-11 h-11 rounded-sm bg-insd-gold/10 flex items-center justify-center mb-5 group-hover:bg-insd-gold/20 transition-colors">
                <Icon size={22} className="text-insd-gold" />
              </div>

              <h3 className="font-sans-custom font-semibold text-foreground text-base mb-2.5">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── Contact / Enquiry Section ────────────────────────────────────────────────

function ContactSection() {
  const { data: courses } = useGetCourses();
  const submitEnquiry = useSubmitEnquiry();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseInterest: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const fallbackCourseOptions = [
    "Bachelor in Fashion Design",
    "Diploma in Interior Design",
    "Certificate in Graphic Design",
    "Bachelor in Visual Communication",
    "Diploma in Digital Design & UI/UX",
    "Certificate in Jewellery Design",
    "General Enquiry",
  ];

  const courseOptions =
    courses && courses.length > 0
      ? courses.map((c) => c.title)
      : fallbackCourseOptions;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.courseInterest)
      newErrors.courseInterest = "Please select a course";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitEnquiry.mutateAsync(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        courseInterest: "",
        message: "",
      });
    } catch {
      // Error handled via submitEnquiry.isError
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value: "INSD Hisar, Hisar, Haryana, India",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-XXXXXXXXXX",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@insdhisar.com",
    },
  ];

  return (
    <AnimatedSection
      id="contact"
      className="relative py-24 md:py-32 bg-insd-dark overflow-hidden"
    >
      {/* Background mesh */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "oklch(0.63 0.18 38)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "oklch(0.75 0.15 78)" }}
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <motion.div variants={fadeInUp} className="mb-3">
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-insd-terracotta">
              Admissions
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-tight text-foreground mb-4"
          >
            Start Your
            <br />
            <span className="text-insd-gold">Journey</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground text-base"
          >
            Ready to transform your passion into a profession? Reach out and our
            admissions team will guide you through the next steps.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={fadeInUp}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-sm bg-insd-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={18} className="text-insd-terracotta" />
                </div>
                <div>
                  <div className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                    {label}
                  </div>
                  <div className="text-foreground text-sm font-medium">
                    {value}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={fadeInUp}
              className="pt-6 border-t border-border"
            >
              <div className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Office Hours
              </div>
              <div className="text-sm text-foreground space-y-1">
                <p>Monday – Saturday</p>
                <p className="text-muted-foreground">9:00 AM – 6:00 PM</p>
              </div>
            </motion.div>
          </div>

          {/* Enquiry Form */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-3 bg-insd-surface border border-border rounded-sm p-8"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  data-ocid="enquiry.success_state"
                  className="text-center py-12"
                >
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={28} className="text-green-400" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-xl mb-2">
                    Enquiry Submitted!
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thank you for reaching out. Our admissions team will contact
                    you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="rounded-sm border-border text-muted-foreground hover:text-foreground"
                  >
                    Submit Another Enquiry
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="enquiry-name"
                        className="text-xs tracking-[0.12em] uppercase text-muted-foreground"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="enquiry-name"
                        data-ocid="enquiry.name.input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        className="rounded-sm bg-insd-dark border-border focus-visible:border-insd-terracotta focus-visible:ring-1 focus-visible:ring-insd-terracotta h-10"
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="enquiry-email"
                        className="text-xs tracking-[0.12em] uppercase text-muted-foreground"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="enquiry-email"
                        data-ocid="enquiry.email.input"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        className="rounded-sm bg-insd-dark border-border focus-visible:border-insd-terracotta focus-visible:ring-1 focus-visible:ring-insd-terracotta h-10"
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="enquiry-phone"
                      className="text-xs tracking-[0.12em] uppercase text-muted-foreground"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="enquiry-phone"
                      data-ocid="enquiry.phone.input"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="rounded-sm bg-insd-dark border-border focus-visible:border-insd-terracotta focus-visible:ring-1 focus-visible:ring-insd-terracotta h-10"
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Course Interest */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="enquiry-course"
                      className="text-xs tracking-[0.12em] uppercase text-muted-foreground"
                    >
                      Course Interest
                    </Label>
                    <Select
                      value={formData.courseInterest}
                      onValueChange={(v) =>
                        setFormData((p) => ({ ...p, courseInterest: v }))
                      }
                    >
                      <SelectTrigger
                        id="enquiry-course"
                        data-ocid="enquiry.course.select"
                        className="rounded-sm bg-insd-dark border-border focus:border-insd-terracotta focus:ring-1 focus:ring-insd-terracotta h-10"
                      >
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                      <SelectContent className="bg-insd-surface border-border rounded-sm">
                        {courseOptions.map((title) => (
                          <SelectItem
                            key={title}
                            value={title}
                            className="text-sm hover:bg-insd-dark focus:bg-insd-dark"
                          >
                            {title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.courseInterest && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.courseInterest}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="enquiry-message"
                      className="text-xs tracking-[0.12em] uppercase text-muted-foreground"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="enquiry-message"
                      data-ocid="enquiry.message.textarea"
                      placeholder="Tell us about yourself and what you're looking for..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      rows={4}
                      className="rounded-sm bg-insd-dark border-border focus-visible:border-insd-terracotta focus-visible:ring-1 focus-visible:ring-insd-terracotta resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error state */}
                  {submitEnquiry.isError && (
                    <div
                      data-ocid="enquiry.error_state"
                      className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-sm px-4 py-3"
                    >
                      <AlertCircle size={16} />
                      <span>
                        Something went wrong. Please try again or contact us
                        directly.
                      </span>
                    </div>
                  )}

                  <Button
                    data-ocid="enquiry.submit_button"
                    type="submit"
                    disabled={submitEnquiry.isPending}
                    className="w-full bg-insd-terracotta hover:bg-insd-terracotta/90 text-white border-0 rounded-sm h-11 font-medium tracking-wide gap-2"
                  >
                    {submitEnquiry.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const currentYear = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="relative bg-insd-surface border-t border-border py-14">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/insd-logo-transparent.dim_300x100.png"
              alt="INSD Hisar"
              className="h-8 w-auto mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Premier design education in Hisar, Haryana. Shaping India's next
              generation of creative professionals.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Quick Links
            </div>
            <nav className="flex flex-col gap-2">
              <button
                type="button"
                data-ocid="footer.home.link"
                onClick={() => scrollTo("home")}
                className="text-sm text-muted-foreground hover:text-foreground text-left transition-colors"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => scrollTo("about")}
                className="text-sm text-muted-foreground hover:text-foreground text-left transition-colors"
              >
                About
              </button>
              <button
                type="button"
                data-ocid="footer.courses.link"
                onClick={() => scrollTo("courses")}
                className="text-sm text-muted-foreground hover:text-foreground text-left transition-colors"
              >
                Courses
              </button>
              <button
                type="button"
                data-ocid="footer.contact.link"
                onClick={() => scrollTo("contact")}
                className="text-sm text-muted-foreground hover:text-foreground text-left transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Contact Us
            </div>
            <div className="space-y-2.5 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0 text-insd-terracotta"
                />
                INSD Hisar, Hisar, Haryana, India
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-insd-terracotta" />
                +91-XXXXXXXXXX
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-insd-terracotta" />
                info@insdhisar.com
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {currentYear} INSD Hisar. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with <span className="text-insd-terracotta">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-insd-surface border-border text-foreground",
        }}
      />
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <CoursesSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
