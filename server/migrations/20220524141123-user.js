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
    "users",
    {
      idUsers: {
        type: "int",
        length: 15,
        primaryKey: true,
        autoIncrement: true,
      },
      username: "string",
      password: "string",
    },
    callback
  );
};

exports.down = function (db) {
  db.dropTable("users");
  return null;
};

exports._meta = {
  version: 1,
};
