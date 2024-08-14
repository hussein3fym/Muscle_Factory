import React from "react";
import { Box } from "@mui/material";
import BodyPart from "./../BodyPart/BodyPart";
import ExerciseCard from "./../ExercisesAPI/ExerciseCard";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => (
  <div className="grid-container">
    {data.map((item) => (
      <Box
        key={item.id || item}
        itemId={item.id || item}
        title={item.id || item}
      >
        {bodyParts ? (
          <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
        ) : (
          <div>
            <ExerciseCard exercise={item} />
          </div>
        )}
      </Box>
    ))}
  </div>
);

export default HorizontalScrollbar;
