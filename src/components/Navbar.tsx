import Link from 'next/link';

export function Navbar() {
  return (
    <header className="bg-black text-white py-4 px-6 shadow">
      <nav className="max-w-7xl mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          AuraHub
        </Link>
      </nav>
    </header>
  );
}
