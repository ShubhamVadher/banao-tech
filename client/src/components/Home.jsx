import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-[#0b0b0f] text-white font-[Poppins] overflow-x-hidden w-screen">

      

    
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32">

        {/* Vertical Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px)] bg-[size:110px_100%]"></div>

        {/* Glow Blobs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>

        <h1 className="text-5xl md:text-6xl font-semibold leading-tight max-w-4xl z-10">
          Beautiful Landing Page <br />
          Design for You
        </h1>

        <p className="text-gray-400 mt-6 max-w-xl z-10">
          A good design is not only aesthetically pleasing, but also functional.
          It should be able to solve the problem
        </p>

        <button className="mt-8 px-8 py-3 rounded-lg bg-gradient-to-r from-[#ff7eb3] to-[#8054ff] hover:opacity-80 hover:scale-105 transition-all duration-300 z-10">
          Download Template
        </button>

        {/* Gradient Wave */}
        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-r from-[#ff7eb3] to-[#8054ff] rounded-t-[100%] blur-2xl opacity-70"></div>
      </section>


      <section className="-mt-20 flex justify-center relative z-10">
        <div className="w-[85%] max-w-6xl h-[420px] bg-[#16161d] rounded-3xl shadow-2xl border border-[#222] hover:shadow-purple-600/20 transition duration-500"></div>
      </section>

   
      <section className="py-28 px-6 text-center">
        <h2 className="text-4xl font-semibold">Feature Boxes</h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          A good design is not only aesthetically pleasing, but also functional.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#16161d] p-10 rounded-2xl border border-[#222] hover:-translate-y-3 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500"
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-gradient-to-r from-[#ff7eb3] to-[#8054ff]"></div>
              <h3 className="text-lg font-semibold mb-3">
                Fully Customizable
              </h3>
              <p className="text-gray-400 text-sm">
                A good design is not only aesthetically pleasing, but also
                functional.
              </p>
            </div>
          ))}
        </div>
      </section>


      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div className="relative w-96 h-96 mx-auto">
            <div className="absolute inset-0 border border-[#222] rounded-full"></div>
            <div className="absolute inset-12 border border-[#222] rounded-full"></div>
            <div className="absolute inset-24 border border-[#222] rounded-full"></div>
          </div>

          <div>
            <h2 className="text-4xl font-semibold leading-tight">
              We're here to guide and help you at all times
            </h2>
            <p className="text-gray-400 mt-6">
              A good design is not only aesthetically pleasing, but also
              functional.
            </p>

            <button className="mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff7eb3] to-[#8054ff] hover:scale-105 transition">
              Download
            </button>
          </div>
        </div>
      </section>


      <section className="py-28 bg-[#121218] text-center">
        <h2 className="text-3xl font-semibold">
          Companies we Worked <br />
          With in Since 2015
        </h2>

        <div className="flex flex-wrap justify-center gap-8 mt-12 opacity-60">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-36 h-16 bg-black rounded-md hover:bg-[#1c1c25] transition"
            ></div>
          ))}
        </div>
      </section>


      <section className="py-28 px-6 flex justify-center">
        <div className="w-full max-w-5xl p-16 rounded-3xl bg-gradient-to-r from-[#ff7eb3] to-[#8054ff] text-white relative overflow-hidden hover:scale-[1.02] transition duration-500">

          {/* Subtle Map Lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <h3 className="text-sm mb-2 relative z-10">Love our Tool?</h3>
          <h2 className="text-4xl font-bold mb-6 relative z-10">
            Feel Free to Join our 15 Days Free Trial
          </h2>

          <button className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-900 transition relative z-10">
            Download Template
          </button>
        </div>
      </section>

      <section className="py-28 px-6 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold">Get In Touch</h2>
          <p className="text-gray-400 mt-4">
            A good design is not only aesthetically pleasing.
          </p>

          <div className="mt-10 space-y-4">
            <input
              placeholder="Your Email"
              className="w-full bg-[#16161d] p-4 rounded-lg border border-[#222] focus:outline-none focus:border-purple-500 transition"
            />
            <input
              placeholder="Name"
              className="w-full bg-[#16161d] p-4 rounded-lg border border-[#222] focus:outline-none focus:border-purple-500 transition"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full bg-[#16161d] p-4 rounded-lg border border-[#222] focus:outline-none focus:border-purple-500 transition"
            />
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff7eb3] to-[#8054ff] hover:scale-105 transition">
              Get in Touch
            </button>
          </div>
        </div>
      </section>


      <footer className="bg-[#121218] py-10 text-center text-gray-500">
        <p>All Rights Reserved Task1 2026</p>
      </footer>
    </div>
  );
}
