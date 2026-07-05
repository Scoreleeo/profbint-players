"use client";

import type { KeyboardEvent } from "react";

type SearchInputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export default function SearchInput({
  value,
  placeholder = "Search players...",
  onChange,
  onFocus,
  onKeyDown,
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        🔍
      </span>

      <input
        id="search"
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onChange={(event) => onChange?.(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/90 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
      />
    </div>
  );
}