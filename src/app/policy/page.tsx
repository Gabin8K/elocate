import Link from "next/link";

export default function PolicyPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">Politique de Confidentialité</h1>
        <p className="text-center sm:text-left">
          Votre vie privée est importante pour nous. Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons et les options dont vous disposez concernant vos informations personnelles lorsque vous utilisez l'application <span className="font-bold">Easy Locate - Elocate</span>.
        </p>
        <p className="text-center sm:text-left">
          <strong>Informations que nous collectons</strong>
        </p>
        <div className="text-center sm:text-left">
          <strong>Informations Personnelles</strong><br />
          Nous collectons des informations personnelles uniquement lorsque cela est nécessaire pour vous fournir nos services. Cela inclut :
          <ul>
            <li>Nom et prénom : Pour personnaliser votre expérience utilisateur.</li>
            <li>Adresse e-mail : Pour vous permettre de créer un compte et de recevoir des notifications importantes.</li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <strong>Informations Techniques</strong><br />
          Nous collectons également des informations techniques pour améliorer notre application :
          <ul>
            <li>Données de localisation (GPS) : Pour vous permettre d'ajouter des lieux sur la carte et de naviguer.</li>
            <li>Accès à la galerie photo : Pour vous permettre de télécharger des photos des lieux.</li>
            <li>Capteurs sensoriels : Pour améliorer la précision de la navigation et des fonctionnalités de l'application.</li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <strong>Utilisation des Informations</strong><br />
          Nous utilisons les informations collectées pour :
          <ul>
            <li>Vous fournir et améliorer nos services.</li>
            <li>Personnaliser votre expérience utilisateur.</li>
            <li>Communiquer avec vous concernant des mises à jour et des notifications importantes.</li>
            <li>Analyser l'utilisation de l'application pour améliorer nos services.</li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <strong>Partage des Informations</strong><br />
          Nous ne partageons pas vos informations personnelles avec des tiers, sauf dans les cas suivants :
          <ul>
            <li>Avec votre consentement : Lorsque vous nous donnez votre accord explicite.</li>
            <li>Pour des raisons légales : Si la loi nous y oblige ou pour protéger nos droits légaux.</li>
          </ul>
        </div>
        <p className="text-center sm:text-left">
          <strong>Sécurité des Informations</strong><br />
          Nous mettons en œuvre des mesures de sécurité raisonnables pour protéger vos informations contre l'accès non autorisé, la divulgation, la modification ou la destruction.
        </p>
        <div className="text-center sm:text-left">
          <strong>Vos Droits</strong><br />
          Vous avez le droit de :
          <ul>
            <li>Accéder à vos informations personnelles.</li>
            <li>Corriger ou mettre à jour vos informations.</li>
            <li>Demander la suppression de vos informations personnelles.</li>
            <li>Refuser la collecte de certaines informations, avec la compréhension que cela peut limiter certaines fonctionnalités de l'application.</li>
          </ul>
        </div>
        <p className="text-center sm:text-left">
          <strong>Modifications de cette Politique</strong><br />
          Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page.
        </p>
        <p className="text-center sm:text-left">
          <strong>Contact</strong><br />
          Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à [votre adresse e-mail de contact].
        </p>
        <p className="text-center sm:text-left">
          Cette politique est effective à partir du 23 février 2025.
        </p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          Retour à l'accueil
        </Link>
      </footer>
    </div>
  )
}