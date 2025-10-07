import React from "react"

const dot = <p className="mx-3">•</p>

function Footer() {
  return (
    <div className="w-full flex flex-row my-5 justify-between text-sm">
      <a href="/" className="hover:underline text-gray-300">
        © 2025 AMR Holdings Inc.
      </a>
      {dot}
      <a href="/privacy" className="hover:underline text-gray-300">
        Privacy
      </a>
      {dot}
      <a href="/terms" className="hover:underline text-gray-300">
        Terms
      </a>
    </div>
  )
}

export default Footer
