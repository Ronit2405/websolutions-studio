import { useCallback, useEffect, useRef, useState } from "react";

export type RecorderStatus = "idle" | "requesting" | "recording" | "ready" | "unsupported";

export interface VoiceNote {
  /** Local blob URL so the customer can listen before sending. */
  url: string;
  /** Raw recording — used to share the same clip to WhatsApp. */
  blob: Blob;
  mimeType: string;
  fileName: string;
  seconds: number;
  size: number;
}

/** Keep recordings short so they stay light on mobile data. */
export const MAX_VOICE_SECONDS = 120;

const MIME_CANDIDATES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
];

function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined" || typeof MediaRecorder.isTypeSupported !== "function") {
    return undefined;
  }
  return MIME_CANDIDATES.find((type) => MediaRecorder.isTypeSupported(type));
}

function extensionFor(mimeType: string) {
  if (mimeType.includes("mp4")) return "m4a";
  if (mimeType.includes("ogg")) return "ogg";
  return "webm";
}

export function canRecordAudio() {
  return (
    typeof window !== "undefined" &&
    typeof window.MediaRecorder !== "undefined" &&
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    window.isSecureContext
  );
}

type RecorderErrorKey =
  | "Microphone permission was blocked. You can allow it from your browser settings, or type your requirement instead."
  | "No microphone was found on this device. Please type your requirement instead."
  | "Voice recording could not start on this browser. Please type your requirement instead."
  | "Something went wrong while recording. Please try again, or type your requirement instead.";

export function useVoiceRecorder() {
  const [supported] = useState(() => canRecordAudio());
  const [status, setStatus] = useState<RecorderStatus>(() => (canRecordAudio() ? "idle" : "unsupported"));
  const [seconds, setSeconds] = useState(0);
  const [note, setNote] = useState<VoiceNote | null>(null);
  const [error, setError] = useState<RecorderErrorKey | "">("");

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const secondsRef = useRef(0);
  const noteUrlRef = useRef<string | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const revokeUrl = useCallback(() => {
    if (noteUrlRef.current) {
      URL.revokeObjectURL(noteUrlRef.current);
      noteUrlRef.current = null;
    }
  }, []);

  const stopRecording = useCallback(() => {
    clearTimer();
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  }, [clearTimer]);

  const startRecording = useCallback(async () => {
    if (!supported) return;
    setError("");
    revokeUrl();
    setNote(null);
    setSeconds(0);
    secondsRef.current = 0;
    setStatus("requesting");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        clearTimer();
        stopTracks();
        const type = recorder.mimeType || mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        chunksRef.current = [];
        if (blob.size === 0) {
          setStatus("idle");
          setError("Something went wrong while recording. Please try again, or type your requirement instead.");
          return;
        }
        const url = URL.createObjectURL(blob);
        noteUrlRef.current = url;
        setNote({
          url,
          blob,
          mimeType: type,
          fileName: `voice-note.${extensionFor(type)}`,
          seconds: secondsRef.current,
          size: blob.size,
        });
        setStatus("ready");
      };

      recorder.onerror = () => {
        clearTimer();
        stopTracks();
        setStatus("idle");
        setError("Something went wrong while recording. Please try again, or type your requirement instead.");
      };

      recorderRef.current = recorder;
      recorder.start();
      setStatus("recording");

      timerRef.current = window.setInterval(() => {
        secondsRef.current += 1;
        setSeconds(secondsRef.current);
        if (secondsRef.current >= MAX_VOICE_SECONDS) stopRecording();
      }, 1000);
    } catch (err) {
      clearTimer();
      stopTracks();
      setStatus("idle");
      const name = (err as { name?: string })?.name;
      if (name === "NotAllowedError" || name === "SecurityError") {
        setError("Microphone permission was blocked. You can allow it from your browser settings, or type your requirement instead.");
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setError("No microphone was found on this device. Please type your requirement instead.");
      } else if (name === "NotReadableError" || name === "TrackStartError") {
        setError("Voice recording could not start on this browser. Please type your requirement instead.");
      } else {
        setError("Something went wrong while recording. Please try again, or type your requirement instead.");
      }
    }
  }, [clearTimer, revokeUrl, stopRecording, stopTracks, supported]);

  const discardNote = useCallback(() => {
    stopTracks();
    clearTimer();
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.onstop = null;
      recorder.stop();
    }
    recorderRef.current = null;
    chunksRef.current = [];
    revokeUrl();
    secondsRef.current = 0;
    setSeconds(0);
    setNote(null);
    setError("");
    setStatus(supported ? "idle" : "unsupported");
  }, [clearTimer, revokeUrl, stopTracks, supported]);

  // Release the microphone and object URLs when the page/component unmounts.
  useEffect(() => {
    return () => {
      clearTimer();
      stopTracks();
      const recorder = recorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        recorder.onstop = null;
        recorder.stop();
      }
      revokeUrl();
    };
  }, [clearTimer, revokeUrl, stopTracks]);

  return {
    supported,
    status,
    seconds,
    note,
    error,
    startRecording,
    stopRecording,
    discardNote,
  };
}

export function formatDuration(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds || 0));
  const minutes = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}
