// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="mt-12 border-t border-gray-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-6 text-sm text-center text-gray-600 dark:text-gray-400">
          <p>
            ⚕️ HealthAI provides general information only and is not a substitute for professional medical advice.
          </p>
          <p className="mt-1">
            If you have a medical emergency, call 911 or your local emergency number immediately.
          </p>
          <p className="mt-3 text-xs text-gray-400">
            © {new Date().getFullYear()} HealthAI — All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  