import { useCallback, useEffect, useState } from "react";
import { ArrowUp, ArrowRight } from "lucide-react";
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
  const h = window.location.hash;
  if (h === "#/services") return "services";
  if (h === "#/about") return "about";
  if (h === "#/work") return "work";
  if (h === "#/contact") return "contact";
  if (h === "#/privacy") return "privacy";
  if (h === "#/terms") return "terms";
  if (h === "#/" || h === "") return "home";
  return "404";
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
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B1E3A] text-white shadow-lg transition-colors hover:bg-[#1E5CC8]"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

function HomeCta() {
  return (
    <section className="bg-[#0B1E3A] py-16 sm:py-20" aria-label="Call to action">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-[Manrope] text-[26px] font-extrabold tracking-tight text-white sm:text-[32px] sm:leading-[1.15]">
              Have a project in mind? Let&apos;s deliver it — properly.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slate-400">
              Tell us your requirement and we&apos;ll get back with a practical plan. No pressure, no vague promises — just clear next steps.
            </p>
          </div>
          <a
            href="#/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1E5CC8] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#16468F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E3A]"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
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
    window.location.hash = "#/contact";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#1E5CC8] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar route={route} />
      {route === "privacy" ? (
        <PrivacyPage />
      ) : route === "terms" ? (
        <TermsPage />
      ) : route === "404" ? (
        <NotFoundPage />
      ) : route === "services" ? (
        <main id="main" className="pt-[72px]">
          <Services onSelectService={handleSelectService} />
        </main>
      ) : route === "about" ? (
        <main id="main" className="pt-[72px]">
          <About />
        </main>
      ) : route === "work" ? (
        <main id="main" className="pt-[72px]">
          <Portfolio />
        </main>
      ) : route === "contact" ? (
        <main id="main" className="pt-[72px]">
          <Contact selectedService={selectedService} onServiceChange={setSelectedService} />
        </main>
      ) : (
        <main id="main">
          <Hero />
          <WhyUs />
          <HomeCta />
        </main>
      )}
      <Footer />
      <BackToTop />
    </div>
  );
}
