import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import milestone24 from "@iconify/icons-octicon/milestone-24";
import styled from "styled-components";
import MilestoneCard from "../../components/MilestoneCard";

function MilestoneList(props) {
  const [Milestones, setMilestones] = useState([]);

  useEffect(() => {
    Axios.get("/api/milestone").then((response) => {
      if (response.data.success) {
        const milestones = response.data.milestones;
        const result = milestones.reduce((acc, cur) => {
          cur.closeCount = 0;
          cur.openCount = 0;

          if (acc.length == 0) {
            if (cur.issueIsOpened == 0) {
              cur.closeCount = cur.count;
            } else {
              cur.openCount = cur.count;
            }
            return [cur];
          }

          if (acc[acc.length - 1] && acc[acc.length - 1].id === cur.id) {
            if (cur.issueIsOpened == 0) {
              acc[acc.length - 1].closeCount = cur.count;
            } else {
              acc[acc.length - 1].openCount = cur.count;
            }
            return acc;
          } else {
            if (cur.issueIsOpened == 0) {
              cur.closeCount = cur.count;
            } else {
              cur.openCount = cur.count;
            }

            return acc.concat([cur]);
          }
        }, []);

        setMilestones(result);
      } else {
        alert("Failed to get assignees");
      }
    });
  }, []);

  //delete milestone
  const onRemoveMilestone = (id) => {
    setMilestones(Milestones.filter((Milestone) => Milestone.id !== id));
  };

  //modify milestone
  const onModifyMilestone = (id, newStatus) => {
    setMilestones(
      Milestones.map((Milestone) => {
        if (Milestone.id === id) {
          Milestone.isOpened = newStatus;
        }
        return Milestone;
      })
    );
  };

  const renderMilestoneCard = Milestones.map((Milestone, idx) => {
    return (
      <MilestoneCard
        key={idx}
        Milestone={Milestone}
        onRemoveMilestone={onRemoveMilestone}
        onModifyMilestone={onModifyMilestone}
        {...props}
      />
    );
  });

  return (
    <ListStyle>
      <ListTopStyle id="listTop">
        <BtnStyle id="open">
          <Icon width="18" height="18" icon={milestone24} />
          &nbsp; Open
        </BtnStyle>
        <BtnStyle id="close">✔️&nbsp; Closed</BtnStyle>
      </ListTopStyle>
      <div id="contentsArea">{renderMilestoneCard}</div>
    </ListStyle>
  );
}

const ListStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #e9ecee;
  border-radius: 7px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const ListTopStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #f5f8fa;
  padding: 10px 20px;
`;

const BtnStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px;
  font-size: 15px;
`;

export default MilestoneList;
