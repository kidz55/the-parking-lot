const Dona = ({ dona, onLeave, onNote, onSlap }) => {
  return (
    <div className="dona">
      <div className="header">{dona.donaName}</div>
      <div className="img-wrapper">
        <img src={dona.image} alt="dona" />
      </div>
    </div>
  );
};

export default Dona;
