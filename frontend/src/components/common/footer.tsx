import React from "react"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="font-bold text-lg mb-3">MealShare</h2>
          <p className="text-sm">
            Connecting communities through food. Share, receive, and reduce waste with love.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/food" className="hover:underline">Browse Food</a></li>
            <li><a href="/donate" className="hover:underline">Donate</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/help" className="hover:underline">Help Center</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-700">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} MealShare. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
