import './ModalContent.css';

const { default: IconClose } = require('./components/IconClose');

const getImage = (dona) => {
  if (!dona.image.includes('ipfs')) {
    return dona.image;
  }
  const hash = dona.image.split('ipfs://')[1];
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
};

const Garage = ({ onChoose, donas, onClose, spot }) => {
  return (
    <div className="garage">
      <div className="garage-header" onClick={onClose}>
        <h2>THE GARAGE</h2>
        <IconClose />
      </div>
      {donas.length > 0 ? (
        <div>
          <div className="content">
            {donas.map((dona) => (
              <div
                key={dona.name}
                className="clickable"
                onClick={() => onChoose(dona, spot)}
              >
                <img
                  src={getImage(dona)}
                  width="150px"
                  height="150px"
                  alt="dona"
                />
              </div>
            ))}
          </div>
          <div className="description">Choose the Sedona you want to park</div>
        </div>
      ) : (
        <div className="no-dona">
          <p>you don't have a Sedona ? no worries, talk to Jay</p>
          <a href="https://jaypegsautomart.com/" target="blank">
            Get in the car
          </a>
        </div>
      )}
    </div>
  );
};

export default Garage;
