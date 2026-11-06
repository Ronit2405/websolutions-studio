import {
  CheckCircle2,
  Loader2,
  Mic,
  RotateCcw,
  Square,
  Trash2,
} from "lucide-react";
import { useLanguage } from "../i18n";
import {
  MAX_VOICE_SECONDS,
  formatDuration,
  type RecorderStatus,
  type VoiceNote,
} from "../utils/useVoiceRecorder";

interface Props {
  supported: boolean;
  status: RecorderStatus;
  seconds: number;
  note: VoiceNote | null;
  error: string;
  onStart: () => void;
  onStop: () => void;
  onDiscard: () => void;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function VoiceNoteField({
  supported,
  status,
  seconds,
  note,
  error,
  onStart,
  onStop,
  onDiscard,
}: Props) {
  const { t } = useLanguage();
  const isRecording = status === "recording";
  const isRequesting = status === "requesting";

  return (
    <div className="mt-5 min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:p-4">
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        <p className="flex min-w-0 items-center gap-2 text-[13.5px] font-semibold text-slate-700">
          <Mic className="h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
          <span className="min-w-0 break-words">{t("Prefer not to type? Leave a voice message")}</span>
        </p>
        <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200">
          {t("Optional")}
        </span>
      </div>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
        {t("Type your requirement above, or record it in your own voice — whichever is easier for you. Your voice message reaches us on WhatsApp after you submit the form.")}
      </p>

      {!supported && (
        <p className="mt-3 rounded-lg bg-white px-3 py-2.5 text-[12.5px] leading-relaxed text-slate-500 ring-1 ring-slate-200">
          {t("Voice recording is not supported on this browser. Please type your requirement instead.")}
        </p>
      )}

      {supported && isRecording && (
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-[13px] font-semibold text-red-700 ring-1 ring-red-200">
            <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-red-600" aria-hidden="true" />
            {t("Recording…")} {formatDuration(seconds)} / {formatDuration(MAX_VOICE_SECONDS)}
          </span>
          <button
            type="button"
            onClick={onStop}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#0B1220] px-4 py-2.5 text-[13.5px] font-semibold text-white hover:bg-slate-800 sm:flex-none"
          >
            <Square className="h-4 w-4" aria-hidden="true" /> {t("Stop & use this")}
          </button>
          <button
            type="button"
            onClick={onDiscard}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-[13.5px] font-semibold text-slate-600 hover:border-slate-400"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" /> {t("Cancel")}
          </button>
        </div>
      )}

      {supported && (status === "idle" || isRequesting) && (
        <button
          type="button"
          onClick={onStart}
          disabled={isRequesting}
          className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#2563EB] bg-white px-4 py-3 text-[13.5px] font-semibold text-[#2563EB] transition-colors hover:bg-blue-50 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {isRequesting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t("Waiting for microphone permission…")}
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" aria-hidden="true" />
              {t("Record voice message")}
            </>
          )}
        </button>
      )}

      {supported && status === "ready" && note && (
        <div className="mt-3 min-w-0">
          <audio
            controls
            preload="metadata"
            src={note.url}
            aria-label={t("Voice message preview")}
            className="voice-player"
          />
          <p className="mt-1.5 flex min-w-0 items-start gap-1.5 text-[12px] leading-relaxed font-medium text-emerald-700">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="min-w-0 break-words">
              {formatDuration(note.seconds)} · {formatSize(note.size)} · {t("Voice message ready")}
            </span>
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-slate-700 hover:border-slate-400"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> {t("Record again")}
            </button>
            <button
              type="button"
              onClick={onDiscard}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-slate-600 hover:border-red-300 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" /> {t("Remove")}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-2.5 text-[12.5px] leading-relaxed font-medium text-red-600">
          {t(error)}
        </p>
      )}
    </div>
  );
}
