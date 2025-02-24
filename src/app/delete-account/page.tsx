import Link from "next/link";
import { Fragment } from "react";
import Logo from "../components/Logo";


type Response = {
  userName: string;
} | null;

const deleteAccount = async () => {
  return {
    userName: "",
  } as Response;
}




export default async function AccountPage() {
  const response = await deleteAccount();

  return (
    <div className="flex flex-col h-screen w-screen p-8 pb-20 gap-16 sm:p-20 bg-black text-white">
      <main className="flex flex-col h-full w-full items-center">
        <h1 className="flex flex-col items-center w-full">
          <Logo />
        </h1>
        <div className="flex flex-col flex-[1] justify-center">
          <div className="border border-neutral-500 p-4 rounded-lg">
            {response ?
              <Fragment>
                <p className="text-lg sm:text-xl">
                  Aurevoir <span className="font-bold">{response.userName}</span>!
                </p>
                <p className="text-center text-lg sm:text-xl">
                  Votre compte a été supprimé avec succès!
                </p>
              </Fragment> :
              <p className="text-center text-red-400 text-lg sm:text-xl">
                Une erreur s'est produite lors de la suppression de votre compte.
              </p>
            }
          </div>
        </div>
      </main>
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
    </div>
  );
}