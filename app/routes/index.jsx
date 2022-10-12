import { Header, canonicalLink } from "./components";

export const handle = {
  canonicalLink
}

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
