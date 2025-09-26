import React from "react";
import IconGenerator from "@/components/IconGenerator";

export default function Page() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Customizable SVG Icon</h1>
          <p className="text-stale-600">Customize Icon and download them as SVG</p>
        </header>
        <IconGenerator />
      </div>
    </main>
  )
}