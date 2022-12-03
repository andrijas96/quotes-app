import './tag.component.css';
export function Tags(prop: any) {
  return (
    <div className="tags-container">
      <button className="tag-options" onClick={() => show()}>
        Tags <i className="fas fa-sort-down"></i>
      </button>
      <div className="tags">
        {prop.tags.map((t: string) => {
          return (
            <div
              key={t}
              className="option"
              onClick={() => {
                prop.handleFilter(t);
                show();
              }}
            >
              {t}
            </div>
          );
        })}
      </div>
    </div>
  );

  function show() {
    let options = document.getElementsByClassName('tags');
    options[0].classList.toggle('show');
  }
}
