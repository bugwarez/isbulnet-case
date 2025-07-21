import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              R&M
            </span>
          </div>
          <span className="font-bold text-xl">Rick & Morty</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Karakterler
          </Link>
        </nav>

        <div />
      </div>
    </header>
  );
}
