import TotalOrder from 'MaximApp/components/TotalOrder';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import placeholder from '../data/crypto.json';
export default function Crypto() {
  const { data } = placeholder;
  //   const [data, setData] = useState();

  //   async function getData() {
  //     const url =
  //       'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&sort=market_cap&cryptocurrency_type=all&tag=all' +
  //       `&CMC_PRO_API_KEY=${process.env.REACT_APP_COIN_MARKET_API_KEY}`;
  //     try {
  //       const data = await fetch(url, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'X-CMC_PRO_API_KEY': `${process.env.REACT_APP_COIN_MARKET_API_KEY}`
  //         }
  //       });
  //       const json = await data.json();
  //       console.log(json);

  //       setData(json);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   useEffect(() => {
  //     getData();
  //   }, []);
  const displayData = data?.map(entry => {
    const {
      quote: { USD }
    } = entry;
    const {
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
      percent_change_30d,
      percent_change_60d,
      percent_change_90d
    } = USD;
    const calculatePrice = percent => {
      const difference = (USD.price / 100) * percent;

      const total = USD.price - difference;
      return total;
    };
    const calculatedNumbers = [
      calculatePrice(percent_change_90d),
      calculatePrice(percent_change_60d),
      calculatePrice(percent_change_30d),
      calculatePrice(percent_change_7d),
      calculatePrice(percent_change_24h),
      calculatePrice(percent_change_1h)
    ];

    const price = [...calculatedNumbers, USD.price];
    return { name: entry.name, price, percent_change_1h, url: entry.slug };
  });
  return (
    <>
      <h2 className="display-5">Today's Cryptocurrency Prices by Market Cap</h2>
      <Container fluid>
        <Row className="g-3">
          {displayData?.map((ele, i) => (
            <Col key={i} md={6} lg={6} xxl={4}>
              <Link
                className="text-decoration-none"
                to={`https://coinmarketcap.com/currencies/${ele.url}/`}
                data-toggle="tooltip"
                data-placement="bottom"
                title="click to coinmarketcap"
              >
                <TotalOrder key={i} data={ele} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      {/* <TotalOrder data={[200000, 300000]} /> */}
    </>
  );
}
