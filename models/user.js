const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            primaryKey: true,
            comment: '사용자 식별번호'
        },
        user_type: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '사용자 유형'
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '사용자 아이디'
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '비밀번호'
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '이름'
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '휴대폰번호'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '이메일'
        },
        gender: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '성별'
        },
        address1: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '주소1'
        },
        address2: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '주소2'
        },
        address3: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '주소3'
        },
        business_registration_number: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '사업자등록번호'
        },
        business_registration_file: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '사업자등록증 파일'
        },
        hashtag: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '해시태그'
        },
        resume: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '자격현황 및 이력'
        },
        working_hour: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '상담 가능시간'
        },
        withdrawal: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '출금금액'
        },
        bank1: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '계좌정보1'
        },
        bank2: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '계좌정보2'
        },
        bank3: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '계좌정보3'
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
        tableName: 'user',
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