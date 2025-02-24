import { Fragment } from "react";
import Logo from "../components/Logo";
import Footer from "../components/Footer";


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
      <Footer />
    </div>
  );
}