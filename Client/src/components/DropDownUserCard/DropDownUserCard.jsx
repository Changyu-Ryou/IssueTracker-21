import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DropDownprofilePicture = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 4px;
`;

function DropDownUserCard(props) {
  const {id, profile} = props;

  return (
  <DropDownUserCardContainer data-userid={id}>
    <DropDownprofilePictureContainer>
      <DropDownprofilePicture src={profile}/>
    </DropDownprofilePictureContainer>
    <DropDownUserIdContainer>
      {id}
    </DropDownUserIdContainer>
  </DropDownUserCardContainer>
  );
}

const DropDownUserCardContainer=styled.div`
border-top: 1px solid rgb(225, 228, 232);
padding: 7px;
display: flex;
flex: 1;

:hover {
    background-color: #f6f8fa;
  }`


const DropDownprofilePictureContainer=styled.div`
  display: flex;
  padding-left: 30px;
  flex: 1;`

const DropDownUserIdContainer = styled.div`
display: flex;
flex: 3;`

export default DropDownUserCard;
