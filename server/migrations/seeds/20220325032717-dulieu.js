"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  db.insert("users", {
    username: "User1",
    password: "827ccb0eea8a706c4c34a16891f84e7b",
  });
  db.insert("users", {
    username: "User2",
    password: "e10adc3949ba59abbe56e057f20f883e",
  });
  //////////////////
  db.insert("internshipcourse", {
    idInternshipCourse: 1,
    nameCoure: "Batch 1",
    dateStart: "2006/02/14",
    dateEnd: "2006/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 2,
    nameCoure: "Batch 2",
    dateStart: "2007/02/14",
    dateEnd: "2007/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 3,
    nameCoure: "Batch 3",
    dateStart: "2008/02/14",
    dateEnd: "2008/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 4,
    nameCoure: "Batch 4",
    dateStart: "2009/02/14",
    dateEnd: "2009/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 5,
    nameCoure: "Batch 5",
    dateStart: "2010/02/14",
    dateEnd: "2010/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 6,
    nameCoure: "Batch 6",
    dateStart: "2011/02/14",
    dateEnd: "2011/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 7,
    nameCoure: "Batch 7",
    dateStart: "2012/02/14",
    dateEnd: "2012/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 8,
    nameCoure: "Batch 8",
    dateStart: "2013/02/14",
    dateEnd: "2013/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 9,
    nameCoure: "Batch 9",
    dateStart: "2022/02/14",
    dateEnd: "2022/05/08",
    status: "In progress",
    kindOfInternship: "Full time",
  });

  ////////////////////////////////////////////////////////////////////////

  db.insert("internship", {
    fullNameInternship: "Lê Ngọc Huy",
    address: "Quy Nhơn",
    university: "Đại Học Quy Nhơn",
    email: "lengochuy789@gmail.com",
    mentor: "Mai Phi Hùng",
    internshipProject: "IMS Project",
    telInternship: "0333232454",
    securityTest: "29",
    idInternshipCourse: 9,
    toeicScore: "550",
    testDate: "2022/02/22",
    status: "Đang thực tập",
    remark: "Tốt",
    pcType: "Laptop",
    covidVaccinationiInformation: "3 mũi",
    certificationDate: "2022/02/22",
  });
  db.insert("internship", {
    fullNameInternship: "Đỗ Minh Trung",
    address: "Quy Nhơn",
    university: "Đại Học Quy Nhơn",
    email: "trungdo@gmail.com",
    mentor: "Võ Văn Dũng",
    internshipProject: "IMS Project",
    telInternship: "0333332324",
    securityTest: "29",
    idInternshipCourse: 9,
    toeicScore: "550",
    testDate: "2022/02/22",
    status: "Đang thực tập",
    remark: "Tốt",
    pcType: "Laptop",
    covidVaccinationiInformation: "3 mũi",
    certificationDate: "2022/02/22",
  });
  db.insert("internship", {
    fullNameInternship: "Lê Trần Hữu Chánh",
    address: "Quy Nhơn",
    university: "Đại Học Quy Nhơn",
    email: "chanhtran@gmail.com",
    mentor: "Mai Phi Hùng",
    internshipProject: "IMS Project",
    telInternship: "0333992454",
    securityTest: "29",
    idInternshipCourse: 9,
    toeicScore: "550",
    testDate: "2022/02/22",
    status: "Đang thực tập",
    remark: "Tốt",
    pcType: "Laptop",
    covidVaccinationiInformation: "3 mũi",
    certificationDate: "2022/02/22",
  });
  return null;
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
