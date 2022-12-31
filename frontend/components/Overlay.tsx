import Image from "next/image";
import styled from "styled-components";
const Div = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  z-index: 999;
  opacity: 71%;
`;
const Overlay = (data: boolean) => {
  return (
    <Div>
      <div>
        {/* <Text></Text> */}
        <Image src={"/images/giphy.gif"} width={250} height={250} />
      </div>
    </Div>
  );
};

export default Overlay;
