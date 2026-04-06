interface FormFieldProps {
  label: string;
  error?: string;
  rightLabel?: React.ReactNode;
  children: React.ReactNode;
}

export const FormField = ({
  label,
  error,
  rightLabel,
  children,
}: FormFieldProps) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <label className="text-xs font-medium text-stone-600">{label}</label>
      {rightLabel}
    </div>
    {children}
    {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
  </div>
);
