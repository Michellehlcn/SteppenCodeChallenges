import { useState } from 'react';

export const TwoPaneList = ({ data }) => {
  const [idx, setIdx] = useState(false);
  return <>
    <div class="columns">
      <div class="column is-two-fifths content">
        <h1 className='title is-3'>Title</h1>
        <nav class="panel">
          {data.map((v, idx) => {
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            return <a
              className="panel-block is-active"
              key={idx}
              onClick={() => setIdx(idx)}><span>{v.title}</span> </a>
          })}
        </nav>
      </div>
      <div class="column content">
        <h1 className='title is-3'>Content <button className='button is-light' onClick={()=>setIdx(false)}>Reset</button></h1> 
        <p className='tile'><blockquote>{idx !== false ? data[idx]?.content?.map(str => <p>{str}</p>) : "Please select the book title!"}</blockquote></p>
      </div>
    </div>
  </>
}
