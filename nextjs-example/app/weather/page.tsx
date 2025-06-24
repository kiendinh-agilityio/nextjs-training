import { Suspense } from "react";
import Link from "next/link";
import WeatherInfo from "./components/WeatherInfo";

const WeatherPage = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🌤 Weather Information
      </h1>
      <Link
        href="/dashboard"
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        ← Back To Home
      </Link>
    </div>
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <WeatherInfo />
    </Suspense>
  </div>
);

export default WeatherPage;
