import { useError } from "../../context/ErrorContext";

const GlobalAlert = () => {
  const { error, setError } = useError();
  if (!error) return null;
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 top-4 right-4 px-4 py-2 rounded text-white ${
        error.type === "error" ? "bg-red-600" : "bg-green-600"
      }`}
    >
      {error.message}

      {/* Manuel kapatma */}
      <button
        onClick={() => setError(null)}
        className="pl-2.5 font-bold opacity-80 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
};

export default GlobalAlert;
