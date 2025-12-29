"use client";

export default function ShowError() {
  return (
    <main className="p-6" role="alert">
      <h1 className="text-xl font-semibold">Something went wrong.</h1>
      <p className="mt-2">
        An unexpected error occurred while loading this page.
      </p>
      <p className="mt-2">Try refreshing the page.</p>
    </main>
  );
}
