export enum RouteUtils {
  POLL = 'polls/:id',
}

export interface UrlArguments {
  id?: number;
}

export const format = (text: string, patterns: UrlArguments): string => {
  const keys = Object.keys(patterns);
  for (const key of keys) {
    // @ts-ignore
    text = text.replace(`:${key}`, patterns[key]);
  }
  return text;
};
