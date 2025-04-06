import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function Home() {
  const { use, isLoaded, isSignedIn } = useUser();

  const linkPath = isSignedIn ? "/dashboard" : "/auth/sign-in";

  // Theme Color State
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("themeColor") || "#1F2937" // default: Slate Gray
  );

  // Set theme color in document root
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", themeColor);
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  return (
    <>
      <Header />

      {/* Landing Page */}
      <div className="flex flex-col min-h-screen justify-between">
        {/* Hero Section */}
        <section className="px-6 py-16 text-center bg-gray-50">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Craft AI-Powered Resumes in Minutes 🚀
          </h1>
          <p className="text-gray-600 text-md md:text-lg max-w-2xl mx-auto">
            Say goodbye to blank pages. Let AI help you build the perfect resume
            tailored for your dream job.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {/* Get Started */}
            <Link to={linkPath}>
              <Button size="lg" className="cursor-pointer">
                Get Started
              </Button>
            </Link>

            {/* Login */}
            <Link to={linkPath}>
              <Button size="lg" variant="outline" className="cursor-pointer">
                Login
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-14 px-6 md:px-20 bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
            Why Choose intelliCV?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: themeColor }}
              >
                AI-Optimized Summaries
              </h3>
              <p className="text-gray-600">
                Instantly generate compelling summaries tailored to your role
                and career goals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: themeColor }}
              >
                Real-Time Resume Preview
              </h3>
              <p className="text-gray-600">
                See your resume updates live as you type, ensuring precision and
                confidence.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: themeColor }}
              >
                ATS-Compliant Template
              </h3>
              <p className="text-gray-600">
                Choose from designs optimized to pass applicant tracking systems
                seamlessly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: themeColor }}
              >
                Skill & Section Flexibility
              </h3>
              <p className="text-gray-600">
                Add, or remove sections like skills, certifications, and
                achievements.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: themeColor }}
              >
                Export & Share Instantly
              </h3>
              <p className="text-gray-600">
                Download as a polished PDF or share your resume link directly.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: themeColor }}
              >
                Secure Cloud Access
              </h3>
              <p className="text-gray-600">
                Save and access your resumes from anywhere with end-to-end
                encrypted storage.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white py-12 text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Impress Recruiters?
          </h2>
          <p className="mb-6">
            Create your AI-generated resume now – it's fast, free, and
            effective!
          </p>
          <Link to={linkPath}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-200 cursor-pointer"
            >
              Build Your Resume
            </Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 py-4 text-center text-sm text-gray-700">
          © {new Date().getFullYear()} intelliCV. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default Home;
