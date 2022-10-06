module.exports = ( sequelize, DataTypes ) => {
    const Movie = sequelize.define('Movie', {
        name: DataTypes.STRING,
        time: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        description: DataTypes.TEXT,
        category: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Movie
}