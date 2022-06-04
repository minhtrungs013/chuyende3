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
  "Vui lòng tên của bạn không dùng ký tự đặc biệt !!!!";
Internship.ERROR_LENGHT =
  "Vui lòng nhập thông tin trong khoảng 2 -> 255 kí tự!!!";
Internship.ERROR_DATE = " Ngày sinh không hợp lệ phải lớn hơn 01/01/1960 !!!";
Internship.ERROR_EMAIL = "Email không hợp lệ !!!";
Internship.MESSAGE_CREATE = "Thêm thành công !!!";
Internship.MESSAGE_UPDATE = "Cập nhật thành công !!!";
Internship.ERROR_CREATE = "DG hoặc khóa thực tập không tồn tại !!!";
Internship.ERROR_UPDATE = "Thực tập sinh không tồn tại";
Internship.ERROR_DATENOW = "Ngày sinh không được lớn hơn ngày hiện tại !!!";
Internship.ERROR_DATETEST = "Ngày test không được lớn hơn ngày hiện tại !!!";
Internship.ERROR_DATECER =
  "Ngày chứng nhận không được lớn hơn ngày hiện tại !!!";
Internship.ERROR_EMPTY = "Vui lòng điền đẩy đủ thông tin !!!";
Internship.MESSAGE_DELETE = "Xóa thành công !!!";
Internship.ERROR_DELETE = " Thực tập sinh không tồn tại";
Internship.MESSAGE_UPDATE = "Cập nhật thành công !!!";
Internship.MESSAGE_CREATE = "Thêm thành công !!!";
Internship.ERROR_CREATE = "Thêm thất bại !!!";
Internship.ERROR_TOEIC = "Điểm toeic nhập vào không hợp lệ !!!";
Internship.ERROR_SECURITY = "Điểm security nhập vào không hợp lệ !!!";
Internship.ERROR_TEL = "Số điện thoại không hợp lệ !!!";
Internship.ERROR_EMAIL_DUPLICATE = "Email thực tập sinh đã tồn tại";
module.exports = Internship;
