import { NavLink } from 'react-router'

const Sidebar = () => {
  return (
    <div className='min-w-40 bg-surface'>
        <NavLink
        to="/jobs"
        className={({isActive}) => 
          `mt-24 font-bold block px-4 py-2 ${isActive ? "text-accent" : "text-text"}`
        }
        >
          Jobs
        </NavLink>
        <NavLink
        to="/locations"
        className={({isActive}) => 
          `font-bold block px-4 py-2 ${isActive ? "text-accent" : "text-text"}`
        }
        >
          Locations
        </NavLink>
        <NavLink
        to="/departments"
        className={({isActive}) => 
          `font-bold block px-4 py-2 ${isActive ? "text-accent" : "text-text"}`
        }
        >
          Departments
        </NavLink>
        <NavLink
        to="/employees"
        className={({isActive}) => 
          `font-bold block px-4 py-2 ${isActive ? "text-accent" : "text-text"}`
        }
        >
          Employees
        </NavLink>
    </div>
  )
}

export default Sidebar