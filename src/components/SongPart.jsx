/* eslint-disable react/prop-types */

export const SongPart = ({ part, isChords, textSize }) => {
  const language = localStorage.getItem('language') || 'EN';
  const eng = language === 'EN';

  return (
    <div className='part'>
      <h3 className='part__name'>
        {part.name === 'verse'
          ? eng
            ? 'verse'
            : 'куплет'
          : eng
          ? 'chorus'
          : 'припев'}
      </h3>
      <ul>
        {part.lines.map((line) => (
          <li key={line._id}>
            <div className='part__chords pl-3'>
              {isChords &&
                line.chords.map((chord, i) => (
                  <span
                    className='mr-8'
                    style={{ fontSize: `${textSize}px` }}
                    key={i}
                  >
                    {chord}
                  </span>
                ))}
            </div>
            <p className='part__text' style={{ fontSize: `${textSize}px` }}>
              {line.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
