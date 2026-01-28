import { LogIn, DoorOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AuthButtons() {
  const { authenticated, username, login, logout} = useAuth();


  if (!authenticated) {
    return (
      <button
        onClick={login}
        className="
          flex items-center gap-2
          px-4 py-2
          rounded-md
          bg-blue-600 text-white
          hover:bg-blue-700
          transition
        "
      >
        <LogIn size={16} />
        Login
      </button>
    );
  }


  return (
    <div className="flex justify-center items-center gap-4">
        <span className="text-sm font-medium">
        Welcome {username}
      </span>
    <button
      onClick={logout}
      className="
        flex items-center gap-2
        px-4 py-2
        rounded-md
        bg-gray-100 text-gray-700
        hover:bg-red-50 hover:text-red-600
        transition
      "
      title="Logout"
    >
      <DoorOpen size={20} />
    </button>
    </div>
  );
}
