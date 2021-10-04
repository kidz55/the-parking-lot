const Dona = ({ dona, onLeave, onNote, onSlap }) => {
  return (
    <div className="dona">
      <div className="header">{dona.donaIndex}</div>
      <div className="img-wrapper">
        <img src={dona.image} alt="dona" />
      </div>
      <div className="actions">
        <button onClick={onLeave}>LEAVE</button>
        <button onClick={onSlap}>SLAP DAT ROOF</button>
        <button onClick={onNote}>LEAVE A NOTE</button>
      </div>
    </div>
  );
};

export default Dona;
