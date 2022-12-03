export interface QuoteType {
  id?: string;
  content?: string;
  author?: string;
  tags?: string[];
  userId?: string;
  upvotesCount?: number;
  downvotesCount?: number;
  createdAt?: string;
  givenVote?: string;
}
