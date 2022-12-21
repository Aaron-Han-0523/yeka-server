const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "consulting",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "컨설팅 식별번호",
      },
      consultant_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "컨설턴트 식별번호",
      },
      client_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "사용자 식별번호",
      },
      client_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: "고객명",
      },
      client_image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: "고객이미지",
      },
      client_phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: "고객 전화번호",
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "결제일",
      },
      reservation_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "예약일",
      },
      consulting_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: "상담명",
      },
      payment_status: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "결제상태",
      },
      consulting_status: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "상담상태",
      },
      culture_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "분류 (동양식, 서양식)",
      },
      season: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "계절",
      },
      detail_season_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "세부분류(비비드,페일...)",
      },
      consulting_content: {
        type: DataTypes.STRING(),
        allowNull: true,
        defaultValue: "",
        comment: "상담내용",
      },
      tone: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "웜/쿨",
      },
      chroma: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "청/탁",
      },
      contrast: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "대비",
      },
      brightness: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "명도",
      },
      gloss: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "광택",
      },
      payment_amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "결제금액",
      },
      reservation_amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "예약금액",
      },
      commission: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "수수료",
      },
      final_amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: "최종금액",
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
      tableName: "consulting",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "consulting_id" }],
        },
      ],
    }
  );
};
