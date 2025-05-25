import React from 'react';
import './css/ModalMessage.css';

const ModalMessage = ({
  title = 'Access Restricted',
  message,
  onClose,
  showCloseButton = true,
  buttons = [], 
  footer = null,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {title && <h2>{title}</h2>}
        {message && <p>{message}</p>}

        {buttons.length > 0 && (
          <div className="modal-buttons">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={() => {
                  btn.onClick?.();
                  onClose?.();
                }}
                className={btn.className || 'modal-default-btn'}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {footer && <div className="modal-footer">{footer}</div>}

        {showCloseButton && (
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalMessage;