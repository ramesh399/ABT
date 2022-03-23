

module.exports = function (sequelize, DataTypes) {
    let WaybillDetails = sequelize.define('WaybillDetails', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        wayBillNo: {
            type: DataTypes.STRING(250),
            field: 'waybill_no'
        },
        podDate: {
            type: DataTypes.STRING(250),
            field: 'pod_date'
        },
        podImage: {
            type: DataTypes.STRING(250),
            field: 'pod_image'
        }


    },
        {
            timestamps: true,
            tableName: 'waybill_details'
        })

    return WaybillDetails;
}