export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-10">
      <div className="container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} Car Customizer. All rights reserved.
      </div>
    </footer>
  );
}
