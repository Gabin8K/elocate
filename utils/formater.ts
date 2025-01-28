export function display(name: string, limit: number) {
  return name.length > limit ? `${name.slice(0, limit)}...` : name;
}



export function date(date: any, locale: string = 'fr') {
  const now = new Date();
  // @ts-ignore
  const diff = now - (new Date(date));
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const units = [
    { value: days, unit: 'jour' },
    { value: hours % 24, unit: 'heure' },
    { value: minutes % 60, unit: 'minute' },
    { value: seconds % 60, unit: 'seconde' }
  ];

  const unit = units.find(u => u.value > 0);
  if (unit) {
    const plural = unit.value > 1 ? 's' : '';
    return `${unit.value} ${unit.unit}${plural} ${locale === 'fr' ? 'ago' : 'ago'}`; // Adaptez 'ago' pour d'autres langues
  } else {
    return 'à l\'instant';
  }
}