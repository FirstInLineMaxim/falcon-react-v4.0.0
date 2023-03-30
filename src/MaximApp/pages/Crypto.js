import TotalOrder from 'MaximApp/components/TotalOrder';
import React from 'react';

import placeholder from '../data/crypto.json';
export default function Crypto() {
  const { data } = placeholder;
  const displayData = data.map(entry => {
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
      console.log({ difference });
      const total = USD.price - difference;
      console.log({ total });
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
    return { name: entry.name, price, percent_change_1h };
  });
  //   function getData() {
  //     fetch();
  //   }
  return (
    <>
      {displayData.map((ele, i) => (
        <TotalOrder key={i} data={ele} />
      ))}
      {/* <TotalOrder data={[200000, 300000]} /> */}
    </>
  );
}
