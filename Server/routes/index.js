import express from "express";

import UserRouter from "./user";
import MileStoneRouter from "./milestone";
import LabelRouter from "./label";
import IssueRouter from "./issue";
import CommentRouter from "./comment";
const { Auth } = require("../middleware/auth");

const router = express.Router();

router.use("/user", UserRouter);
router.use("/comment", CommentRouter);
router.use("/milestone", MileStoneRouter);
router.use("/label", LabelRouter);
router.use("/issue", Auth, IssueRouter);

module.exports = router;
