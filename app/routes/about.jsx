import { Header } from "./components";

export default function Index() {
    return (
        <div className="min-h-screen bg-teal-100">
            <Header />
            <div className="content">
                <h1>About our Example</h1>
                <p>
                    This demonstrates the behavior of the menu on phones with a burger menu.
                </p>
            </div>
        </div>
    );
}