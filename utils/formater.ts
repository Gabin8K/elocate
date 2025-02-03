export function display(name: string, limit: number) {
  return name.length > limit ? `${name.slice(0, limit)}...` : name;
}


export function date(date: any, locale: string = 'en'): string {
  const passed = new Date(date.seconds * 1000);
  const now = new Date();

  // @ts-ignore
  const seconds = Math.floor((now - passed) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${locale === 'fr' ? 'Il y a' : ''} ${seconds} ${locale === 'en' ? 'seconds ago' : 'secondes'}`;
  } else if (minutes < 60) {
    return `${locale === 'fr' ? 'Il y a' : ''} ${minutes} ${locale === 'en' ? 'minutes ago' : 'minutes'}`;
  } else if (hours < 24) {
    return `${locale === 'fr' ? 'Il y a' : ''} ${hours} ${locale === 'en' ? 'hours ago' : 'heures'}`;
  } else if (days < 7) {
    return `${locale === 'fr' ? 'Il y a' : ''} ${days} ${locale === 'en' ? 'days ago' : 'jours'}`;
  } else if (weeks < 5) {
    return `${locale === 'fr' ? 'Il y a' : ''} ${weeks} ${locale === 'en' ? 'weeks ago' : 'semaines'}`;
  } else if (months < 12) {
    return `${locale === 'fr' ? 'Il y a' : ''} ${months} ${locale === 'en' ? 'months ago' : 'mois'}`;
  } else {
    return `${locale === 'fr' ? 'Il y a' : ''} ${years} ${locale === 'en' ? 'years ago' : 'ans'}`;
  }
}

