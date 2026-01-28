type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function Toggle({ value, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between">
      

      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition
          ${value ? "bg-green-600" : "bg-card"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-accent transition
            ${value ? "translate-x-6 bg-surface" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}
