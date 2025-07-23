import Header from "./components/custom/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mt-[10rem] text-center p-4">
        <h1 className="text-5xl font-bold mb-4 text-red-600">404</h1>
        <p className="text-2xl mb-2">Page Not Found</p>
        <a href="/" className="text-blue-500 underline">
          Go back to Home
        </a>
      </div>
    </>
  );
}
