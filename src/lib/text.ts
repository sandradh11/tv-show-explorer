/**
 * Removes HTML tags from a string and returns plain text.
 * For the summary field of TvMazeShow and TvMazeEpisode the API often returns HTML.
 * We want to display plain text only.
 * Eg: "\u003Cp\u003E\u003Cb\u003EThe Powerpuff Girls\u003C/b\u003E is an award-winning ... before bedtime.\u003C/p\u003E"
 * becomes: "The Powerpuff Girls is an award-winning ... before bedtime.""
 * @param input
 * @returns
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Extracts the first sentence from a given string.
 * @param input
 * @returns
 */
export function firstSentence(input: string): string {
  // split on sentence-like punctuation
  const match = input.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : input).trim();
}
