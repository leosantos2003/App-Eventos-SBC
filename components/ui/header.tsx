import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

export function Header() {
  return (
    <header className="bg-primary dark:bg-card dark:shadow-none dark:border-b px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center justify-center gap-2"
        prefetch={false}
      >
        <img
          src="https://www.sbc.org.br/wp-content/uploads/2024/06/branco.png"
          alt="Socedade Brasileira de Computação"
          className="w-64"
        />
      </Link>
      <ModeToggle />
    </header>
  );
}
