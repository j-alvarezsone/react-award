import About from "./components/about";
import Hero from "./components/hero";
import Navbar from "./components/navbar";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}

export default App;
