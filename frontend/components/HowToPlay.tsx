import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  filter: blur(18.5px);
`;
const Card = styled.div`
  background: #2c2c2c;
  box-shadow: 0px 15px 18px rgba(0, 0, 0, 0.92);
  border-radius: 10px;
  width: 30%;
  height: 30%;
  position: absolute;
`;
const HowToPlay = ({ hidden }: { hidden: boolean }) => {
  return hidden ? (
    <Container>
      <Card></Card>
    </Container>
  ) : (
    <></>
  );
};

export default HowToPlay;
