const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('image', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '이미지 식별번호'
        },
        image_type: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '이미지 종류'
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '상품 식별번호'
        },
        consultant_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '컨설턴트 식별번호'
        },
        community_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '커뮤니티 식별번호'
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '제목'
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '내용'
        },
        create_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.NOW,
            comment: '생성일'
        },
        update_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일'
        },
        delete_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '삭제일'
        },
    }, {
        sequelize,
        tableName: 'image',
        timestamps: false,
        indexes: [{
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{
                name: 'id'
            }, ]
        }, ]
    });
};