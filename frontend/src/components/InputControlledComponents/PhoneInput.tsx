type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 12);

  const parts: string[] = [];
  if (digits.length > 0) parts.push("+" + digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 5));
  if (digits.length > 5) parts.push(digits.slice(5, 8));
  if (digits.length > 8) parts.push(digits.slice(8, 12));

  return parts.join(" ");
};

export const PhoneInput = ({ value, onChange }: PhoneInputProps) => {
  return (
    <input
      className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
      type="tel"
      inputMode="numeric"
      placeholder="+90 559 123 4567"
      value={value}
      onChange={(e) => onChange(formatPhone(e.target.value))}
    />
  );
};
