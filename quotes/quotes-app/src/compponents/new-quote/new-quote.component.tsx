import { useState } from 'react';
import { QuoteType } from '../../models/quote-type.interface';
import './new-quote.component.css';

export function NewQuote(prop: any) {
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [tags, setTags] = useState<string[]>(['']);

  const handleChangeContent = (event: any) => {
    setContent(event.target.value);
  };
  const handleChangeAuthor = (event: any) => {
    setAuthor(event.target.value);
  };
  const handleChangeTags = (event: any) => {
    setTags(event.target.value.split(' '));
  };

  const handleSubmit = (event: any) => {
    let obj: QuoteType = {
      id: '',
      content: content,
      author: author,
      tags: tags,
      userId: '49d73d43-e1bc-46b4-88a6-d802d1cc9fe9',
      upvotesCount: 0,
      downvotesCount: 0,
      createdAt: new Date().toISOString(),
      givenVote: 'none',
    };

    prop.newQuote(obj);

    show();
    reset();

    event.preventDefault();
    event.target.reset();
  };

  return (
    <div className="new-quote-container" tabIndex={-1}>
      <div className="screen" onClick={show}></div>
      <button
        className="add-button"
        onClick={() => {
          show();
        }}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <form
        className="form-new-quote"
        id="form-new-quote"
        onSubmit={handleSubmit}
      >
        <label>Content:</label>
        <textarea
          name="content"
          cols={50}
          rows={10}
          tabIndex={-1}
          value={content}
          onChange={handleChangeContent}
        ></textarea>
        <label>Author:</label>
        <input
          type="text"
          placeholder="Author..."
          tabIndex={-1}
          value={author}
          onChange={handleChangeAuthor}
        />
        <label>Tags:</label>
        <input
          type="text"
          className="tags-input"
          placeholder="tags..."
          tabIndex={-1}
          value={tags}
          onChange={handleChangeTags}
        ></input>
        <button className="submit-button" type="submit" tabIndex={-1}>
          Submit
        </button>
      </form>
    </div>
  );

  function show() {
    let form = document.getElementsByClassName('form-new-quote');
    let screen = document.getElementsByClassName('screen');
    screen[0].classList.toggle('show');
    form[0].classList.toggle('show');

    reset();
  }

  function reset() {
    setContent('');
    setAuthor('');
    setTags(['']);
  }
}
