export enum RouteUtils {
  POLL = 'polls/:id',
  POLL_RESULTS = 'polls/:id/results',
  POLL_VOTE = 'polls/vote',
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
