import { useState } from 'react';

function CheckboxTextField({ label = "Show Text Field", placeholder = "Enter something..." }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        {' '}{label}
      </label>

      {isChecked && (
        <div style={{ marginTop: '10px' }}>
          <input type="text" placeholder={placeholder} />
        </div>
      )}
    </div>
  );
}

export default CheckboxTextField;
