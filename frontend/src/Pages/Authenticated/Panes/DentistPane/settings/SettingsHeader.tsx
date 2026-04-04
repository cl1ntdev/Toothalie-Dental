import React from "react";

type SettingsHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
};

export default function SettingsHeader({
  title,
  subtitle,
  icon,
  action,
}: SettingsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-1 rounded-xl bg-indigo-100 p-3 text-indigo-600">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold font-ceramon text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}
