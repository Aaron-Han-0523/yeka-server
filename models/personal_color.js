const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "personal_color",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "퍼스널 컬러 식별번호",
      },
      color_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "컬러명",
      },
      fashion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "패션",
      },
      hair: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "헤어",
      },
      perfume: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "향수",
      },
      makeup_base: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "메이크업 베이스",
      },
      makeup_eye: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "메이크업 아이",
      },
      makeup_blusher: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "메이크업 블러셔",
      },
      lip: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "립",
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "간단한 설명",
      },
      tag: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "태그",
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
      tableName: "personal_color",
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
