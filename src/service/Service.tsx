import { skillMaximumScoreValue } from "./Constants";

export const getSkillPercentage = (skillArray) => {
  var achievedEmployeeScore = 0;
  var employeeTotalScore = 0;
  var finalResult = 0;
  if (skillArray.length > 0) {
    skillArray?.map((item, id) => {
      achievedEmployeeScore = achievedEmployeeScore + item.score;
      employeeTotalScore = employeeTotalScore + skillMaximumScoreValue;
    });
    finalResult = calculatePercent(achievedEmployeeScore, employeeTotalScore);
    // finalResult = (achievedEmployeeScore / employeeTotalScore) * 100;
  }
  return finalResult;
};

export const calculatePercent = (achieved, total) => {
  var finalPercentResult = (achieved / total) * 100;
  return Math.round(finalPercentResult);
};

export const alertColor = (value) => {
  const progressBarColor =
    value >= 80 ? "green" : value >= 60 ? "orange" : "red";
  return progressBarColor;
};

export const getUserDetails = () => {
  var userDeatilsString = sessionStorage.getItem("userDetails");
  return JSON.parse(userDeatilsString);
};
