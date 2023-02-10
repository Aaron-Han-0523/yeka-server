const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('reservation', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '예약 식별번호'
        },
        consulting_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: '0',
            comment: '컨설팅 ID 식별번호'
        },
        reservation_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: '',
            comment: '예약일'
        },
        state: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: '0',
            comment: '상태'
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
        tableName: 'reservation',
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