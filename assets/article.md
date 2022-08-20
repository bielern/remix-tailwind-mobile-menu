# Creating a responsive menu with remix and tailwind

For my current project [Patent Cockpit](https://patent-cockpit.com), I wanted
to create a mobile friendly menu. The menu should be a transparent bar on
wide screen. On small screens it should collapse to a "burger" menu that 
when clicked, shows the link items as a list together with a close button.
This can be achieved using a hidden checkbox input and the `peer` functionality
of tailwind. 

If you don't want to use an input element, you can try to use 
the [`target` pseudo class](https://tailwindcss.com/docs/hover-focus-and-other-states#target)
on the menu with `id=menu`. 
The menu icon is then not a label but a link to `#menu`.
Or you can use javascript. 
But I think it is more elegant not having to rely on it for this.

## Setup

If you have remix (or just react) and tailwind already installed, feel free to
skip this step.

* [Install Remix](https://remix.run/docs/en/v1)
```
npx create-remix@latest
```
I have used javascript in the menu.

* [Install Tailwind](https://tailwindcss.com/docs/guides/remix)
```
npm install -D tailwindcss postcss autoprefixer concurrently
npx tailwindcss init
```

Edit `package.json` so that it looks like
```
   {
     "scripts": {
       "build": "npm run build:css && remix build",
       "build:css": "tailwindcss -m -i ./styles/app.css -o app/styles/app.css",
       "dev": "concurrently \"npm run dev:css\" \"remix dev\"",
       "dev:css": "tailwindcss -w -i ./styles/app.css -o app/styles/app.css",
     }
   }
```

Replace the empty `content` array in `tailwind.config.js` by
```
content: [
  "./app/**/*.{js,ts,jsx,tsx}",
],
```

Add a basic CSS file at `styles/app.css`
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, import the generated css file in `root.jsx`:
```
import styles from "./styles/app.css"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}
```

Now you can start the development server with
```
npm run dev
```

## Code Walkthrough

To fully understand, what is going on, 
it is best to consult the Remix documentation.
The intersting files are in the `app/routes` folder: `index.jsx` with the index 
route, `about.jsx` with the "About" page and `components.jsx` with the menu header.

The `export default function Index()` part in `index.jsx` and `about.jsx` tells
remix that these are pages to be rendered (on the server side that is).
They both import the `Header` from `components`.

```
// index.jsx; about.jsx looks similar
import { Header } from "./components";

export default function Index() {
  return (
    <div className="bg-sky-100 min-h-screen">
      <Header />
      <div className="content">
        <h1>Home to our Example</h1>
        <p>
          My home is my castle.
        </p>
      </div>
    </div>
  );
}
```

In `components.jsx` we have 
```
import { NavLink } from "@remix-run/react"

// Removed the IconMenu and IconX from https://heroicons.com
// ...

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
              className="sm:hidden cursor-pointer self-end peer-checked:hidden">
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
```

Tailwind targets by default small mobile screens.
For wider screens, you need to use the breakpoint classes.
`sm` for everything above small, `md` for everything above medium and so on.
So you can use the `sm` modifier to overwrite the behavior on a small mobile device.

So, what is going on on wide screens?
All the `label`s are hidden on the wide screens due to the `sm:hidden` classes.
The `input` is anway hidden due to the `hidden` class.
The list with the navigation links is shown by default 
(`sm:flex` countering the `hidden`).
So more or less, we just see the semi-transparent bar with two links on it.

On small screens, we see now the burger menu icon `IconMenu`. 
It is connected to the `id=menu` of the input through the `htmlFor=menu` attribute.
So clicking it, will click the input.

The input has the `peer` pseud-class on it. 
This way, elements below it can redener differently depending on the state of the `peer`.
So while the `div` with the nav links is hidden by default,
it gets displayed, when the input is *checked* due to `peer-checked:flex`.

As the input is checked, the burger menu becomes hidden (`peer-checked:hidden`),
while the close icon appears within the `div` for the nav links.

With this approach, the menu is just shown as a larger area at the top.
If you prefer a kind of a layover effect of the menu, you can play around with
`relative` on the top `div` and `absolute min-h-screen` on the `div` with the links.


## Conclusion

It took me a while to have a nice solution for a mobile menu without relying
on javascript or some hand-made CSS.
You can achieve the basic behavior of a collaping mobile menu
with simple tailwind classes and modifiers.
