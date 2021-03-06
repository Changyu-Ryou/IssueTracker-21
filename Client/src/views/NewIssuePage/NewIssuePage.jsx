import React from "react";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import axios from "axios";
import noprofile from "../../../public/img/noprofile.png";
import "./style.scss";
import CustomBtn from "../../components/CustomBtn";
import Sidebar from "../../components/Sidebar";
import { toggleArray, toggleObject } from "../../utils/toggle";

let assigneeList = [];
let milestone = null;
let labelList = [];

export const NewIssuePageContext = React.createContext();

function NewIssuePage(props) {
  const [User, setUser] = useState(null);
  const [Title, setTitle] = useState("");
  const [Contents, setContents] = useState("");
  const [BtnColor, setBtnColor] = useState("#ced2d7");

  const [curAssigneeList, setCurAssigneeList] = useState([]);
  const [curMilestone, setCurMilestoneList] = useState(null);
  const [curLabelList, setCurLabelList] = useState([]);

  const [progress, setProgress] = useState(0);

  const [isMounted, setisMounted] = useState(true);

  const assigneeListHandler = (data) => {
    assigneeList = toggleArray(assigneeList, data).slice();
  };

  const curAssigneeListHandler = () => {
    setCurAssigneeList(assigneeList);
  };

  const labelListHandler = (data) => {
    labelList = toggleArray(labelList, data).slice();
  };

  const curlabelListHandler = () => {
    setCurLabelList(labelList);
  };

  const milestoneListHandler = (data) => {
    milestone = toggleObject(milestone, data);
  };

  const curMilestoneListHandler = () => {
    setCurMilestoneList(milestone);
  };

  const assignMeHandler = () => {
    setCurAssigneeList([{ id: User.user.userId, profile: User.user.profile }]);
  };

  const assignNobodyHandler = () => {
    setCurAssigneeList([]);
  };

  const labelNothingHandler = () => {
    setCurLabelList([]);
  };

  const milestoneNothingHandler = () => {
    setCurMilestoneList(null);
  };

  //취소 버튼
  const cancelHandler = () => {
    props.history.push("/");
  };

  //제목 상태관리
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  //editor 내 text 상태관리 핸들러
  const typingHandler = (text) => {
    if (text.length === 0) {
      setBtnColor("#ced2d7");
    } else {
      setBtnColor("#2ea44f");
    }
    setContents(text);
  };

  //submit btn 핸들러
  const submitHandler = (e) => {
    if (Title.length === 0 || Contents.length === 0) {
      return alert("제목과 내용 모두 입력해주세요");
    }

    const body = {
      title: Title,
      authorId: User.user.userId,
      description: Contents,
      milestoneId: curMilestone ? curMilestone.id : null,
      assignees: curAssigneeList.length
        ? curAssigneeList.map((e) => e.id)
        : [],
      labels: curLabelList.length ? curLabelList.map((e) => e.id) : [],
    };

    axios.post("/api/issue", body).then((response) => {
      if (response.data.success) {
        props.history.push("/");
      } else {
        alert("Failed to req new issue");
      }
    });
  };

  // 페이지 로딩시 유저정보를 불러오기
  useEffect(() => {
    axios.get("/api/user/userinfo").then((response) => {
      if (response.data.success && isMounted) {
        setUser(response.data);
      } else {
        alert("Failed to get User info");
      }
    });
    return () => {
      setisMounted(false);
    };
  }, []);

  useEffect(async () => {
    if (curMilestone) {
      milestone = { ...curMilestone };
      await axios.get("/api/milestone").then((response) => {
        if (response.data.success) {
          const milestoneData = response.data.milestones;
          let openissueCount = 0;

          const issueCount = milestoneData
            .filter((e) => e.id === curMilestone.id)
            .reduce((acc, cur) => {
              if (cur.issueIsOpened) openissueCount += cur.count;
              return acc + cur.count;
            }, 0);
          if (openissueCount) {
            setProgress(Math.floor(((issueCount - openissueCount) / issueCount) * 100));
          } else setProgress(0);
        } else {
          alert("Failed to get User info");
        }
      });
    } else milestone = null;
  }, [curMilestone]);

  useEffect(() => {
    assigneeList = curAssigneeList.slice();
  }, [curAssigneeList]);

  useEffect(() => {
    labelList = curLabelList.slice();
  }, [curLabelList]);

  return (
    <div id="newIssueArea">
      <div id="profileArea">
        <img
          src={User ? User.user.profile : noprofile}
          alt="profile"
          id="issueProfile"
        />
      </div>
      <div id="editorArea">
        <input
          id="newIssueTitle"
          type="text"
          placeholder="Title"
          onChange={titleHandler}
          value={Title}
        />
        <div id="newIssueOpt">
          <div id="writeBtn">Write</div>
        </div>
        <Editor typingHandler={typingHandler} />
        <div id="btnArea">
          <div id="cancelBtn" onClick={cancelHandler}>
            cancel
          </div>
          <CustomBtn
            color="white"
            bgColor={BtnColor}
            width="150px"
            borderRad="6px"
            height="35px"
            border="0"
            id="submitBtn"
            onClick={submitHandler}
          >
            Submit new issue
          </CustomBtn>
        </div>
      </div>
      <div id="sideBar">
        <Sidebar
          assigneeList={assigneeList}
          labelList={labelList}
          milestone={milestone}
          progress={progress}
          curAssigneeList={curAssigneeList}
          curMilestone={curMilestone}
          curLabelList={curLabelList}
          curAssigneeListHandler={curAssigneeListHandler}
          assigneeListHandler={assigneeListHandler}
          labelListHandler={labelListHandler}
          milestoneListHandler={milestoneListHandler}
          curlabelListHandler={curlabelListHandler}
          curMilestoneListHandler={curMilestoneListHandler}
          assignMeHandler={assignMeHandler}
          assignNobodyHandler={assignNobodyHandler}
          labelNothingHandler={labelNothingHandler}
          milestoneNothingHandler={milestoneNothingHandler}
        />
      </div>
    </div>
  );
}

export default NewIssuePage;
