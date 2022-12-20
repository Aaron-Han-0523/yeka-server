const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "community",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "커뮤니티 식별번호",
      },
      community_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "커뮤니티 종류",
      },
      community_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: "제목",
      },
      community_content: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: "내용",
      },
      community_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "",
        comment: "영상링크",
      },
      views: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "조회수",
      },
      writer: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: "작성자",
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.NOW,
        comment: "생성일",
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정일",
      },
      delete_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "삭제일",
      },
    },
    {
      sequelize,
      tableName: "community",
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
