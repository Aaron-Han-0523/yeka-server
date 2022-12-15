const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '상품 식별번호'
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '제목'
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            defaultValue: '',
            comment: '설명'
        },
        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '판매가'
        },
        delivery_fee: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '배송비'
        },
        tag: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            defaultValue: '',
            comment: '태그'
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
        tableName: 'product',
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