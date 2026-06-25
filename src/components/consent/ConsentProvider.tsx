"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Region = "eu" | "row";
export type Consent = "granted" | "denied" | "unset";

const CONSENT_KEY = "stonehenge-trust-consent";

function readRegion(): Region {
  if (typeof document === "undefined") return "eu";
  const m = document.cookie.match(/(?:^|;\s*)sht-region=(eu|row)/);
  return (m?.[1] as Region) ?? "eu";
}

type ConsentCtx = {
  region: Region;
  consent: Consent;
  bannerOpen: boolean;
  analyticsEnabled: boolean;
  accept: () => void;
  reject: () => void;
  openSettings: () => void;
};

const Ctx = createContext<ConsentCtx>({
  region: "eu",
  consent: "unset",
  bannerOpen: false,
  analyticsEnabled: false,
  accept: () => {},
  reject: () => {},
  openSettings: () => {},
});

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [region, setRegion] = useState<Region>("eu");
  const [consent, setConsent] = useState<Consent>("unset");
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    setRegion(readRegion());
    let stored: Consent = "unset";
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      if (v === "granted" || v === "denied") stored = v;
    } catch {
      /* localStorage unavailable */
    }
    setConsent(stored);
    setBannerOpen(stored === "unset");
    setMounted(true);
  }, []);

  const persist = (c: Consent) => {
    setConsent(c);
    try {
      localStorage.setItem(CONSENT_KEY, c);
    } catch {
      /* ignore */
    }
    setBannerOpen(false);
  };

  const analyticsEnabled =
    mounted && (region === "eu" ? consent === "granted" : consent !== "denied");

  return (
    <Ctx.Provider
      value={{
        region,
        consent,
        bannerOpen: mounted && bannerOpen,
        analyticsEnabled,
        accept: () => persist("granted"),
        reject: () => persist("denied"),
        openSettings: () => setBannerOpen(true),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useConsent() {
  return useContext(Ctx);
}
