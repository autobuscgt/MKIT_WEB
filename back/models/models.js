const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING,
        validate: {
            max: 32,
            min: 6
        },
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            min: 6,
            max: 32
        }
    },
    role: {
        type: DataTypes.ENUM('Student', 'Teacher', 'Admin'),
        defaultValue: 'Student',
    }
});

const Groups = sequelize.define('groups', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    group_code: {
        type: DataTypes.INTEGER
    },
    speciality: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
});

const Schedule = sequelize.define('schedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    day: {
        type: DataTypes.ENUM(
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
        ),
        defaultValue:'Понедельник'
    },
    lesson: {
        type: DataTypes.STRING
    },
    timetable: {
        type: DataTypes.ENUM(
            '9:00-9:45 ._(5 минут перерыв)_. 9:50-10:35',
            '10:45-11:30 ._(5 минут перерыв)_. 11:35-12:20',
            '12:40-13:25 ._(5 минут перерыв)_. 13:30-14:15',
            '14:25-15:10 ._(5 минут перерыв)_. 15:15-16:00',
        ),
        defaultValue:'9:00-9:45'
    }
});

const Events = sequelize.define('events', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    day_of_week: {
        type: DataTypes.DATE
    }
});

const Homework = sequelize.define('homework', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lesson: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
});

// Fixed: Changed 'homework' to 'profile' (was a duplicate of homework model)
const Profile = sequelize.define('profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING
    },
    PC_PASSWORD: {
        type: DataTypes.STRING,
        validate: {
            min: 6,
            max: 15,
            isAlphanumeric: true
        }
    }
});

User.belongsToMany(Groups, { through: 'UserGroups' });
Groups.belongsToMany(User, { through: 'UserGroups' });

Groups.hasMany(Schedule);
Schedule.belongsTo(Groups);

User.hasMany(Homework);
Homework.belongsTo(User);

Groups.hasMany(Homework);
Homework.belongsTo(Groups);

User.hasOne(Profile);
Profile.belongsTo(User);

Groups.hasMany(Profile,{
    foreignKey:'groupId'
})
Profile.belongsTo(Groups,{
    foreignKey:'groupId'
})


Groups.hasMany(Events);
Events.belongsTo(Groups);

User.belongsToMany(Events, { through: 'UserEvents' });
Events.belongsToMany(User, { through: 'UserEvents' });

module.exports = {
    User,
    Profile,
    Schedule,
    Homework,
    Events,
    Groups
};