const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            primaryKey: true,
            comment: '주문 정보 식별번호'
        },
        orderer_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '주문자 이름'
        },
        orderer_phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '주문자 휴대폰 번호'
        },
        orderer_address1: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '주문자 주소1'
        },
        orderer_address2: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '주문자 주소2'
        },
        orderer_address3: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '주문자 주소3'
        },
        recipient_place: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '수령자 배송지'
        },
        recipient_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '수령자 이름'
        },
        recipient_phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '수령자 휴대폰 번호'
        },
        recipient_address1: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '수령자 주소1'
        },
        recipient_address2: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '수령자 주소2'
        },
        recipient_address3: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '수령자 주소3'
        },
        image1: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '대표 이미지'
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '제목'
        },
        option: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '옵션'
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '수량'
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
        total_fee: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '총금액'
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
        tableName: 'order',
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