module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    quantity: DataTypes.STRING,
    product_name: DataTypes.STRING,
    size: DataTypes.STRING,
    sweet: DataTypes.STRING,
    status: DataTypes.STRING,
  });
  return Order;
};
