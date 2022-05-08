// list of pets

import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import Loader from "../Loader";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // get all pets
  useEffect(() => {
    const findPets = async () => {
      const res = await fetch("/pets");
      const data = await res.json();
      console.log(data.data);
      setPets(data.data);
      setIsLoading(false);
    };
    findPets();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      {/* <TextContainer> */}
      <Text>
        Find the perfect companion
        <FaHeart
          size={26}
          style={{
            marginBottom: "-5px",
            // backgroundColor: "white",
            paddingLeft: "5px",
          }}
        />
      </Text>
      {/* </TextContainer> */}
      <PetsListContainer>
        {pets.map((p) => (
          <Pet key={p._id}>
            <NavigationLink to={`/pet/${p._id}`}>
              <PetContainer>
                <Picture src={p.picture} />
                <Name>{p.name}</Name>
                <Breed>{p.breed}</Breed>
              </PetContainer>
            </NavigationLink>
          </Pet>
        ))}
      </PetsListContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: var(--grey);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

const Text = styled.h2`
  color: black;
  font-size: 28px;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: var(--mint);
  border-radius: 20px;
`;

const PetsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  /* margin: 10px; */
`;

const Pet = styled.div``;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
`;

const PetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 90%;
  width: 90%;
  border-radius: 4px;
`;

const Picture = styled.img`
  height: 60%;
  width: 60%;
  border-radius: 2px;
  margin-bottom: 20px;
  align-self: center;
  /* border: 3px solid #ffe6e6; */

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Name = styled.h1`
  color: black;
  font-size: 24px;
  margin-bottom: 8px;
  margin-top: 15px;
`;

const Breed = styled.h2`
  color: black;
  font-size: 20px;
  font-weight: normal;
`;

export default Pets;
