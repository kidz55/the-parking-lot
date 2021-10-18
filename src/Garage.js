import './ModalContent.css';

const { default: IconClose } = require('./components/IconClose');

const getImage = (dona) => {
  if (!dona.image.includes('ipfs')) {
    return dona.image;
  }
  const hash = dona.image.split('ipfs://')[1];
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
};

const Garage = ({ onChoose, donas, onClose, spot, isConnected }) => {
  const allParked = Object.values(donas).every((dona) => dona.spotIndex);
  return (
    <div className="garage">
      <div className="garage-header" onClick={onClose}>
        <h2>THE GARAGE</h2>
        <IconClose />
      </div>
      {!isConnected && (
        <div className="no-dona">
          <p>Please first login before park your dona ser</p>
        </div>
      )}
      {Object.values(donas).length > 0 && isConnected && (
        <div className="content-wrapper">
          <div className="content">
            {Object.values(donas).map((dona) => (
              <div
                key={dona.name}
                className={dona.parkingSpot ? 'disabled' : 'clickable'}
                onClick={() => onChoose(dona, spot)}
              >
                {dona.parkingSpot && <div className="parked">PARKED</div>}
                <img
                  src={getImage(dona)}
                  width="150px"
                  height="150px"
                  alt="dona"
                />
              </div>
            ))}
          </div>
          <h2 className="dona-desc">
            {allParked
              ? 'all your sedonas are parked ser, you probably should get more of those'
              : 'Choose the Sedona you want to park'}
          </h2>
        </div>
      )}
      {isConnected && Object.values(donas).length === 0 && (
        <div className="no-dona">
          <h2>you don't have a Sedona ? no worries, talk to Jay</h2>
          <a href="https://jaypegsautomart.com/" target="blank">
            GET IN THE CAR
          </a>
        </div>
      )}
    </div>
  );
};

export default Garage;
