import React, { useReducer } from 'react';

const initialState = {
  journalPapers: '',
  conferencePapers: '',
  indexedPapers: '',
  bookChapters: '',
  booksAuthored: '',
  proposalsSubmitted: '',
  projectsReceived: '',
  patents: '',
  consultancyProjects: '',
  srRating: '',
  hrRating: '',
};

const reducer = (state, action) => ({
  ...state,
  [action.field]: action.value,
});

const RDForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ field: name, value: value.replace(/[^0-9]/g, '') });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      journalPapers,
      conferencePapers,
      indexedPapers,
      bookChapters,
      booksAuthored,
      proposalsSubmitted,
      projectsReceived,
      patents,
      consultancyProjects,
      srRating,
      hrRating,
    } = state;

    // 10a - Journal Papers
    let score10a = 0;
    const jp = parseInt(journalPapers || 0, 10);
    if (jp >= 2) score10a = 20;
    else if (jp === 1) score10a = 15;

    // 10b - Conference Papers
    let score10b = 0;
    const cp = parseInt(conferencePapers || 0, 10);
    if (cp >= 3) score10b = 20;
    else if (cp === 2) score10b = 15;
    else if (cp === 1) score10b = 10;

    // 10c - OR logic (indexed papers, book chapters, books authored)
    let score10c = 0;
    const ip = parseInt(indexedPapers || 0, 10);
    const bc = parseInt(bookChapters || 0, 10);
    const ba = parseInt(booksAuthored || 0, 10);

    let indexedScore = ip * 40;
    let bcScore = 0;
    if (bc >= 5) bcScore = 40;
    else if (bc === 4) bcScore = 35;
    else if (bc === 3) bcScore = 30;
    else if (bc === 2) bcScore = 25;
    else if (bc === 1) bcScore = 20;

    let baScore = 0;
    if (ba >= 2) baScore = 40;
    else if (ba === 1) baScore = 35;

    score10c = Math.max(indexedScore, bcScore, baScore);

    // 11a - Proposals Submitted
    let score11a = parseInt(proposalsSubmitted || 0, 10) > 0 ? 20 : 0;

    // 11b - Projects Received (grants)
    let score11b = 0;
    const pr = parseInt(projectsReceived || 0, 10);
    if (pr >= 4) score11b = 30;
    else if (pr >= 1) score11b = 25;
    else if (pr > 0) score11b = 20;

    // 12a - Consultancy Projects
    let score12a = 0;
    const cpj = parseInt(consultancyProjects || 0, 10);
    if (cpj <= 1) score12a = 15;
    else if (cpj > 1) score12a = 20;

    // 12b - Patents
    let score12b = parseInt(patents || 0, 10) > 0 ? 20 : 0;

    const totalScore =
      score10a +
      score10b +
      score10c +
      score11a +
      score11b +
      score12a +
      score12b;

    const payload = {
      ...state,
      score10a,
      score10b,
      score10c,
      score11a,
      score11b,
      score12a,
      score12b,
      totalScore,
    };

    console.log('Form Payload:', payload);
    alert(`Total API Score: ${totalScore} / 180`);
    // Submit payload to API or Supabase
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h2><strong>R&D Contributions</strong></h2>

      {[
        { label: 'No. of papers published in journals', name: 'journalPapers' },
        { label: 'No. of papers presented in conferences', name: 'conferencePapers' },
        { label: 'No. of papers indexed in Scopus/Web of Science/UGC care list', name: 'indexedPapers' },
        { label: 'No. of book chapters authored', name: 'bookChapters' },
        { label: 'No. of books authored', name: 'booksAuthored' },
        { label: 'No. of research project proposals submitted', name: 'proposalsSubmitted' },
        { label: 'No. of research projects received and amount', name: 'projectsReceived' },
        { label: 'No. of consultancy projects received/ongoing (in ₹ lakhs)', name: 'consultancyProjects' },
        { label: 'No. of patents applied/awarded', name: 'patents' },
      ].map(({ label, name }) => (
        <div key={name} style={{ marginBottom: '16px' }}>
          <label><strong>{label}</strong></label>
          <input
            type="text"
            name={name}
            value={state[name]}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            placeholder="Enter number"
          />
        </div>
      ))}

      {/* Ratings */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label><strong>Self Rating (SR)</strong></label>
          <input
            type="number"
            name="srRating"
            value={state.srRating}
            onChange={handleChange}
            min="0"
            max="40"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label><strong>HoD Rating (HR)</strong></label>
          <input
            type="number"
            name="hrRating"
            value={state.hrRating}
            onChange={handleChange}
            min="0"
            max="40"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
      </div>

      <button type="submit" style={{ padding: '10px 20px', fontWeight: 'bold' }}>
        Submit
      </button>
    </form>
  );
};

export default RDForm;