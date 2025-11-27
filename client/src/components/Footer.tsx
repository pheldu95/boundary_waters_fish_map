import React from 'react'

export default function Footer() {
  return (
    <footer className="backdrop-blur-sm bg-fishblue border-t-3 border-redish shadow-lg mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-yellowbone text-center text-sm">
          &copy; {new Date().getFullYear()} Boundary Waters Fish Map. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
