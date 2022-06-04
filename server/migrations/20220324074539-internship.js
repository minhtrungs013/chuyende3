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

exports.up = function (db, callback) {
  db.createTable(
    "internship",
    {
      idInternship: {
        type: "int",
        length: 15,
        primaryKey: true,
        autoIncrement: true,
      },
      fullNameInternship: "string",
      address: "string",
      university: "string",
      email: "string",
      mentor: "string",
      internshipProject: "string",
      telInternship: { type: "string", length: 10 },
      securityTest: "string",
      idInternshipCourse: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_internship_internshipcourse",
          table: "internshipcourse",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: {
            idInternshipCourse: "idInternshipCourse",
          },
        },
      },
      toeicScore: { type: "int", length: "15" },
      testDate: "date",
      status: "string",
      remark: "string",
      pcType: "string",
      covidVaccinationiInformation: "string",
      certificationDate: { type: "date" },
    },
    callback
  );
};

exports.down = function (db) {
  db.dropTable("internship");
  return null;
};

exports._meta = {
  version: 1,
};
