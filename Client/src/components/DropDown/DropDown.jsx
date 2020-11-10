import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import DropDownLabelList from "../DropDownLabelList";
import DropDownAssigneeList from "../DropDownAssigneeList";
import DropDownAuthorList from "../DropDownAuthorList";
import DropDownMilestoneList from "../DropDownMilestoneList";
import styled from "styled-components";

function DropDown(props) {
  const filter = props.filter;

  const [Items, setItems] = useState([]);
  const [SelectedItems, setSelectedItems] = useState([]);

  const getProperList = (filter) => {
    switch (filter){
      case "assignee":
        return <DropDownAssigneeList></DropDownAssigneeList>;
      case "author":
        return <DropDownAuthorList></DropDownAuthorList>;
      case "label":
        return <DropDownLabelList></DropDownLabelList>;       
      case "milestone":
        return <DropDownMilestoneList></DropDownMilestoneList>;
    }
  }

  return (
  <DropDownContainter>
    <DropDownBarContainter>Filter by {filter}</DropDownBarContainter>
    <DropDownListContainter>
      {getProperList(filter)}
    </DropDownListContainter>
  </DropDownContainter>
  );
}

const DropDownContainter = styled.div`
width: 200px;
border-radius: 6px;
border: 1px solid rgb(225, 228, 232);
font-size: 13px;
display: flex;
flex-flow: column;
box-shadow: 0px 0px 5px rgb(225, 228, 232);
z-index: 3;
`;

const DropDownBarContainter = styled.div`
border-radius: 6px 6px 0 0;
background-color: #fafbfc;
padding: 7px;
font-weight: 700;
`;

const DropDownListContainter = styled.div`
cursor: pointer;
border-radius: 0 0 6px 6px;
max-height: 200px;
overflow: scroll;
`;

export default DropDown;
