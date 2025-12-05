export default function Footer() {
  return (
    <footer className="mt-4 backdrop-blur-sm bg-fishblue border-t-3 border-redish shadow-lg mt-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-yellowishbone text-center text-sm">
          &copy; {new Date().getFullYear()} Boundary Waters Fish Map. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
