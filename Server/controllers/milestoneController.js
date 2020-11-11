const milestoneDao = require("../dao/milestoneDao");

/* 모든 마일스톤 조회 */
exports.getMilestone = async (req, res) => {
  try {
    let data = await milestoneDao.getMilestone();
    const milestones = data.milestones;
    const milestoneCount = data.milestoneCount;
    return res.status(200).json({
      success: true,
      milestoneCount: milestoneCount,
      milestones: milestones,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

/* 마일스톤 생성 */
exports.insertMilestone = async (req, res) => {
  try {
    let { title, description, dueDate } = req.body;
    await milestoneDao.insertMilestone(title, description, dueDate);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

/* 마일스톤 수정 */
exports.updateMilestone = async (req, res) => {
  try {
    let { milestoneId, title, description, dueDate } = req.body;
    await milestoneDao.updateMilestone(
      milestoneId,
      title,
      description,
      dueDate
    );
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

/* 마일스톤 삭제 */
exports.deleteMilestone = async (req, res) => {
  try {
    let { milestoneId } = req.query;
    await milestoneDao.deleteMilestone(milestoneId);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};

/* 마일스톤 상태 수정 */
exports.updateMilestoneStatus = async (req, res) => {
  try {
    let { milestoneId, newStatus } = req.body;
    await milestoneDao.updateMilestoneStatus(milestoneId, newStatus);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      e,
    });
  }
};
