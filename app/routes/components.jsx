import { NavLink } from "@remix-run/react"

export function Header () {
    function linkStyle({isActive}) {
        return isActive ? "border-b-2 border-current" : ""
    }
    return (
        <div className="py-4 px-10 bg-white/50 flex flex-row gap-4">
            <NavLink className={linkStyle} to="/">Home</NavLink>
            <NavLink className={linkStyle} to="/about">About</NavLink>
        </div>
    )
}