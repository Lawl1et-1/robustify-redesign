"use client";

import { useSyncExternalStore } from "react";

// A tiny shared store for the demo build: its seed and whether the
// licensing server has revoked it. The 3D specimen, the readouts and the
// kill-switch demo all read from here so they stay in lockstep.

export type BuildState = { seed: number; serial: number; revoked: boolean };

let state: BuildState = { seed: 0x7f3a0412, serial: 412, revoked: false };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const buildStore = {
  get: () => state,
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  rebuild() {
    const seed = (Math.random() * 0xffffffff) >>> 0;
    state = { seed, serial: state.serial + 1, revoked: false };
    emit();
  },
  setRevoked(revoked: boolean) {
    state = { ...state, revoked };
    emit();
  },
};

export function useBuild() {
  return useSyncExternalStore(buildStore.subscribe, buildStore.get, buildStore.get);
}

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hex(n: number, len = 8) {
  return (n >>> 0).toString(16).toUpperCase().padStart(len, "0").slice(-len);
}

/** Deterministic per-build facts derived from the seed. */
export function buildFacts(seed: number) {
  const r = rng(seed);
  const configs = 20 + Math.floor(r() * 9);
  const hash = hex(Math.floor(r() * 0xffffffff)) + hex(Math.floor(r() * 0xffffffff));
  return { configs, hash, seedHex: hex(seed) };
}
