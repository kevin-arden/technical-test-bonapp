import React from "react";

const DetailComponent = (props) => {
  const { detailData } = props;
  console.log(detailData);
  return (
    <div>
      <h1>{detailData[0].title}</h1>
      <h3>{detailData[0].date}</h3>
      <p>{detailData[0].detail}</p>
    </div>
  );
};

export default DetailComponent;
