const ApiError = require('../error/ApiError')
const {Schedule, Groups} = require('../models/models')

class ScheduleController {
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const schedule = await Schedule.findByPk(id, {
                include: [{
                    model: Groups,
                    attributes: ['id', 'group_code', 'speciality']
                }]
            })
            
            if (!schedule) {
                return next(ApiError.notFound('Расписание не найдено'))
            }
            
            return res.json(schedule)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            let {day, lesson, timetable, groupId, limit, page} = req.query
            page = page || 1
            limit = limit || 50
            let offset = page * limit - limit
            
            const where = {}
            if (day) where.day = day
            if (lesson) where.lesson = lesson
            if (timetable) where.timetable = timetable
            if (groupId) where.groupId = groupId
            
            const schedules = await Schedule.findAndCountAll({
                where,
                limit,
                offset,
                include: [{
                    model: Groups,
                    attributes: ['id', 'group_code', 'speciality']
                }],
                order: [['day', 'ASC'], ['timetable', 'ASC']]
            })
            
            return res.json({
                schedules: schedules.rows,
                total: schedules.count,
                pages: Math.ceil(schedules.count / limit),
                currentPage: page
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async addSchedule(req, res, next) {
        try {
            const {day, lesson, timetable, groupId} = req.body
            
            if (!day || !lesson || !timetable || !groupId) {
                return next(ApiError.badRequest('Не все обязательные поля заполнены'))
            }
            const group = await Groups.findByPk(groupId)
            if (!group) {
                return next(ApiError.badRequest('Группа не найдена'))
            }
            
            const schedule = await Schedule.create({
                day,
                lesson,
                timetable,
                groupId
            })
            
            return res.status(201).json(schedule)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
    async deleteSchedule(req, res, next) {
        try {
            const {id} = req.params
            const schedule = await Schedule.findByPk(id)
            
            if (!schedule) {
                return next(ApiError.notFound('Расписание не найдено'))
            }
            
            await schedule.destroy()
            return res.json({message: 'Расписание успешно удалено'})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
    async updateSchedule(req, res, next) {
        try {
            const {id} = req.params
            const {day, lesson, timetable, groupId} = req.body
            const schedule = await Schedule.findByPk(id)
            if (!schedule) {
                return next(ApiError.notFound('Расписание не найдено'))
            }
            if (groupId) {
                const group = await Groups.findByPk(groupId)
                if (!group) {
                    return next(ApiError.badRequest('Группа не найдена'))
                }
            }
            
            await schedule.update({
                day: day || schedule.day,
                lesson: lesson || schedule.lesson,
                timetable: timetable || schedule.timetable,
                groupId: groupId || schedule.groupId
            })
            
            return res.json(schedule)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
    async deleteAllSchedule(req,res,next){
        try {
            await Schedule.destroy({
                where: {},
                truncate:true
            })
            return res.send('All fine')
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
    async deleteDaySchedule (req, res) {
        try {
            const { groupId, day } = req.query;
            const allowedDays = Schedule.rawAttributes.day.values;

            // Валидация
            const errors = [];
            
            if (!allowedDays.includes(day)) {
                errors.push(`Недопустимый день: ${day}. Допустимые значения: ${allowedDays.join(', ')}`);
            }

            if (!groupId || !day) {
                errors.push('Не указаны groupId или day');
            }

            const numericGroupId = parseInt(groupId, 10);
            if (isNaN(numericGroupId)) {
                errors.push('Неверный формат groupId');
            }

            if (errors.length > 0) {
                return next(ApiError.badRequest(errors.join('; ')));
            }

            // Удаление записей
            const deletedCount = await Schedule.destroy({
                where: {
                    groupId: numericGroupId,
                    day: day.trim()
                }
            });

            if (deletedCount === 0) {
                return next(ApiError.notFound('Расписание не найдено'));
            }

            return res.json({
                message: `Удалено ${deletedCount} записей`,
                deletedCount
            });

        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    
    async updateDaySchedule(req, res) {
        try {
            const { groupId, day, newDay } = req.body;

            // Получаем допустимые значения ENUM для поля day
            const allowedDays = Schedule.rawAttributes.day.values;
            
            // Валидация параметров
            const errors = [];
            
            if (!allowedDays.includes(newDay)) {
                errors.push(`Недопустимый день: ${newDay}. Допустимые значения: ${allowedDays.join(', ')}`);
            }

            if (!groupId || !day || !newDay) {
                errors.push('Не указаны все обязательные параметры');
            }

            const numericGroupId = parseInt(groupId, 10);
            if (isNaN(numericGroupId)) {
                errors.push('Неверный формат groupId');
            }

            if (errors.length > 0) {
                return next(ApiError.badRequest(errors.join('; ')));
            }

            // Проверка существования записей
            const existingRecords = await Schedule.count({
                where: {
                    groupId: numericGroupId,
                    day: day.trim()
                }
            });

            if (existingRecords === 0) {
                return next(ApiError.notFound('Расписание для обновления не найдено'));
            }

            // Обновление записей
            const [updatedCount] = await Schedule.update(
                { day: newDay.trim() },
                {
                    where: {
                        groupId: numericGroupId,
                        day: day.trim()
                    }
                }
            );

            return res.json({
                message: `Обновлено ${updatedCount} записей`,
                updatedCount
            });

        } catch (e) {
            return next(ApiError.internal(e.message));
        }
}
}
module.exports = new ScheduleController()