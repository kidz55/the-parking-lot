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
import ParkingLogo from './assets/parkingLogo.js';

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
    web3.eth.defaultAccount = accounts[0];
  };

  const fetchDonas = async () => {
    if (!account) {
      console.log('not connected');
      return;
    }
    const amount = await getAmountOfDona(account);
    const nftIndexes = await getNFTIndexes(account, amount);
    const queries = nftIndexes.map((index) => api.getDona(index));
    try {
      const res = await Promise.all(queries);
      const donasObj = res
        .filter((el) => el !== null)
        .reduce((acc, dona) => {
          acc[dona?.id] = dona;
          return acc;
        }, {});
      setDonas(donasObj);
      console.log('donas fetched');
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchDonas();
  }, [account]);

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
      donaIndex: dona.id,
      donaName: dona.name,
      external_url: dona.external_url,
      image: dona.image,
    });
    await api.updateDona({
      ...dona,
      parkingSpot: spot.index,
    });
    const updated = { ...donas };
    updated[dona.id] = { ...dona, parkingSpot: spot.index };
    setDonas(updated);
    await fetchData();
    setIsModalOpen(false);
  };
  const leaveSpot = async (spot) => {
    const [currentDona] = Object.values(donas).filter(
      (dona) => dona.name === spot.donaName
    );
    if (currentDona) {
      await api.updateDona({
        ...currentDona,
        parkingSpot: null,
      });
      const updated = { ...donas };
      updated[currentDona.id] = { ...currentDona, parkingSpot: null };
      setDonas(updated);
      await api.updateParkingSpot({
        ...spot,
        isFree: true,
        donaIndex: null,
        donaName: null,
        external_url: null,
        image: null,
      });
      await fetchData();
      setIsModalOpen(false);
    }
  };

  const openSpotModal = async (spot) => {
    if (spot.isFree) {
      await fetchDonas();
      setModalContent(
        <Garage
          donas={donas}
          spot={spot}
          isConnected={!!account}
          onChoose={parkDona}
          onClose={() => setIsModalOpen(false)}
        />
      );
    } else {
      setModalContent(
        <SpotContent
          spot={spot}
          donas={donas}
          onClose={() => setIsModalOpen(false)}
          onLeave={leaveSpot}
        />
      );
    }
    setIsModalOpen(true);
  };
  const availableSpots = parking.filter((spot) => spot.isFree).length;
  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <ParkingLogo />
          <div className="description">
            <h1>The official parking of the metaverse</h1>
            <div className="available-spot">
              <span>
                AVAILABLE SPOTS: {`${availableSpots}/${parking.length}`}
              </span>
            </div>
          </div>
          {account ? (
            <div className="addr">
              {`Connected with ${account.substring(0, 6)}`}
            </div>
          ) : (
            <Button className="btn" text="CONNECT WALLET" onPress={connect} />
          )}
        </div>
      </div>

      <CustomModal modalIsOpen={isModalOpen} content={modalContent} />
      <div className="parking">
        <div className="parking-top">
          {parkingLotTop.map((spot) => (
            <Spot
              className="vip-spot"
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
