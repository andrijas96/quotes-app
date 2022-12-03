import './sort-quotes.component.css';
export function SortQuotes(prop: any) {
  const sortOptions = [
    {
      name: 'Date',
      sortBy: 'createdAt',
    },
    {
      name: 'Author',
      sortBy: 'author',
    },
    {
      name: 'Vote count',
      sortBy: 'upvoteCount',
    },
  ];

  return (
    <div className="options-container">
      {sortOptions.map((option) => {
        return (
          <button
            className="sort-options"
            key={option.name}
            onClick={() => prop.handleSort(option.sortBy)}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}
