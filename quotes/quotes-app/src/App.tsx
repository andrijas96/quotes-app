import { useEffect, useState } from 'react';
import axios from 'axios';
import { Quote } from './compponents/quote/quote-component';
import { QuoteType } from './models/quote-type.interface';
import { NewQuote } from './compponents/new-quote/new-quote.component';
import { SortQuotes } from './compponents/sort-quotes/sort-quotes.omponent';
import { Tags } from './compponents/tags/tags.component';

import './App.css';
const API = 'http://localhost:3000';

function App() {
  const [quotes, setQuotes] = useState<QuoteType[]>();

  const [tags, setTags] = useState<string[]>([]);

  const fetchData = async () => {
    await axios
      .get(API + '/quotes/')
      .then((res) => {
        setQuotes(res.data.quotes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTags = async () => {
    await axios
      .get(API + '/tags/')
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    fetchTags();
  }, []);

  const postUpvote = async (id: string) => {
    await axios
      .post(API + '/quotes/' + id + '/upvote')
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUpvote = async (id: string) => {
    await axios
      .delete(API + '/quotes/' + id + '/upvote')
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const postDownvote = async (id: string) => {
    await axios
      .post(API + '/quotes/' + id + '/downvote')
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteDownvote = async (id: string) => {
    await axios
      .delete(API + '/quotes/' + id + '/downvote')
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVote = (id: string, value: string, previousValue: string) => {
    setQuotes(
      quotes?.map((quote: QuoteType) => {
        if (
          quote.id == id &&
          quote.upvotesCount !== undefined &&
          quote.downvotesCount !== undefined
        ) {
          if (value == 'upvote' && previousValue == 'none') {
            postUpvote(id);
            quote.upvotesCount++;
          } else if (value == 'none' && previousValue == 'upvote') {
            deleteUpvote(id);
            quote.upvotesCount--;
          } else if (value == 'downvote' && previousValue == 'none') {
            postDownvote(id);
            quote.downvotesCount++;
          } else if (value == 'none' && previousValue == 'downvote') {
            deleteDownvote(id);
            quote.downvotesCount--;
          } else if (value == 'downvote' && previousValue == 'upvote') {
            deleteUpvote(id);
            postDownvote(id);

            quote.upvotesCount--;
            quote.downvotesCount++;
          } else if (value == 'upvote' && previousValue == 'downvote') {
            deleteDownvote(id);
            postUpvote(id);

            quote.downvotesCount--;
            quote.upvotesCount++;
          }
        }
        return quote;
      })
    );
  };

  const newQuote = async (obj: QuoteType) => {
    await axios
      .post(API + '/quotes/', obj)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSort = async (sortBy: string) => {
    await axios
      .get(API + '/quotes/', { params: { sortBy: sortBy } })
      .then((res) => {
        setQuotes(res.data.quotes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilter = async (tag: string) => {
    await axios
      .get(API + '/quotes/', { params: { tags: tag } })
      .then((res) => {
        setQuotes(res.data.quotes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1 className="quotes-header">Quotes</h1>
      <div className="container">
        <div className="options">
          <Tags tags={tags} handleFilter={handleFilter} />
          <SortQuotes handleSort={handleSort} />
          <NewQuote newQuote={newQuote} />
        </div>
        {quotes?.map((q: QuoteType, id) => {
          return <Quote key={id} quote={q} handleVote={handleVote} />;
        })}
      </div>
    </div>
  );
}

export default App;
