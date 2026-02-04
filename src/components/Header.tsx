export default function Header() {
  return (
    <header className="flex items-center justify-end whitespace-nowrap border-b border-gray-200 px-8 py-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <span className="text-xl">🔔</span>
        </button>
        <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <span className="text-xl">❓</span>
        </button>
        <div className="bg-gradient-to-br from-blue-400 to-purple-500 aspect-square bg-cover rounded-full size-10 flex items-center justify-center text-white font-bold">
          JD
        </div>
      </div>
    </header>
  );
}
