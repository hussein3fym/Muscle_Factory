import React from "react";
import { Stack, Typography } from "@mui/material";
import "./../ExercisesAPI/Ex-API.css";
import AllImg from "./../../Assets/BodyParts/All.png";
import CardioImg from "./../../Assets/BodyParts/Cardio.png";
import LowerArmsImg from "./../../Assets/BodyParts/Lower Arms.png";
import LowerLegsImg from "./../../Assets/BodyParts/Lower Legs.png";
import UpperLegsImg from "./../../Assets/BodyParts/Upper Legs.png";
import UpperArmsImg from "./../../Assets/BodyParts/Upper Arms.png";
import WaistImg from "./../../Assets/BodyParts/ABS.png";
import NeckImg from "./../../Assets/BodyParts/Neck.png";
import ChestImg from "./../../Assets/BodyParts/Chest.png";
import BackImg from "./../../Assets/BodyParts/Back.png";
import ShouldersImg from "./../../Assets/BodyParts/Shoulders.png";

// Mapping for body part images

const bodyPartImages = {
  all: AllImg,
  cardio: CardioImg,
  "lower arms": LowerArmsImg,
  "lower legs": LowerLegsImg,
  "upper legs": UpperLegsImg,
  "upper arms": UpperArmsImg,
  waist: WaistImg,
  neck: NeckImg,
  chest: ChestImg,
  back: BackImg,
  shoulders: ShouldersImg,
};

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  console.log("item:", item);
  console.log("bodyPartImages:", bodyPartImages);

  const imageUrl =
    bodyPartImages[item.toLowerCase()] || "./../../Assets/icons/logoM.png";

  console.log("imageUrl:", imageUrl);

  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className={`bodyPart-card ${bodyPart === item ? "active" : ""}`}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <img src={imageUrl} alt={item} className="body-part-image" />
      <Typography className="typography">{item}</Typography>
    </Stack>
  );
};
export default BodyPart;
