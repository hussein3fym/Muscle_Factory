import React from "react";
import styled from "styled-components";

// Define styled components
const StyledH1 = styled.h1`
  color: red;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
`;

const PageNotFound = () => {
  return (
    <div>
      <StyledH1> The page you are looking for could not be found 😢</StyledH1>
    </div>
  );
};

export default PageNotFound;
