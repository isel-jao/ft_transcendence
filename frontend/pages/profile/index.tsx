import React, { useRef, useState } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "../../components/style/Home";

const GameElem = [
  {
    label: "Ball",
    name: "ball",
  },
  {
    label: "Corners",
    name: "corners",
  },
  {
    label: "My paddle",
    name: "paddle",
  },
  {
    label: "Other Paddle",
    name: "otherPaddle",
  },
];
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 5rem;
  flex-direction: column;
  span {
    font-weight: bold;
    font-size: 3.2rem;
    margin-left: 3rem;
  }
  .picSection {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    h4 {
      color: gray;
    }
    .inputStyle {
      display: none;
    }
    .editSection {
      position: relative;
      width: 200px;
      height: 200px;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
      background-color: #f2f2f2;
    }
    svg {
      position: absolute;
      right: 2%;
      top: 20%;
      background-color: black;
      border-radius: 50%;
      padding: 3px;
      cursor: pointer;
    }
  }
`;
const Card = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 100%;
  margin: 1.5rem;
  padding: 0.8rem;
  background: #151521;
  border-radius: 35px;
  gap: 3rem;
  .SubmitButton {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 5rem;
  }
  .Gamelayout {
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 5rem;
    align-items: center;
  }
`;
const FormSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  input {
    background: #151521;
    border: 1px solid #7b7373;
    border-radius: 5px;
    width: 350px;
    height: 60px;
    padding: 1rem;
  }
  label {
    font-weight: 600;
  }
  @media (max-width: 1400px) {
    flex-direction: column;
    gap: 3rem;
  }
  input[type="email"] {
    color: gray;
  }
`;
const GameLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  width: 80%;
  div {
    display: flex;
    justify-content: space-between;
  }
  input {
    cursor: pointer;
    width: 35px;
  }
  @media (max-width: 1400px) {
    div {
      gap: 1rem;
      justify-content: space-evenly;
      width: 100%;
    }
    h3 {
      width: 50%;
    }
  }
`;

interface UserInfo {
  username: string;
  email: string;
}
export default function Profile() {
  const InputRef = useRef<HTMLInputElement>(null);
  const [picProfile, setPicProfile] = useState<string>("");
  const [colors, setColors] = useState<any>({
    ball: "#14AD3F",
    corners: "#601CB7",
    paddle: "#AD1414",
    otherPaddle: "#EBB630",
  });
  const [userData, setUserData] = useState<UserInfo>({
    username: "mouarsas",
    email: "mustapha@1337.ma",
  });

  const onHanleChangeImage = (e: any) => {
    const imgUrl = e.target.files[0];
    if (imgUrl) {
      const file = new FileReader() as any;
      const RegxImage = /[\/.](gif|jpg|jpeg|png)$/i;
      file.readAsDataURL(imgUrl);
      file.onload = () => {
        if (RegxImage.test(imgUrl.type)) setPicProfile(file.result);
      };
    }
  };
  const onHandleChangeColors = (e: any) => {
    setColors({ ...colors, [e.target.name]: e.target.value });
  };
  const onHandleChangeData = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <div>
        <span>General setting</span>
      </div>
      <Card>
        <div className="picSection">
          <input
            type="file"
            ref={InputRef}
            onChange={onHanleChangeImage}
            className="inputStyle"
          />
          <div
            className="editSection"
            style={{
              backgroundImage: `url(${
                picProfile ||
                "https://cdn.intra.42.fr/users/65ffe01475f6bd67b479d2df8887d500/mouarsas.jpg"
              })`,
            }}
          >
            <EditIcon
              onClick={() => InputRef.current && InputRef.current.click()}
            />
          </div>
        </div>
        <div className="Gamelayout">
          <FormSection>
            <div>
              <label>Username</label>
              <input
                name="username"
                type="text"
                value={userData.username}
                placeholder="Enter your username"
                onChange={onHandleChangeData}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                placeholder="Enter your Email"
                disabled={true}
              />
            </div>
          </FormSection>
          <GameLayout>
            {GameElem.map(({ label, name }, idx) => (
              <div key={idx}>
                <h3>{label}</h3>
                <input
                  type="color"
                  onChange={onHandleChangeColors}
                  name={name}
                  value={colors[name]}
                />
              </div>
            ))}
          </GameLayout>
        </div>
        <div className="SubmitButton">
          <Button
            type="submit"
            value="SAVE"
            style={{ alignSelf: "flex-end" }}
          />
        </div>
      </Card>
    </Container>
  );
}
