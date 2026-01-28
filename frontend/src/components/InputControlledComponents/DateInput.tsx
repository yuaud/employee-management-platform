type DateInputProps = {
  value: string;            // yyyy-mm-dd
  onChange: (value: string) => void;
};

export const DateInput = ({ value, onChange }: DateInputProps) => {
  return (
    <input
      className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
