import Image from "next/image";
import styled from "styled-components";
import React from "react";
import { useState } from "react";
interface PromptType {
  title: string;
  content: string;
  prompt?: boolean;
  accept?: () => void;
  decline?: () => void;
}
const Div = styled.div<{ active: boolean }>`
  background-color: #2c2626;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.active ? "1px 1px 9px 0px rgb(212 184 184 / 75%)" : ""};
`;
const Content = styled.div`
  border-radius: 5px;
  width: 100%;
  top: 13px;
  height: 80%;
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  background-color: #fff;
  overflow-y: auto;
`;
const Wrapper = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 0;
  z-index: 9;
`;
// The last one must be the first one
let arr = [
  {
    title: "new Game1",
    content: "smo 3lih want to play with u",
    prompt: true,
  },
  {
    title: "new Game2",
    content: "smo 3lih want to play with u",
    prompt: true,
  },
  {
    title: "new Game3",
    content: "smo 3lih want to play with u",
    prompt: true,
  },
  {
    title: "new Game4",
    content: "smo 3lih want to play with u",
    prompt: true,
  },
  {
    title: "new Game5",
    content: "smo 3lih want to play with u",
    prompt: true,
  },
  {
    title: "new Game6",
    content: "smo 3lih want to play with u",
    prompt: true,
  },
];
const Notifprompt = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2c2626;
  padding: 5px;
  border-bottom: 0.5px solid #000;
  max-height: 100px;
  .bottons {
    display: flex;
    width: 100%;
    justify-content: space-around;
    > input {
      border-radius: 15px;
      padding: 5px;
      cursor: pointer;
    }
  }
`;
const Prompt = ({ title, content, prompt, accept, decline }: PromptType) => {
  return (
    <Notifprompt>
      <h3>{title}</h3>
      <p>{content}</p>
      {prompt && (
        <div className="bottons">
          <input
            type="submit"
            value="Accept"
            onClick={accept}
            style={{ background: "#10df3596" }}
          />
          <input
            type="submit"
            value="Cancel"
            onClick={decline}
            style={{ background: "#df101096" }}
          />
        </div>
      )}
    </Notifprompt>
  );
};
const Notif: React.FC = ({}) => {
  const [active, setActive] = useState(false);
  return (
    <Wrapper>
      {active && (
        <Content>
          {arr.map((e) => (
            <Prompt
              title={e.title}
              content={e.content}
              prompt={e.prompt}
              accept={() => console.log(e.title, "accept")}
              decline={() => console.log(e.title, "accept")}
            />
          ))}
        </Content>
      )}
      <Div active={active} onClick={() => setActive(!active)}>
        <Image src={"/Icons/Bell.svg"} width={"22%"} height={"22%"} />
      </Div>
    </Wrapper>
  );
};

export default Notif;
