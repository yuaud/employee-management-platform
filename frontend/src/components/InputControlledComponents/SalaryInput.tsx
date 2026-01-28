type SalaryInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const formatSalary = (value: string) => {
  // sadece rakam ve nokta
  let v = value.replace(/[^0-9.]/g, "");

  // birden fazla nokta olmasın
  const parts = v.split(".");
  if (parts.length > 2) {
    v = parts[0] + "." + parts.slice(1).join("");
  }

  // ondalık max 2 hane
  if (v.includes(".")) {
    const [int, dec] = v.split(".");
    v = int + "." + dec.slice(0, 2);
  }

  // NUMERIC(8,2) → max 6 hane integer
  const [intPart] = v.split(".");
  if (intPart.length > 6) {
    v = intPart.slice(0, 6) + (v.includes(".") ? "." + v.split(".")[1] : "");
  }

  return v;
};

export const SalaryInput = ({ value, onChange }: SalaryInputProps) => {
  return (
    <input
      className="w-full border border-gray-200 shadow-sm text-text p-2 rounded bg-card"
      type="text"
      inputMode="decimal"
      placeholder="10000.00"
      value={value}
      onChange={(e) => onChange(formatSalary(e.target.value))}
    />
  );
};
