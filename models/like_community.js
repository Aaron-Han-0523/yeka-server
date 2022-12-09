const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('like_community', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            primaryKey: true,
            comment: '좋아요 식별번호'
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '작성자'
        },
        community_title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
            comment: '커뮤니티'
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
        tableName: 'like_community',
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