import About from "./components/about";
import Features from "./components/faetures";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Story from "./components/story";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
    </main>
  );
}

export default App;
