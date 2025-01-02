export function display(name: string, limit: number) {
  return name.length > limit ? `${name.slice(0, limit)}...` : name;
}