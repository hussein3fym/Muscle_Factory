import React from "react";
import BodyPart from "./../BodyPart/BodyPart";
const HorizontalScrollbar = ({ data, bodyPart, setBodyPart }) => {
  return (
    <div>
      {data.map((item) => (
        <div
          key={item.id || item}
          itemId={item.id || item}
          title={item.id || item}
          style={{
            display: "inline-block",
            margin: "10px",
            cursor: "pointer",
            border: bodyPart === item ? "1px solid red" : "1px solid black",
            borderRadius: "5px",
            padding: "10px",
            backgroundColor: bodyPart === item ? "lightblue" : "white",
          }}
        >
          <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
        </div>
      ))}
    </div>
  );
};

export default HorizontalScrollbar;
