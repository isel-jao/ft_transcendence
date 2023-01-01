import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { Button } from "../../components/style/Home";
import axios from "axios";

const ClassStyle = {
  height: "340px",
  transition: "height 0.7s ease-in-out",
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
  @media (max-width: 512px) {
    padding: 1rem;
    margin: 0rem !important;
  }
  h4 {
    color: gray;
  }
`;
const Card = styled.div`
  width: 350px;
  height: 450px;
  border-radius: 12px;
  background-image: url("");
  /* box-shadow: inset 0px -100px 100px #151521; */
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  @media (max-width: 512px) {
    width: 100%;
  }
`;
const CardInfo = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  height: 150px;
  padding: 1rem;
  background: #151521;
  box-shadow: 0px 0px 120px 40px #151521;
  .CardTitle {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    justify-content: space-between;
  }
  img {
    cursor: pointer;
  }
`;
const BadgesStyle = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 0.3rem;
  h3 {
    font-weight: bold;
  }
  .badges {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .average {
    display: flex;
    gap: 3rem;
  }
  .gameStatus {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
`;

const SearchLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 3rem 1rem;
  .title {
    font-weight: 700;
    font-size: 3.5rem;
    margin-bottom: 3rem;
  }
  form {
    width: 600px;
    display: flex;
    position: relative;
  }
  .searchInput {
    width: 100%;
    height: 60px;
    border-radius: 40px;
    background-color: white;
    padding: 1rem;
    color: black;
    font-weight: 600;
    padding-right: 140px;
  }
  .submitInput {
    width: 120px;
    height: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 30px;
    position: absolute;
    right: 1%;
    top: 6%;
  }
  @media (max-width: 768px) {
    form {
      width: 90%;
    }
    .submitInput {
      width: 80px;
    }
    .searchInput {
      padding-right: 80px;
    }
  }
`;

const Users = () => {
  const [isSelected, setIsSelected] = useState<any>();
  const [userData, setUserData] = useState<any>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const onSearch = (e: any) => {
    e.preventDefault();
    getUsers();
  };
  const onHandleChangeInput = (e: any) => {
    setSearchInput(e.target.value);
  };

  const getUsers = async () => {
    try {
      const { data }: any = await axios.get("/user", {
        params: {
          where: JSON.stringify({
            userName: {
              contains: searchInput,
            },
          }),
          include: JSON.stringify({
            _count: true,
            profile: {
              include: {
                _count: true,
              },
            },
          }),
        },
      });
      setUserData(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <SearchLayout>
        <span className="title">Players</span>
        <form onSubmit={onSearch}>
          <input
            type="text"
            placeholder="Find Another Players"
            className="searchInput"
            onChange={onHandleChangeInput}
          />
          <Button type="submit" value="Search" className="submitInput" />
        </form>
      </SearchLayout>
      <Container>
        {userData?.map(
          ({ userName, imageUrl, status, profile }: any, idx: number) => (
            <Card
              key={idx}
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            >
              <CardInfo
                style={
                  isSelected === idx
                    ? ClassStyle
                    : { transition: "0.5s ease-in-out" }
                }
              >
                <div className="CardTitle">
                  <div>
                    <h3>#{userName}</h3>
                    <span>{status}</span>
                  </div>

                  <Image src="/icons/add.svg" width={25} height={25} />
                </div>
                <img
                  src={
                    isSelected !== idx
                      ? "/icons/cardInfo.svg"
                      : "/icons/close.svg"
                  }
                  width={45}
                  height={45}
                  onClick={() => setIsSelected(idx === isSelected ? "" : idx)}
                  style={{ alignSelf: "center" }}
                />
                {idx === isSelected && (
                  <BadgesStyle>
                    <h3>Badges :</h3>
                    <div className="badges">
                      <img
                        src="/icons/badges/achiv1.svg"
                        width={30}
                        height={30}
                      />
                      <img
                        src="/icons/badges/achiv2.svg"
                        width={30}
                        height={30}
                      />
                      <img
                        src="/icons/badges/achiv3.svg"
                        width={45}
                        height={45}
                      />
                    </div>
                    <div className="average">
                      <h3>AVG: </h3>
                      <h3>0 %</h3>
                    </div>
                    <div className="gameStatus">
                      <div>
                        <h3>WIN</h3>
                        <h3>{profile._count.matchesWon}</h3>
                      </div>
                      <div>
                        <h3>LOSE</h3>
                        <h3>{profile._count.matchesLose}</h3>
                      </div>
                    </div>
                  </BadgesStyle>
                )}
              </CardInfo>
            </Card>
          )
        )}
        {userData.length === 0 && <h4>players list is empty</h4>}
      </Container>
    </>
  );
};

export default Users;
