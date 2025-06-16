import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=10.8&longitude=106.6&current_weather=true"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
};
