// list of pets

import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Loader from "../Loader";
import { useEffect, useState } from "react";

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
      {/* <TextContainer>
        <Text>Find your new bestfriend</Text>
      </TextContainer>
      <TypesContainer>
        <Type to="/pets/type/cat">Cats</Type>
        <Type to="/pets/type/dog">Dogs</Type>
        <Type to="/pets">All Pets</Type>
      </TypesContainer> */}

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
  background-color: #ffe6f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   background-color: white;
//   height: 8%;
//   width: 100%;
// `;

// const Text = styled.h2`
//   color: black;
//   font-size: 32px;
//   height: 60px;
//   padding: 10px;
// `;

// const TypesContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

// const Type = styled(NavLink)`
//   background-color: black;
//   color: white;
//   font-size: 30px;
//   text-decoration: none;
//   padding: 20px;
//   margin: 30px;
//   /* height: 100px; */

//   &:hover {
//     cursor: pointer;
//   }
// `;

const PetsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
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
`;

const Picture = styled.img`
  height: 60%;
  width: 60%;
  /* height: 350px;
  width: 350px; */
  border-radius: 2px;
  margin-bottom: 20px;
  align-self: center;
  border: 3px solid #ffe6e6;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Name = styled.h1`
  color: black;
  font-size: 18px;
  margin-bottom: 8px;
  margin-top: 15px;
`;

const Breed = styled.h2`
  color: black;
  font-size: 18px;
  font-weight: normal;
`;

export default Pets;
