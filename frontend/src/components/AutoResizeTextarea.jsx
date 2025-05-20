import React, { useEffect, useRef } from 'react';

const AutoResizeTextarea = ({ value }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; 
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      readOnly
      style={{ overflow: 'hidden', resize: 'none' }}
    />
  );
};

export default AutoResizeTextarea;
