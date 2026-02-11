"use client";

import { TooltipIcon } from "./Tooltip";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
  colorClass?: "emerald" | "teal" | "amber" | "red";
  type?: "text" | "number";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  id?: string;
}

const focusColorClasses = {
  emerald: "focus:border-emerald-500 focus:ring-emerald-500/20",
  teal: "focus:border-teal-500 focus:ring-teal-500/20",
  amber: "focus:border-amber-500 focus:ring-amber-500/20",
  red: "focus:border-red-500 focus:ring-red-500/20",
};

const labelColorClasses = {
  emerald: "text-emerald-700 dark:text-emerald-400",
  teal: "text-teal-700 dark:text-teal-400",
  amber: "text-amber-700 dark:text-amber-400",
  red: "text-red-700 dark:text-red-400",
};

export function InputField({
  label,
  value,
  onChange,
  error,
  prefix,
  suffix,
  tooltip,
  colorClass = "emerald",
  type = "text",
  placeholder,
  min,
  max,
  step,
  disabled = false,
  id,
}: InputFieldProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const hasError = !!error;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center">
        <label
          htmlFor={inputId}
          className={`block text-sm font-semibold ${
            hasError ? "text-red-600 dark:text-red-400" : labelColorClasses[colorClass]
          } transition-colors duration-200`}
        >
          {label}
        </label>
        {tooltip && <TooltipIcon content={tooltip} />}
      </div>

      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              {prefix}
            </span>
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`
            w-full py-3 rounded-xl
            ${prefix ? "pl-10" : "pl-4"}
            ${suffix ? "pr-12" : "pr-4"}
            border-2 transition-all duration-200
            ${
              hasError
                ? "border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-950/20"
                : `border-slate-200 dark:border-slate-700 ${focusColorClasses[colorClass]} focus:ring-4`
            }
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800" : ""}
          `}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
        />

        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              {suffix}
            </span>
          </div>
        )}
      </div>

      <div
        className={`
          overflow-hidden transition-all duration-200
          ${hasError ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <p
          id={`${inputId}-error`}
          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
          role="alert"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      </div>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  tooltip?: string;
  colorClass?: "emerald" | "teal" | "amber" | "red";
  disabled?: boolean;
  id?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  tooltip,
  colorClass = "emerald",
  disabled = false,
  id,
}: SelectFieldProps) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center">
        <label
          htmlFor={selectId}
          className={`block text-sm font-semibold ${labelColorClasses[colorClass]} transition-colors duration-200`}
        >
          {label}
        </label>
        {tooltip && <TooltipIcon content={tooltip} />}
      </div>

      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          w-full py-3 px-4 rounded-xl
          border-2 transition-all duration-200
          border-slate-200 dark:border-slate-700
          ${focusColorClasses[colorClass]} focus:ring-4
          ${disabled ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800" : ""}
          appearance-none cursor-pointer
          bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
          bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
