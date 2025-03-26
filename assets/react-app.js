import React from 'react';
import ReactDOM from 'react-dom/client';

const SimpleReactBlock = ({ title, description, buttonText, buttonLink }) => {
  const handleButtonClick = () => {
    if (buttonLink) {
      window.location.href = buttonLink;
    } else {
      alert('Button clicked!');
    }
  };

  return (
    <div className="simple-react-block" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h1>{title}</h1>
      <p>{description}</p>
      {buttonText && (
        <button
          onClick={handleButtonClick}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('[id^="react-block-"]');
  blocks.forEach((block) => {
    try {
      const blockData = JSON.parse(block.dataset.props); // Parse props from data attribute
      const root = ReactDOM.createRoot(block); // Use ReactDOM.createRoot for React 18+
      root.render(
        <SimpleReactBlock
          title={blockData.title || 'Default Title'}
          description={blockData.description || 'This is a simple React block.'}
          buttonText={blockData.buttonText || 'Click Me'}
          buttonLink={blockData.buttonLink || null}
        />
      );
    } catch (error) {
      console.error(`Error parsing React block data for block with ID: ${block.id}`, error);
    }
  });
});