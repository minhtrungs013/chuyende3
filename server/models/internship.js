const connect = require("../config/db");
const util = require("util");

const Internship = (internship) => {
  this.idInternship = internship.idInternship;
  this.fullNameInternship = internship.fullNameInternship;
  this.address = internship.address;
  this.university = internship.university;
  this.email = internship.email;
  this.mentor = internship.mentor;
  this.internshipProject = internship.internshipProject;
  this.teltelInternship = internship.telInternship;
  this.securityTest = internship.securityTest;
  this.idInternshipCourse = internship.idInternshipCourse;
  this.ToeicScore = internship.ToeicScore;
  this.testDate = internship.testDate;
  this.status = internship.status;
  this.remark = internship.remark;
  this.pcType = internship.pcType;
  this.covidVaccinationiInformation = internship.covidVaccinationiInformation;
  this.certificationDate = internship.certificationDate;
  this.internshipStatus = internship.internshipStatus;
};
const listColumn = "*";

Internship.get = async (condition, columns, page, limit) => {
  try {
    const where = buildWhere(condition);
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }

    const strSql = `SELECT ${listColumn}FROM internship WHERE ${where} LIMIT ${limit} OFFSET ${offset}`;

    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Internship.getTotalCount = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `SELECT count(*) as totalCount FROM internship WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Internship.getdetailBatch = async (condition, columns, page, limit) => {
  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);

    const strSql = `SELECT ${listColumn} FROM internship WHERE ${where} LIMIT ${limit} OFFSET ${offset} `;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Internship.remove = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM internship WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
Internship.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE internship SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};
Internship.createInternship = async (condition) => {
  try {
    const sql = `INSERT INTO internship SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};
const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.idInternship) {
    strWhere += " AND idInternship  = " + condition.idInternship;
  }
  if (condition.idInternshipCourse) {
    strWhere +=
      " AND candidates.idInternshipCourse  = " + condition.idInternshipCourse;
  }
  if (condition.idInternshipCourses) {
    strWhere +=
      " AND internship.idInternshipCourse  = " + condition.idInternshipCourses;
  }
  if (condition.idInternshipcourse) {
    strWhere += " AND idInternshipCourse  = " + condition.idInternshipcourse;
  }
  if (condition.emailInternship) {
    strWhere += ' AND internship.email = "' + condition.emailInternship + '"';
  }
  return strWhere;
};

Internship.ERROR_SPECIAL_CHARACTERISTICS =
  "Vui l??ng t??n c???a b???n kh??ng d??ng k?? t??? ?????c bi???t !!!!";
Internship.ERROR_LENGHT =
  "Vui l??ng nh???p th??ng tin trong kho???ng 2 -> 255 k?? t???!!!";
Internship.ERROR_DATE = " Ng??y sinh kh??ng h???p l??? ph???i l???n h??n 01/01/1960 !!!";
Internship.ERROR_EMAIL = "Email kh??ng h???p l??? !!!";
Internship.MESSAGE_CREATE = "Th??m th??nh c??ng !!!";
Internship.MESSAGE_UPDATE = "C???p nh???t th??nh c??ng !!!";
Internship.ERROR_CREATE = "DG ho???c kh??a th???c t???p kh??ng t???n t???i !!!";
Internship.ERROR_UPDATE = "Th???c t???p sinh kh??ng t???n t???i";
Internship.ERROR_DATENOW = "Ng??y sinh kh??ng ???????c l???n h??n ng??y hi???n t???i !!!";
Internship.ERROR_DATETEST = "Ng??y test kh??ng ???????c l???n h??n ng??y hi???n t???i !!!";
Internship.ERROR_DATECER =
  "Ng??y ch???ng nh???n kh??ng ???????c l???n h??n ng??y hi???n t???i !!!";
Internship.ERROR_EMPTY = "Vui l??ng ??i???n ?????y ????? th??ng tin !!!";
Internship.MESSAGE_DELETE = "X??a th??nh c??ng !!!";
Internship.ERROR_DELETE = " Th???c t???p sinh kh??ng t???n t???i";
Internship.MESSAGE_UPDATE = "C???p nh???t th??nh c??ng !!!";
Internship.MESSAGE_CREATE = "Th??m th??nh c??ng !!!";
Internship.ERROR_CREATE = "Th??m th???t b???i !!!";
Internship.ERROR_TOEIC = "??i???m toeic nh???p v??o kh??ng h???p l??? !!!";
Internship.ERROR_SECURITY = "??i???m security nh???p v??o kh??ng h???p l??? !!!";
Internship.ERROR_TEL = "S??? ??i???n tho???i kh??ng h???p l??? !!!";
Internship.ERROR_EMAIL_DUPLICATE = "Email th???c t???p sinh ???? t???n t???i";
module.exports = Internship;
