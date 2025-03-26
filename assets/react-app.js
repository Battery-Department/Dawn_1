import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18+
import PropTypes from 'prop-types';

class ReactBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false, // For animation visibility
    };
  }

  componentDidMount() {
    // Trigger animation when the component is mounted
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 100);
  }

  handleButtonClick = () => {
    // Handle button click (e.g., navigate to a link or trigger an action)
    const { buttonLink, id } = this.props;
    if (buttonLink) {
      window.location.href = buttonLink;
    } else {
      alert(`Button clicked in block: ${id}`);
    }
  };

  render() {
    const { customHtml, buttonText, animationType, price, features } = this.props;
    const { isVisible } = this.state;

    // Define animation styles with a fallback for invalid animationType
    const animationStyles = {
      fade: {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      },
      slide: {
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
      },
      zoom: {
        transform: isVisible ? 'scale(1)' : 'scale(0.9)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
      },
    };

    const style = animationStyles[animationType] || animationStyles.fade; // Fallback to 'fade'

    return (
      <div style={style} className="react-block">
        {/* Render custom HTML */}
        <div dangerouslySetInnerHTML={{ __html: customHtml }} />

        {/* Render price */}
        {price && <p className="react-block-price">{price}</p>}

        {/* Render features */}
        {features && (
          <div
            className="react-block-features"
            dangerouslySetInnerHTML={{ __html: features }}
          />
        )}

        {/* Render button */}
        {buttonText && (
          <button
            onClick={this.handleButtonClick}
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
  }
}

// Define PropTypes for validation
ReactBlock.propTypes = {
  id: PropTypes.string.isRequired,
  customHtml: PropTypes.string,
  buttonText: PropTypes.string,
  animationType: PropTypes.oneOf(['fade', 'slide', 'zoom']),
  price: PropTypes.string,
  features: PropTypes.string,
  buttonLink: PropTypes.string,
};

// Define default props
ReactBlock.defaultProps = {
  customHtml: '',
  buttonText: 'Click Me',
  animationType: 'fade',
  price: '',
  features: '',
  buttonLink: null,
};

// Mount React components dynamically
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('[id^="react-block-"]');
  blocks.forEach((block) => {
    try {
      if (!block.dataset.props) {
        console.warn(`No data-props attribute found for block with ID: ${block.id}`);
        return;
      }

      const blockData = JSON.parse(block.dataset.props); // Parse props from data attribute
      const root = ReactDOM.createRoot(block); // Use ReactDOM.createRoot for React 18+
      root.render(<ReactBlock {...blockData} />);
    } catch (error) {
      console.error(`Error parsing React block data for block with ID: ${block.id}`, error);
    }
  });
});