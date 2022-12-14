const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('menu', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '메뉴 식별번호'
        },
        consultant_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '컨설턴트 식별번호'
        },
        menu_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '메뉴명'
        },
        menu_amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '메뉴금액'
        },
        menu_content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '메뉴내용'
        },
        menu_image: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '메뉴이미지'
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
            defaultValue: Sequelize.Sequelize.NOW,
            comment: '수정일'
        },
        delete_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.NOW,
            comment: '삭제일'
        },
    }, {
        sequelize,
        tableName: 'menu',
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