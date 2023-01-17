import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "../../components/style/Home";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import routes from "../../routes";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  border: "none",
  borderRadius: "8px",
  height: 600,
  boxShadow: 24,
  backgroundImage: "linear-gradient(#171221 10%, #171328 80.61%)",
  p: 4,
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormSection = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  padding-left: 2rem;
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
`;
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 1.5rem;
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
  .SubmitButton {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 8rem;
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
`;

type userDataType = {
  imageUrl: string;
  userName: string;
  id?: number;
};

export default function BasicModal({ userName, imageUrl, id }: userDataType) {
  const navigate = useRouter();
  const [userData, setUserData] = useState<userDataType>({
    userName,
    imageUrl,
  });
  const InputRef = useRef<HTMLInputElement>(null);

  const onHanleChangeImage = (e: any) => {
    const imgUrl = e.target.files[0];
    if (imgUrl) {
      const file = new FileReader() as any;
      const RegxImage = /[\/.](gif|jpg|jpeg|png)$/i;
      file.readAsDataURL(imgUrl);
      file.onload = () => {
        if (RegxImage.test(imgUrl.type))
          setUserData({ ...userData, imageUrl: file.result });
      };
    }
  };
  const { mutate } = useMutation(
    async () => {
      await axios.patch(`/user/${id}`, {
        ...userData,
        isFistSignIn: false,
      });
    },
    {
      onSuccess() {
        navigate.reload();
      },
    }
  );
  return (
    <Container>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <ProfileSection>
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
                  userData?.imageUrl ||
                  "https://cdn.intra.42.fr/users/65ffe01475f6bd67b479d2df8887d500/mouarsas.jpg"
                })`,
              }}>
              <EditIcon
                onClick={() => InputRef.current && InputRef.current.click()}
              />
            </div>
            <FormSection>
              <div>
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  value={userData.userName}
                  placeholder="Enter your username"
                  onChange={(e) =>
                    setUserData({ ...userData, userName: e.target.value })
                  }
                />
              </div>
            </FormSection>
            <div className="SubmitButton">
              <Button
                onClick={() => mutate()}
                type="submit"
                value="SAVE"
                style={{
                  alignSelf: "flex-end",
                  width: "120px",
                  padding: "0.5rem",
                  fontSize: "1.2rem",
                }}
              />
            </div>
          </ProfileSection>
        </Box>
      </Modal>
    </Container>
  );
}
