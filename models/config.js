const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "config",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "환경설정 식별번호",
      },
      week_setting: {
        type: DataTypes.STRING(7),
        allowNull: false,
        defaultValue: "0000000",
        comment: "요일 설정",
      },
      start_time: {
        type: DataTypes.STRING(2),
        allowNull: false,
        defaultValue: "9",
        comment: "시작 시간",
      },
      end_time: {
        type: DataTypes.STRING(2),
        allowNull: false,
        defaultValue: "18",
        comment: "종료 시간",
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.NOW,
        comment: "생성일",
      },
      update_date: { type: DataTypes.DATE, allowNull: true, comment: "수정일" },
      delete_date: { type: DataTypes.DATE, allowNull: true, comment: "삭제일" },
    },
    {
      sequelize,
      tableName: "config",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
