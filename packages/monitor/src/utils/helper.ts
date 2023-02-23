import { v4 as uuidv4 } from 'uuid';

export function formatParams(obj: any): string {
  let strArr = [];
  Object.keys(obj).forEach((key) => {
    strArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  });
  return strArr.join('&');
}

export function getLines(stack: string): string {
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^');
}

export function getNowTime(): number {
  return Date.now();
}

export const switchToMB = (bytes: number): number | null => {
  if (typeof bytes !== 'number') {
    return null;
  }
  return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2));
};

export const generateId = (): string => {
  return uuidv4();
};

export const getUid = () => {
  let uuid = localStorage.getItem('uuid');
  if (uuid) return uuid;
  uuid = generateId();
  localStorage.setItem('uuid', uuid);
  return uuid;
};
