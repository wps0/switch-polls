export enum RouteUtils {
  POLL = "poll/:id"
}

export interface UrlArguments {
  pollId?: string
}

export const format = (text: string, patterns: UrlArguments) => {
  const keys = Object.keys(patterns);
  for (const key of keys) {
    // @ts-ignore
    text = text.replace(`%{${key}}`, patterns[key]);
  }
}
