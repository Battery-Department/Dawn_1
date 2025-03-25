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
      if (this.props.buttonLink) {
        window.location.href = this.props.buttonLink;
      } else {
        alert(`Button clicked in block: ${this.props.id}`);
      }
    };
  
    render() {
      const { customHtml, buttonText, animationType, price, features } = this.props;
      const { isVisible } = this.state;
  
      // Define animation styles
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
  
      return (
        <div style={animationStyles[animationType]} className="react-block">
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
  
  // Mount React components dynamically
  document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('[id^="react-block-"]');
    blocks.forEach((block) => {
      const blockData = JSON.parse(block.dataset.props); // Parse props from data attribute
      ReactDOM.render(<ReactBlock {...blockData} />, block);
    });
  });