"use client";

import { useMemo, useState } from "react";

interface ModelPickerProps {
  value: string[];
  onChange: (next: string[]) => void;
  suggestions: string[];
}

export function ModelPicker({ value, onChange, suggestions }: ModelPickerProps) {
  const [draft, setDraft] = useState("");

  const selectedSet = useMemo(() => new Set(value), [value]);
  const visibleSuggestions = useMemo(
    () => suggestions.filter((s) => !selectedSet.has(s)),
    [suggestions, selectedSet],
  );

  const add = (raw: string) => {
    const name = raw.trim();
    if (!name) return;
    if (selectedSet.has(name)) return;
    onChange([...value, name]);
  };

  const remove = (name: string) => {
    onChange(value.filter((m) => m !== name));
  };

  return (
    <div className="space-y-4">
      {/* Selected chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((m) => (
            <span
              key={m}
              className="inline-flex items-center gap-1.5 rounded-full bg-clay-50 px-3 py-1 text-xs font-medium text-clay-700"
            >
              <span className="h-1 w-1 rounded-full bg-clay-600" />
              {m}
              <button
                type="button"
                onClick={() => remove(m)}
                aria-label={`移除 ${m}`}
                className="ml-1 text-clay-700/60 transition-colors hover:text-clay-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Free-text input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(draft);
              setDraft("");
            }
          }}
          placeholder="输入模型名称，回车添加（如 Claude Opus 4.7）"
          className="field-input flex-1"
        />
        <button
          type="button"
          onClick={() => {
            add(draft);
            setDraft("");
          }}
          className="btn-secondary shrink-0"
        >
          添加
        </button>
      </div>

      {/* Suggestion grid */}
      {visibleSuggestions.length > 0 && (
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-ink-500">
            常用模型
          </p>
          <div className="flex flex-wrap gap-2">
            {visibleSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => add(s)}
                className="rounded-full border border-ivory-300 bg-ivory-50 px-3 py-1 text-xs text-ink-700 transition-colors hover:border-clay-600 hover:bg-white hover:text-clay-700"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
