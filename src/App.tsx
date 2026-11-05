import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { PrivacyPage, TermsPage, NotFoundPage } from "./components/Legal";

type Route = "home" | "services" | "about" | "work" | "contact" | "privacy" | "terms" | "404";

function routeFromHash(): Route {
  const hash = window.location.hash;
  const slug = hash.startsWith("#/") ? hash.slice(2).split(/[/?]/)[0] : hash.slice(1);

  if (!slug || slug === "home") return "home";
  if (slug === "services") return "services";
  if (slug === "about") return "about";
  if (slug === "work" || slug === "portfolio") return "work";
  if (slug === "contact") return "contact";
  if (slug === "privacy") return "privacy";
  if (slug === "terms") return "terms";
  return hash.startsWith("#/") ? "404" : "home";
}

function useReveal(route: Route) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [route]);
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B1220] text-white shadow-lg transition-colors hover:bg-[#2563EB]"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash());
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash());
      window.scrollTo({ top: 0, left: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useReveal(route);

  const handleSelectService = useCallback((formValue: string) => {
    setSelectedService(formValue);
    window.location.hash = "#/contact";
  }, []);

  let pageContent: ReactNode;
  switch (route) {
    case "services":
      pageContent = <Services onSelectService={handleSelectService} />;
      break;
    case "about":
      pageContent = <><About /><WhyUs /></>;
      break;
    case "work":
      pageContent = <Portfolio />;
      break;
    case "contact":
      pageContent = <Contact selectedService={selectedService} onServiceChange={setSelectedService} />;
      break;
    case "privacy":
      pageContent = <PrivacyPage />;
      break;
    case "terms":
      pageContent = <TermsPage />;
      break;
    case "404":
      pageContent = <NotFoundPage />;
      break;
    default:
      pageContent = <Hero />;
  }

  useEffect(() => {
    const pageTitles: Record<Route, string> = {
      home: "WebSolutions Studio — Smart Digital Solutions for Growing Businesses",
      services: "Services — WebSolutions Studio",
      about: "About Us — WebSolutions Studio",
      work: "Our Work — WebSolutions Studio",
      contact: "Contact — WebSolutions Studio",
      privacy: "Privacy Policy — WebSolutions Studio",
      terms: "Terms & Conditions — WebSolutions Studio",
      "404": "Page Not Found — WebSolutions Studio",
    };
    document.title = pageTitles[route];
  }, [route]);

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#2563EB] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar activePage={route} />
      <main id="main-content" tabIndex={-1} key={route} className="min-w-0 outline-none">
        {pageContent}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
