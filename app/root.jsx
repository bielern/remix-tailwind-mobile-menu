import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";
import styles from "./styles/app.css"

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

function CanonicalLinks() {
  const matches = useMatches()
  return matches
    .filter(m => m?.handle?.canonicalLink)
    .flatMap(m => {
      return m.handle.canonicalLink(m).map(data => <link {...data} />)
    })
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <CanonicalLinks />
      </head>

      <body>
        <Outlet />

        <ScrollRestoration />

        <Scripts />

        <LiveReload />
      </body>
    </html>
  );
}
