import React, { useReducer } from 'react';

const initialState = {
  punctualitySR: '', punctualityHR: '',
  behaviorSR: '', behaviorHR: '',
  performanceSR: '', performanceHR: '',
  cultureSR: '', cultureHR: '',
  mentoringSR: '', mentoringHR: '',
  teamworkSR: '', teamworkHR: '',
  academicPrepSR: '', academicPrepHR: '',
  assessmentSR: '', assessmentHR: '',
  coursePrepHR: '',
  cieEvalHR: '',
  studentActivitySR: '', studentActivityHR: '',
  internalRespSR: '', internalRespHR: '',
  extraContribution: '',
  extraSR: '', extraHR: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const RatingInputGroup = ({ label, description, srName, hrName, srValue, hrValue, srMax, hrMax, dispatch }) => (
  <div style={{ marginBottom: '30px' }}>
    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>{label}</label>
    <p style={{ fontSize: '14px', marginBottom: '8px', color: '#555' }}>{description}</p>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div>
        <label style={{ fontWeight: 'bold' }}>SR (max {srMax})</label><br />
        <input
          type="number"
          name={srName}
          value={srValue}
          max={srMax}
          min="0"
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: srName, value: e.target.value })}
          style={{ padding: '6px', width: '100px' }}
        />
      </div>
      <div>
        <label style={{ fontWeight: 'bold' }}>HR (max {hrMax})</label><br />
        <input
          type="number"
          name={hrName}
          value={hrValue}
          max={hrMax}
          min="0"
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: hrName, value: e.target.value })}
          style={{ padding: '6px', width: '100px' }}
        />
      </div>
    </div>
  </div>
);

export default function AdministrativeForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', state);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: 'auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontWeight: 'bold' }}>Part IV: Administrative, Organizational, and Professional Contributions</h2>

      <RatingInputGroup
        label="Punctuality"
        description="Assess adherence to time in academic and administrative responsibilities."
        srName="punctualitySR" srValue={state.punctualitySR}
        hrName="punctualityHR" hrValue={state.punctualityHR}
        srMax={10} hrMax={10} dispatch={dispatch}
      />

      <RatingInputGroup
        label="Behavior and Conduct"
        description="Evaluate professional demeanor, ethics, and collaboration with peers and students."
        srName="behaviorSR" srValue={state.behaviorSR}
        hrName="behaviorHR" hrValue={state.behaviorHR}
        srMax={15} hrMax={15} dispatch={dispatch}
      />

      <RatingInputGroup
        label="Performance on Assigned Jobs"
        description="Efficiency and quality in fulfilling academic/administrative assignments."
        srName="performanceSR" srValue={state.performanceSR}
        hrName="performanceHR" hrValue={state.performanceHR}
        srMax={15} hrMax={15} dispatch={dispatch}
      />

      <RatingInputGroup
        label="Upholding Institute’s Culture"
        description="Contribution toward maintaining and promoting institutional values and environment."
        srName="cultureSR" srValue={state.cultureSR}
        hrName="cultureHR" hrValue={state.cultureHR}
        srMax={15} hrMax={15} dispatch={dispatch}
      />

      <RatingInputGroup
        label="Mentoring Efficacy"
        description="Effectiveness in mentoring students or junior faculty in academic/personal development."
        srName="mentoringSR" srValue={state.mentoringSR}
        hrName="mentoringHR" hrValue={state.mentoringHR}
        srMax={15} hrMax={15} dispatch={dispatch}
      />

      <RatingInputGroup
        label="Teamwork / Teammanship"
        description="Willingness and ability to work as part of a team and support collective goals."
        srName="teamworkSR" srValue={state.teamworkSR}
        hrName="teamworkHR" hrValue={state.teamworkHR}
        srMax={15} hrMax={15} dispatch={dispatch}
      />

      <RatingInputGroup
        label="Academic Preparedness"
        description="Quality of lecture planning, readiness, and instructional material."
        srName="academicPrepSR" srValue={state.academicPrepSR}
        hrName="academicPrepHR" hrValue={state.academicPrepHR}
        srMax={15} hrMax={15} dispatch={dispatch}
      />

      <RatingInputGroup
        label="Assessment Efficacy"
        description="Ability to fairly and effectively evaluate student performance."
        srName="assessmentSR" srValue={state.assessmentSR}
        hrName="assessmentHR" hrValue={state.assessmentHR}
        srMax={15} hrMax={15} dispatch={dispatch}
      />

      <div style={{ marginBottom: '30px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Course Preparedness (HOD Only)</label>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Evaluate faculty's thoroughness in planning and designing the course curriculum.
        </p>
        <input
          type="number"
          name="coursePrepHR"
          value={state.coursePrepHR}
          max={30}
          min="0"
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'coursePrepHR', value: e.target.value })}
          style={{ padding: '6px', width: '100px' }}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Evaluation of CIE Answer Scripts (HOD Only)</label>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Assess timeliness and diligence in evaluating internal assessment scripts.
        </p>
        <input
          type="number"
          name="cieEvalHR"
          value={state.cieEvalHR}
          max={20}
          min="0"
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'cieEvalHR', value: e.target.value })}
          style={{ padding: '6px', width: '100px' }}
        />
      </div>

      <RatingInputGroup
        label="Student Activities"
        description="Involvement in student clubs, mentoring, event organization, etc."
        srName="studentActivitySR" srValue={state.studentActivitySR}
        hrName="studentActivityHR" hrValue={state.studentActivityHR}
        srMax={20} hrMax={20} dispatch={dispatch}
      />

      <RatingInputGroup
        label="Internal Responsibilities"
        description="Contribution to department or institutional responsibilities (e.g., committees)."
        srName="internalRespSR" srValue={state.internalRespSR}
        hrName="internalRespHR" hrValue={state.internalRespHR}
        srMax={20} hrMax={20} dispatch={dispatch}
      />

      <h3 style={{ fontWeight: 'bold', marginTop: '40px' }}>Additional Contributions</h3>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Description of Contribution</label>
        <p style={{ fontSize: '14px', color: '#555' }}>Mention any extra work or contribution not covered above.</p>
        <textarea
          name="extraContribution"
          value={state.extraContribution}
          rows="4"
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'extraContribution', value: e.target.value })}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <RatingInputGroup
        label="Extra Contribution Ratings"
        description="Rate the impact of the above mentioned extra contributions."
        srName="extraSR" srValue={state.extraSR}
        hrName="extraHR" hrValue={state.extraHR}
        srMax={10} hrMax={10} dispatch={dispatch}
      />

      <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
        <button type="submit" style={{ padding: '8px 16px' }}>Submit</button>
        <button type="button" style={{ padding: '8px 16px' }} onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </div>
    </form>
  );
}