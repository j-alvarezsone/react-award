import About from "./components/about";
import Features from "./components/faetures";
import Hero from "./components/hero";
import Navbar from "./components/navbar";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  );
}

export default App;
