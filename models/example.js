module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define(
    "reviews",
    {
      employee_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 25]
        }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 25]
        }
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 45]
        }
      },
      attitute: {
        type: DataTypes.INTEGER
      },
      communication: {
        type: DataTypes.INTEGER
      },
      efficiency: {
        type: DataTypes.INTEGER
      },
      proficiency: {
        type: DataTypes.INTEGER
      },
      Reliability: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: "reviews",
      timestamps: false
    }
  );
  return Employee;
};
