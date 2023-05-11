import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="text-white py-4 mx-auto text-2xl flex justify-center gap-4 bg-indigo-950">
      <Link href="/">
        <i className="fa-solid fa-house"></i>
      </Link>
      <Link href="https://github.com/karengomezs">
        <i className="fa-brands fa-github"></i>
      </Link>
      <Link href="https://karengomez.netlify.app/">
        <i className="fa-solid fa-user"></i>
      </Link>
    </nav>
  );
}
