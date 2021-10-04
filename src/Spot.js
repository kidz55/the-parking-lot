import './Spot.css';
const Spot = ({ spot, onSpotClick, className }) => (
  <div className={className} key={spot.index} onClick={() => onSpotClick(spot)}>
    {!!spot.image ? (
      <img src={spot.image} alt="dona" className="dona" />
    ) : (
      <span>{spot.index}</span>
    )}
  </div>
);

export default Spot;
