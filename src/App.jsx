import Header from "./components/Header";
import Footer from "./components/Footer";
import CarCanvas from "./components/CarCanvas";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Customize Your Car
        </h2>
        <div className="flex justify-center">
          <CarCanvas />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
