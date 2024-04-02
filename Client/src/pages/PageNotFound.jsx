import React from "react";
import styled from "styled-components";

// Define styled components
const StyledH1 = styled.h1`
  color: red;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
`;

const PageNotFound = () => {
  return (
    <div>
      <StyledH1>
        What you are looking for has not been launched yet. 😢
      </StyledH1>
    </div>
  );
};

export default PageNotFound;
