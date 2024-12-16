export function username(first_name: string, last_name: string) {
  const name = `${first_name} ${last_name}`;
  return name.length > 12 ? `${name.slice(0, 12)}...` : name;
}