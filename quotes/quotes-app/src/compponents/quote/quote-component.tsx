import { QuoteType } from '../../models/quote-type.interface';
import './quote-component.css';

export function Quote(prop: any) {
  const quote: QuoteType = prop.quote;

  return (
    <div className="quote-container">
      <div className="vote-wrap">
        <button
          className={quote.givenVote === 'upvote' ? 'voted' : 'none'}
          onClick={() => submitVote('upvote')}
        >
          <i className="fas fa-sort-up"></i>
        </button>
        <div className="percent-votings">
          <div
            className="percent"
            style={{ color: setColor(calculatePercent()) }}
          >
            {calculatePercent() + '%'}
          </div>
          <div className="votings">
            {quote.upvotesCount} / {quote.downvotesCount}
          </div>
        </div>
        <button
          className={quote.givenVote == 'downvote' ? 'voted' : 'none'}
          onClick={() => submitVote('downvote')}
        >
          <i className="fas fa-sort-down"></i>
        </button>
      </div>
      <div className="text-wrap">
        <div className="text">{quote.content}</div>
        <div className="author">- {quote.author}</div>
      </div>
    </div>
  );

  function calculatePercent(): number {
    let down = quote.downvotesCount!;
    let up = quote.upvotesCount!;
    let sum = up + down;
    let calculatedSum = Math.floor((up / sum) * 100);

    return isNaN(calculatedSum) ? 0 : calculatedSum;
  }

  function submitVote(value: string) {
    let previousValue: string | undefined = value;
    if (quote.givenVote == value) {
      quote.givenVote = 'none';
    } else if (quote.givenVote !== value) {
      previousValue = quote.givenVote;
      quote.givenVote = value;
    }
    prop.handleVote(quote.id, quote.givenVote, previousValue);
  }

  function setColor(percent?: number) {
    const colors = {
      red: '#D86E1F',
      orange: '#D1A310',
      yellow: '#D7C713',
      lightGreen: '#C7E22B',
      green: '#AFF033',
    };

    if (percent !== undefined) {
      if (percent <= 20) {
        return colors.red;
      } else if (percent <= 50) {
        return colors.orange;
      } else if (percent <= 90) {
        return colors.lightGreen;
      } else {
        return colors.green;
      }
    }
  }
}
