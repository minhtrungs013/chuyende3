const internshipModel = require("../models/internship");

const statusCodes = require("http-status-codes");
const get = async (req, res) => {
  let page = 1,
    limit = 20;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }

  const results = await internshipModel.get({}, [], page, limit);
  const total = await internshipModel.getTotalCount({}, [], page, limit);
  return res.send({
    data: results,
    total: total,
  });
};

const detail = async (req, res) => {
  const id = req.params.id;
  const results = await internshipModel.get({ idInternship: id }, [], 1, 1);
  return res.send({ data: results[0] });
};

const detailBatch = async (req, res) => {
  let page = 1,
    limit = 20;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const id = req.params.id;
  const results = await internshipModel.getdetailBatch(
    { idInternshipcourse: id },
    [],
    page,
    limit
  );
  const total = await internshipModel.getTotalCount(
    { idInternshipCourses: id },
    [],
    page,
    limit
  );
  return res.send({
    data: results,
    total: total,
  });
};
const remove = async (req, res) => {
  const id = req.params.id;
  const result = await internshipModel.remove({ idInternship: id });
  return res.status(statusCodes.OK).json({
    status: result,
    Message: result
      ? internshipModel.MESSAGE_DELETE
      : internshipModel.ERROR_DELETE,
  });
};
const update = async (req, res) => {
  const idInternship = req.params.id;
  const {
    fullNameInternship: fullNameInternship,
    address: address,
    university: university,
    email: email,
    mentor: mentor,
    internshipProject: internshipProject,
    telInternship: telInternship,
    securityTest: securityTest,
    toeicScore: toeicScore,
    testDate: testDate,
    idInternshipCourse: idInternshipCourse,
    status: status,
    remark: remark,
    pcType: pcType,
    covidVaccinationiInformation: covidVaccinationiInformation,
    certificationDate: certificationDate,
  } = req.body;
  console.log(fullNameInternship, 
    address ,
    university ,
    mentor,
    email ,
    internshipProject, 
    telInternship, 
    securityTest, 
    toeicScore, 
    testDate, 
    status ,
    remark ,
    pcType, 
    covidVaccinationiInformation, 
    certificationDate,)
  if (
    !fullNameInternship ||
    !address ||
    !university ||
    !email ||
    !mentor ||
    !internshipProject ||
    !telInternship ||
    !securityTest ||
    !toeicScore ||
    !testDate ||
    !status ||
    !remark ||
    !pcType ||
    !covidVaccinationiInformation ||
    !certificationDate
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: internshipModel.ERROR_EMPTY });
  }
  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  const checkForSpecialChar = function (string) {
    for (i = 0; i < specialChars.length; i++) {
      if (string.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  };
  if (checkForSpecialChar(fullNameInternship)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: internshipModel.ERROR_SPECIAL_CHARACTERISTICS });
  }

  if (fullNameInternship.length < 2 || fullNameInternship.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  if (address.length < 2 || address.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!emailRegex.test(email)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_EMAIL,
    });
  }

  if (internshipProject.length < 2 || internshipProject.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  if (university.length < 2 || university.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  const sdtRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (!sdtRegex.test(telInternship)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_TEL,
    });
  }
  const secuRegex = /\b(^0|0?[1-9]|1[0-9]|2[0-9]|^30)\b/g;
  if (!secuRegex.test(securityTest)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_SECURITY,
    });
  }
  const scoreRegex = /^\d{1,3}$/g;
  if (!scoreRegex.test(toeicScore)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_TOEIC,
    });
  }
  const dateNow2 = new Date();
  const dateRequest2 = new Date(
    testDate.slice(0, 4) +
      "/" +
      testDate.slice(5, 7) +
      "/" +
      testDate.slice(8, 10)
  );
  if (dateRequest2.getTime() > dateNow2.getTime()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_DATETEST,
    });
  }

  if (status.length < 2 || status.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  if (remark.length < 2 || remark.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }

  if (
    covidVaccinationiInformation.length < 2 ||
    covidVaccinationiInformation.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  const dateNow1 = new Date();
  const dateRequest1 = new Date(
    certificationDate.slice(0, 4) +
      "/" +
      certificationDate.slice(5, 7) +
      "/" +
      certificationDate.slice(8, 10)
  );
  if (dateRequest1.getTime() > dateNow1.getTime()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_DATECER,
    });
  }

  const result = await internshipModel.update({
    fullNameInternship: fullNameInternship,
    address: address,
    university: university,
    email: email,
    mentor: mentor,
    internshipProject: internshipProject,
    telInternship: telInternship,
    securityTest: securityTest,
    toeicScore: toeicScore,
    testDate: testDate,
    status: status,
    remark: remark,
    pcType: pcType,
    covidVaccinationiInformation: covidVaccinationiInformation,
    certificationDate: certificationDate,
    idInternship: idInternship,
  });

  return res.status(statusCodes.OK).json({
    data: result,
    message: result
      ? internshipModel.MESSAGE_UPDATE
      : internshipModel.ERROR_UPDATE,
  });
};

const createInternship = async (req, res) => {
  const {
    fullNameInternship: fullNameInternship,
    address: address,
    university: university,
    email: email,
    mentor: mentor,
    internshipProject: internshipProject,
    telInternship: telInternship,
    securityTest: securityTest,
    toeicScore: toeicScore,
    testDate: testDate,
    idInternshipCourse: idInternshipCourse,
    status: status,
    remark: remark,
    pcType: pcType,
    covidVaccinationiInformation: covidVaccinationiInformation,
    certificationDate: certificationDate,
  } = req.body;

  if (
    !fullNameInternship ||
    !address ||
    !university ||
    !email ||
    !mentor ||
    !internshipProject ||
    !telInternship ||
    !securityTest ||
    !toeicScore ||
    !testDate ||
    !status ||
    !remark ||
    !pcType ||
    !covidVaccinationiInformation ||
    !certificationDate
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: internshipModel.ERROR_EMPTY });
  }
  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  const checkForSpecialChar = function (string) {
    for (i = 0; i < specialChars.length; i++) {
      if (string.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  };
  if (checkForSpecialChar(fullNameInternship)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: internshipModel.ERROR_SPECIAL_CHARACTERISTICS });
  }

  if (fullNameInternship.length < 2 || fullNameInternship.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  if (address.length < 2 || address.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!emailRegex.test(email)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_EMAIL,
    });
  }
  const countemail = await internshipModel.getdetailBatch(
    { emailInternship: email, idInternshipCourses: idInternshipCourse },
    [],
    1,
    1
  );
  if (countemail.length) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_EMAIL_DUPLICATE,
    });
  }
  if (internshipProject.length < 2 || internshipProject.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  if (university.length < 2 || university.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  const sdtRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (!sdtRegex.test(telInternship)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_TEL,
    });
  }
  const secuRegex = /\b(^0|0?[1-9]|1[0-9]|2[0-9]|^30)\b/g;
  if (!secuRegex.test(securityTest)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_SECURITY,
    });
  }
  const scoreRegex = /^\d{1,3}$/g;
  if (!scoreRegex.test(toeicScore)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_TOEIC,
    });
  }
  const dateNow2 = new Date();
  const dateRequest2 = new Date(
    testDate.slice(0, 4) +
      "/" +
      testDate.slice(5, 7) +
      "/" +
      testDate.slice(8, 10)
  );
  if (dateRequest2.getTime() > dateNow2.getTime()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_DATETEST,
    });
  }

  if (status.length < 2 || status.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  if (remark.length < 2 || remark.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }

  if (
    covidVaccinationiInformation.length < 2 ||
    covidVaccinationiInformation.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_LENGHT,
    });
  }
  const dateNow1 = new Date();
  const dateRequest1 = new Date(
    certificationDate.slice(0, 4) +
      "/" +
      certificationDate.slice(5, 7) +
      "/" +
      certificationDate.slice(8, 10)
  );
  if (dateRequest1.getTime() > dateNow1.getTime()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: internshipModel.ERROR_DATECER,
    });
  }

  const result = await internshipModel.createInternship({
    fullNameInternship: fullNameInternship,
    address: address,
    university: university,
    email: email,
    mentor: mentor,
    internshipProject: internshipProject,
    telInternship: telInternship,
    securityTest: securityTest,
    toeicScore: toeicScore,
    testDate: testDate,
    idInternshipCourse: idInternshipCourse,
    status: status,
    remark: remark,
    pcType: pcType,
    covidVaccinationiInformation: covidVaccinationiInformation,
    certificationDate: certificationDate,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result
      ? internshipModel.MESSAGE_CREATE
      : internshipModel.ERROR_CREATE,
  });
};

module.exports = {
  get,
  detail,
  detailBatch,
  remove,
  update,
  createInternship,
};
