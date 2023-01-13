import Image from "next/image";
import styled from "styled-components";
import React from "react";
const Div = styled.div`
  background-color: #2c2626;
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  bottom: 10px;
  left: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  > img::after {
    content: " - Remember this";
    color: #fff;
    font-size: 12px;
  }
`;
const Notif: React.FC = ({}) => {
  return (
    <Div>
      <Image src={"/Icons/Bell.svg"} width={"22%"} height={"22%"} />
    </Div>
  );
};

export default Notif;
