'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    function setTheme(mode) {
      if (mode === "light") {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
      } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
      }
    }

    themeToggle.addEventListener("click", () => {
      const currentTheme = html.classList.contains("dark") ? "dark" : "light";
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  function openModal() {
    document.getElementById('modal').classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }

  function openExtension() {
    window.open("https://chrome.google.com/webstore", "_blank");
  }

  function scrollToAnalyzer() {
    document.getElementById("analyzer").scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-800">
        <div className="font-bold text-lg">TrustLink</div>
        <ul className="flex space-x-6 text-sm text-gray-700 dark:text-gray-300">
          <li><a href="#" className="hover:text-black dark:hover:text-white">Home</a></li>
          <li><a href="#" className="hover:text-black dark:hover:text-white">Verify</a></li>
          <li><a href="#" className="hover:text-black dark:hover:text-white">Explore</a></li>
          <li><a href="#" className="hover:text-black dark:hover:text-white">Terms of Service</a></li>
        </ul>
        <button id="themeToggle" className="rounded-full border border-gray-500 p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
          🌙
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold fade-in-up">Verify Brand Claims in Seconds</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 fade-in-up delay-1">Don't Trust, Just Verify it!</p>
        <p className="text-sm text-gray-500 fade-in-up delay-2">
          AI Powered Accuracy | Instant Analysis | Ethical Consumerism
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 fade-in-up delay-3">
          <button onClick={openModal} className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md font-medium hover:opacity-80 transition">Discussion Forum</button>
          <button onClick={openExtension} className="px-5 py-2 bg-gray-200 text-black dark:bg-gray-800 dark:text-white border border-gray-600 rounded-md hover:opacity-80 transition">Extension</button>
          <button onClick={scrollToAnalyzer} className="px-5 py-2 bg-gray-200 text-black dark:bg-gray-800 dark:text-white border border-gray-600 rounded-md hover:opacity-80 transition">AI Label Analyzer</button>
        </div>
      </section>

      {/* Modal */}
      <div id="modal" className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 hidden">
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Discussion Forum</h2>
            <button onClick={closeModal} className="text-gray-600 hover:text-black dark:hover:text-white">&times;</button>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">This is a mock discussion forum placeholder.</p>
        </div>
      </div>

      {/* AI Analyzer Section */}
      <section id="analyzer" className="py-24 text-center bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-4">AI Label Analyzer</h2>
        <p className="text-gray-700 dark:text-gray-400">Simulated label verification powered by AI — add your logic here!</p>
        <div className="mt-6">
          <input type="text" placeholder="Paste product label text..." className="p-2 rounded-md w-72 text-black" />
          <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Analyze</button>
        </div>
      </section>
    </>
  );
}
