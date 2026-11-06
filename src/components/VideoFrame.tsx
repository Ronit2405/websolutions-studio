import { useMemo } from "react";
import { CirclePlay, Play } from "lucide-react";
import { useLanguage } from "../i18n";

/**
 * Turns a pasted YouTube / Vimeo / direct-video link into an embeddable source.
 * Returns null when the link is empty or not recognised.
 */
export function toEmbedUrl(url: string): string | null {
  const clean = url.trim();
  if (!clean) return null;

  const youtube = clean.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/i
  );
  if (youtube) {
    return `https://www.youtube.com/embed/${youtube[1]}?rel=0&modestbranding=1&playsinline=1`;
  }

  const vimeo = clean.match(/vimeo\.com\/(?:video\/)?(\d{5,})/i);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  if (/\.(mp4|webm|ogg|ogv|mov)(\?.*)?$/i.test(clean)) return clean;

  return null;
}

interface VideoFrameProps {
  /** Video link for this slot. Leave null to keep the reserved placeholder box. */
  video: string | null;
  title: string;
  label?: string;
  /** Optional line shown inside the placeholder (already translated). */
  note?: string;
  className?: string;
}

/**
 * Reserved, responsive 16:9 video slot (services and project cards).
 * When `video` is empty it renders a polished "coming soon" frame instead of an
 * empty box, so the layout already looks finished before videos are added.
 */
export default function VideoFrame({ video, title, label, note, className = "" }: VideoFrameProps) {
  const { t } = useLanguage();
  const src = useMemo(() => (video ? toEmbedUrl(video) : null), [video]);

  if (src && /\.(mp4|webm|ogg|ogv|mov)(\?.*)?$/i.test(src)) {
    return (
      <div className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-[#0B1220] shadow-sm ${className}`}>
        <video
          className="aspect-video h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          aria-label={title}
        >
          <source src={src} />
        </video>
      </div>
    );
  }

  if (src) {
    return (
      <div className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-[#0B1220] shadow-sm ${className}`}>
        <iframe
          className="aspect-video h-full w-full"
          src={src}
          title={label ? `${label} — ${title}` : title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  // Reserved placeholder — no link added yet.
  return (
    <div
      className={`relative flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-[#0B1220] px-4 text-center ${className}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(37,99,235,0.35) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/85 ring-1 ring-white/15 sm:left-4 sm:top-4 sm:text-[11px]">
        <CirclePlay className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {label ?? t("Explainer Video")}
      </span>

      <span className="absolute right-3 top-3 rounded-full bg-[#38BDF8] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0B1220] sm:right-4 sm:top-4 sm:text-[11px]">
        {t("Coming soon")}
      </span>

      <span className="relative mt-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur sm:mt-6 sm:h-16 sm:w-16">
        <Play className="ml-0.5 h-5 w-5 shrink-0 fill-current sm:h-6 sm:w-6" aria-hidden="true" />
      </span>

      <p className="relative mt-2.5 text-[12.5px] font-semibold leading-snug text-white sm:mt-4 sm:text-[15px]">
        {t("Video coming soon")}
      </p>
      <p className="relative mt-1 hidden max-w-[18rem] text-[12px] leading-relaxed text-slate-300 sm:block sm:max-w-sm sm:text-[12.5px]">
        {note ?? t("We are recording a short walkthrough for this service. This space is reserved for it.")}
      </p>

    </div>
  );
}
