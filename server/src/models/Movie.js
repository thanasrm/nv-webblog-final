module.exports = ( sequelize, DataTypes ) => {
    const Movie = sequelize.define('Movie', {
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Movie
}