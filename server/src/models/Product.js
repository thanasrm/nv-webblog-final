module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    pictures: DataTypes.STRING,
    category: DataTypes.STRING,
    status: DataTypes.STRING,
  });
  return Product;
};
