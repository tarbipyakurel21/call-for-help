// app/about/page.tsx
export default function AboutPage() {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col items-center justify-center max-w-3xl p-16 bg-white dark:bg-black rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6 text-black dark:text-zinc-50">
            About Us
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
            Welcome to HealthAI, your friendly healthcare assistant. Our mission is to provide general health information
            and guidance to help you make informed decisions about your well-being. 
          </p>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
            We use AI technology to answer common health questions, provide educational resources, and help you stay
            informed about healthy living. Please note, our AI does not give prescriptions or diagnoses. Always consult
            a doctor for personal or urgent medical issues.
          </p>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Our team is dedicated to building accessible, safe, and reliable healthcare tools for everyone.
          </p>
        </main>
      </div>
    );
  }
  