import Link from "next/link";

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-col items-center gap-4">
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
        href="/policy"
      >
        Politique de Confidentialité
      </Link>
      <div className="text-center text-sm">
        <p>Développé par DNFG</p>
        <p>Contact : <Link href="mailto:gabindjomo21@gmail.com" className="hover:underline">gabindjomo21@gmail.com</Link></p>
      </div>
    </footer>
  )
}