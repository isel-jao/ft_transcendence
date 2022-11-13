import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 80%;
  max-width: 1000px;
  > span {
    font-weight: 700;
    font-size: 3.5rem;
    padding-bottom: 20px;
  }
  > p {
    font-weight: 600;
    font-size: 0.8rem;
    line-height: 2rem;
    padding-bottom: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export { Div, Container };
