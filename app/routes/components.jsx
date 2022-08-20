import { NavLink } from "@remix-run/react"

// From https://heroicons.com
function IconMenu() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    )
}

function IconX() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

export function Header () {
    // style the active link with a border at the bottom on wide screens 
    // and with bold fonts on mobile
    function linkStyle({isActive}) {
        return isActive ? "sm:border-b-2 font-semibold sm:font-base border-current" : ""
    }
    return (
        <div className="py-4 px-10 bg-white/30 flex sm:flex-row flex-col">
            <input type="checkbox" className="hidden peer" id="menu"/>
            {/* This label can click the hidden input thanks to htmlFor */}
            <label htmlFor="menu"
              className="sm:hidden cursor-pointer self-end peer-checked:hidden" >
              <IconMenu />
            </label>

            <div className="hidden sm:flex peer-checked:flex sm:flex-row flex-col gap-4">
                <label className="sm:hidden cursor-pointer self-end" htmlFor="menu">
                  <IconX />
                </label>
                <NavLink className={linkStyle} to="/">Home</NavLink>
                <NavLink className={linkStyle} to="/about">About</NavLink>
            </div>
        </div>
    )
}
