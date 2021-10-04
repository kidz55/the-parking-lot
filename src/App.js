import './App.css';
import Web3 from 'web3';
import abi from './abi.json';
import api from './api';
import Spot from './Spot';
import { useEffect, useState, useMemo } from 'react';
import CustomModal from './components/CustomModal';
import Button from './components/Button';
import Garage from './Garage';
import moment from 'moment';
import SpotContent from './SpotContent';
import { updateDoc } from 'firebase/firestore';

const subarray = (arr, begin, end) => {
  const sub = [...arr];
  return sub.splice(begin, end);
};

function App() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://mainnet.infura.io/v3/af3a7d2ae4b14cc595c825efe979ee47`
    )
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [account, setAccount] = useState(null);
  const [donas, setDonas] = useState([]);
  const [parking, setParking] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [parkingLotTop, setVIPParking] = useState([]);
  const [parkingLotBottom, setParkingLotBottom] = useState([]);
  const [parkingLotMiddle, setParkingLotMiddle] = useState([]);
  const [parkingLotLeft, setParkingLotLeft] = useState([]);
  const [parkingLotRight, setParkingLotRight] = useState([]);

  const ethereum = useMemo(() => window.ethereum, [window.ethereum]);
  const contract = new web3.eth.Contract(
    abi,
    '0xF210D5d9DCF958803C286A6f8E278e4aC78e136E'
  );

  const connect = async () => {
    if (!ethereum) return;
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
    const amount = await getAmountOfDona(accounts[0]);
    const nftIndexes = await getNFTIndexes(accounts[0], amount);
    await fetchDonas(nftIndexes);
  };

  const fetchDonas = async (indexes) => {
    const queries = indexes.map((index) => api.getDona(index));
    try {
      const res = await Promise.all(queries);
      setDonas(res.filter((el) => el !== null));
    } catch (e) {
      console.error(e);
    }
  };

  const getAmountOfDona = async (addr) => {
    let NFTAmount = await contract.methods.balanceOf(addr).call();
    return NFTAmount;
  };

  const getNFTIndexes = async (addr, amount) => {
    const reqs = [];
    for (let i = 0; i < amount; i++) {
      reqs.push(contract.methods.tokenOfOwnerByIndex(addr, i).call());
    }
    const res = await Promise.all(reqs);
    return res;
  };

  const fetchData = async () => {
    const parkingData = await api.getParking();
    setParking(parkingData);
  };

  useEffect(() => {
    setVIPParking(subarray(parking, 0, 10));
    setParkingLotLeft(subarray(parking, 10, 10));
    setParkingLotMiddle(subarray(parking, 20, 10));
    setParkingLotRight(subarray(parking, 30, 10));
    setParkingLotBottom(subarray(parking, 40, 10));
  }, [parking]);

  useEffect(() => {
    fetchData();
  }, []);

  const parkDona = async (dona, spot) => {
    if (!spot.isFree) {
      // TODO throw is not free
      return;
    }
    if (dona.parkingSpot) {
      // TODO throw dona is already parked
      return;
    }
    await api.updateParkingSpot({
      ...spot,
      lastPark: moment().format(),
      isFree: false,
      donaIndex: dona.name,
      image: dona.image,
    });
    await api.updateDona({
      ...dona,
      parkingSpot: spot.index,
    });
    await fetchData();
    setIsModalOpen(false);
  };
  const leaveSpot = async (spot) => {
    const [currentDona] = donas.filter((dona) => dona.name === spot.donaIndex);
    if (currentDona) {
      console.log(currentDona);
      await api.updateDona({
        ...currentDona,
        parkingSpot: null,
      });
      await api.updateParkingSpot({
        ...spot,
        isFree: true,
        donaIndex: null,
        image: null,
      });
      await fetchData();
      setIsModalOpen(false);
    }
  };

  const openSpotModal = (spot) => {
    if (spot.isFree) {
      setModalContent(
        <Garage
          donas={donas}
          spot={spot}
          onChoose={parkDona}
          onClose={() => setIsModalOpen(false)}
        />
      );
    } else {
      setModalContent(
        <SpotContent
          spot={spot}
          onClose={() => setIsModalOpen(false)}
          onLeave={leaveSpot}
        />
      );
    }
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <h1>THE PARKING LOT</h1>
        </div>
        {account ? (
          <div className="addr"> {account} </div>
        ) : (
          <Button className="btn" text="CONNECT WALLET" onPress={connect} />
        )}
      </div>

      <CustomModal modalIsOpen={isModalOpen} content={modalContent} />
      <div className="parking">
        <div className="parking-top">
          {parkingLotTop.map((spot) => (
            <Spot
              className="spot-top"
              key={spot.index}
              spot={spot}
              onSpotClick={openSpotModal}
            />
          ))}
        </div>
        <div className="parking-center">
          <div className="parking-left">
            {parkingLotLeft.map((spot) => (
              <Spot
                className="spot-left"
                key={spot.index}
                spot={spot}
                onSpotClick={openSpotModal}
              />
            ))}
          </div>
          <div className="parking-middle">
            {parkingLotMiddle.map((spot) => (
              <Spot
                className="spot-center"
                key={spot.index}
                spot={spot}
                onSpotClick={openSpotModal}
              />
            ))}
          </div>
          <div className="parking-right">
            {parkingLotRight.map((spot) => (
              <Spot
                className="spot-right"
                key={spot.index}
                spot={spot}
                onSpotClick={openSpotModal}
              />
            ))}
          </div>
        </div>
        <div className="parking-bottom">
          {parkingLotBottom.map((spot) => (
            <Spot
              className="spot-bottom"
              key={spot.index}
              spot={spot}
              onSpotClick={openSpotModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
