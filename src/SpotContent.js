import './ModalContent.css';

const { default: IconClose } = require('./components/IconClose');

const SpotContent = ({ onClose, spot, onLeave }) => {
  return (
    <div className="garage">
      <div className="garage-header" onClick={onClose}>
        <h2>{spot.donaIndex}</h2>
        <IconClose />
      </div>
      <div className="park-dona">
        <img src={spot.image} width="300px" alt="dona" />
        <div className="description">This Dona is already park there buddy</div>
      </div>
      <div className="footer">
        <button>LEAVE A NOTE</button>
        <button>SLAP THE ROOF</button>
        <button onClick={() => onLeave(spot)}>LEAVE PARKING SPOT</button>
        <a href="">BUY THAT DONA</a>
      </div>
    </div>
  );
};

export default SpotContent;
