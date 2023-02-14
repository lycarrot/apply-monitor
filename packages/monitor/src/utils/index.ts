export function formatParams(obj: any): string {
  let strArr = [];
  Object.keys(obj).forEach((key) => {
    strArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  });
  return strArr.join('&');
}
