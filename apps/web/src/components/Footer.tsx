import { Trophy } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
  return (
     <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-white">Foresee</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Foresee: Best odds. Fast payouts. Secure betting.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-sm text-slate-500">
                © {new Date().getFullYear()} Foresee. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-4 md:justify-end text-sm text-slate-500">
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Cookies
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Licenses
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Settings
                </Link>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500">
              <p>
                Gambling can be addictive. Please play responsibly. Foresee
                promotes responsible gambling.
              </p>
            </div>
          </div>
        </div>
      </footer>
  )
}