import React, { useEffect, useState } from 'react';
import './App.css';

const WebSocketComponent = () => {
  const [bidTabelData, setBidTabelData] = useState([[]]);
  const [askTabelData, setAskTabelData] = useState([[]]);
  const [subsequentData, setSubsequentData] = useState(null);
  const [initialDataRecieved, setInitialDataRecieved] = useState(false);

  let refresh;
  useEffect(() => {
    // Create WebSocket connection.
    const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    // Event listener for incoming messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, "All type data");
      if (Array.isArray(data) > 0 && Array.isArray(data[1][0]) && initialDataRecieved !== true) {
        let initialData = data[1].map((item, index) => {
          return (
            {
              "priceLevel": item[0],
              "value": item,
              "count": item[1],
              "amount": item[2],
              "amountIsPositive": item[2] > 0 ? true : false
            }
          )
        })

        console.log(initialData, "Initial Data");
        let bidTableData = initialData.filter(item => item.amountIsPositive === true);
        let askTableData = initialData.filter(item => item.amountIsPositive === false);
        console.log(bidTableData, "bidtabeldate");
        console.log(askTableData, "asktabeldate");
        setBidTabelData(bidTableData);
        setAskTabelData(askTableData);
        setInitialDataRecieved(true);


      }
      else if (Array.isArray(data) > 0 && Array.isArray(data[1]) && initialDataRecieved === true) {
        let subs = mapArrayData(data[1]);
        console.log(subs, "Subsequent Data");
        setSubsequentData(subs);
        deletePriceLevel(subs, bidTabelData, askTabelData);
        addUpdatePriceLevel(subs, bidTabelData, askTabelData)
      }
    };

    // Event listener for connection open
    ws.onopen = () => {
      console.log('WebSocket connection opened');
      let msg = JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD'
      });
      ws.send(msg);
    };

    // Event listener for connection close
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Event listener for connection error
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, [bidTabelData, askTabelData]);

  function deletePriceLevel(data, bidTabelData, askTabelData) {
    if (data.count === 0) {
      if (data.amount === 1) {

        let dataB = bidTabelData.filter(item => item.priceLevel !== data.priceLevel)
        if (dataB.length < bidTabelData.length) {
          setBidTabelData(dataB)
          return true;
        }
      }
      else if (data.amount === -1) {
        let dataA = askTabelData.filter(item => item.priceLevel !== data.priceLevel)
        if (dataA.length < askTabelData.length) {
          setAskTabelData(dataA)
          return true;
        }
      }
    }
  }

  function addUpdatePriceLevel(data, bidTabelData, askTabelData) {
    if (data.count > 0) {
      if (data.amount > 0) {
        let itemfind = bidTabelData.find(item => item.priceLevel === data.priceLevel);
        if (itemfind !== undefined) {

          let indexToUpdate = bidTabelData.indexOf(itemfind);
          const newArray = bidTabelData.map((item, index) =>
            index === indexToUpdate ? data : item
          );
          setBidTabelData(newArray);
        }
        else {
          let dataB = [...bidTabelData, data]
          setBidTabelData(dataB)
        }
      }
      else if (data.amount < 0) {
        let dataA = askTabelData.filter(item => item.priceLevel !== data.priceLevel)
        if (dataA.length < askTabelData.length) {
          setAskTabelData(dataA)
          return true;
        }
      }
    }
  }


  return (
    <div className='Container'>
      <table>
        <tr>
          <th>Price</th>
          <th> Count</th>
          <th> Amount</th>
        </tr>

        {bidTabelData.map((item, index) =>
        (
          <tr key={index}>
            <td>{item.priceLevel}</td>
            <td>{item.count}</td>
            <td>{item.amount}</td>
          </tr>
        )
        )}
      </table>
      <table>
        <tr>
          <th>Price</th>
          <th> Count</th>
          <th> Amount</th>
        </tr>

        {askTabelData.map((item, index) =>
        (
          <tr key={index}>
            <td>{item.priceLevel}</td>
            <td>{item.count}</td>
            <td>{item.amount}</td>
          </tr>
        )
        )}
      </table>
    </div>
  );
};

function mapArrayData(array) {

  return (
    {
      "priceLevel": array[0],
      "value": array,
      "count": array[1],
      "amount": array[2],
      "amountIsPositive": array[2] > 0 ? true : false
    }
  );



}

export default WebSocketComponent;
