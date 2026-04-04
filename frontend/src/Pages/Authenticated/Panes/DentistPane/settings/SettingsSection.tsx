import React from "react";

type SettingsSectionProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function SettingsSection({
  title,
  description,
  icon,
  action,
  footer,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ${className || ""}`}
    >
      <div className="flex flex-col gap-4 border-b border-slate-100 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            {description && (
              <p className="text-xs text-slate-500">{description}</p>
            )}
          </div>
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>

      <div className="bg-slate-50/30 px-6 py-5">{children}</div>

      {footer && (
        <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">
          {footer}
        </div>
      )}
    </section>
  );
}
