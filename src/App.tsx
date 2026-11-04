import { useCallback, useEffect, useState } from "react";
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

type Route = "home" | "privacy" | "terms" | "404";

function routeFromHash(): Route {
  const h = window.location.hash;
  if (h === "#/privacy") return "privacy";
  if (h === "#/terms") return "terms";
  if (h.startsWith("#/")) return "404";
  return "home";
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
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useReveal(route);

  const handleSelectService = useCallback((formValue: string) => {
    setSelectedService(formValue);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#2563EB] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      {route === "privacy" ? (
        <PrivacyPage />
      ) : route === "terms" ? (
        <TermsPage />
      ) : route === "404" ? (
        <NotFoundPage />
      ) : (
        <main id="main">
          <Hero />
          <Services onSelectService={handleSelectService} />
          <WhyUs />
          <About />
          <Portfolio />
          <Contact selectedService={selectedService} onServiceChange={setSelectedService} />
        </main>
      )}
      <Footer />
      <BackToTop />
    </div>
  );
}
