export default function camelCaseToString(string) {
  return string.replace(/([A-Z])/g, function ($1) { return " " + $1 });
}