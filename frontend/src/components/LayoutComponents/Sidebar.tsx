import { NavLink } from 'react-router'

const Sidebar = () => {
  return (
    <div className="min-w-46 bg-surface flex flex-col border-r">
      {/* Header */}
      <div className="px-4 py-6 border-b">
        <p className="font-semibold text-lg text-accent">EMP</p>
        <p className="text-xs text-gray-500">Management</p>
      </div>

      {/* Main Nav */}
      <div className="flex-1 py-4">
        {[
          { to: "/", label: "Home" },
          { to: "/jobs", label: "Jobs" },
          { to: "/locations", label: "Locations" },
          { to: "/departments", label: "Departments" },
          { to: "/employees", label: "Employees" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `mx-2 mb-1 block rounded-md px-3 py-2 text-sm font-medium
          ${isActive ? "bg-accent/10 text-accent" : "text-text hover:bg-muted"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t py-4">
        <NavLink
          to="/aboutme"
          className={({ isActive }) =>
            `mx-2 block rounded-md px-3 py-2 text-sm font-medium
        ${isActive ? "bg-accent/10 text-accent" : "text-text hover:bg-muted"}`
          }
        >
          About
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar