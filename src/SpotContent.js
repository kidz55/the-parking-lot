import './ModalContent.css';
import Button from './components/Button';

const { default: IconClose } = require('./components/IconClose');

const SpotContent = ({ onClose, spot, onLeave, donas, onSlap }) => {
  const isOwner = Object.keys(donas).includes(spot.donaIndex);

  return (
    <div className="garage">
      <div className="garage-header" onClick={onClose}>
        <h2>{spot.donaName}</h2>
        <IconClose />
      </div>
      <div className="park-dona">
        <img src={spot.image} width="300px" alt="dona" />
        <h2>This Dona is already park there buddy</h2>
      </div>
      <div className="footer">
        {isOwner ? (
          <div className="actions">
            <Button
              text="LEAVE PARKING SPOT"
              onPress={() => onLeave(spot)}
            ></Button>
          </div>
        ) : (
          <div className="actions">
            <a href="btn" target="_blank" href={spot.external_url}>
              BUY THAT DONA
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotContent;
