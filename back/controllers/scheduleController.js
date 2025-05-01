const ApiError = require('../error/ApiError')
const {Schedule, Groups} = require('../models/models')

class ScheduleController {
    // Получение одного расписания по ID
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

    // Получение всех расписаний с фильтрацией и пагинацией
    async getAll(req, res, next) {
        try {
            let {day, lesson, timetable, groupId, limit, page} = req.query
            page = page || 1
            limit = limit || 10
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

    // Создание нового расписания
    async addSchedule(req, res, next) {
        try {
            const {day, lesson, timetable, groupId} = req.body
            
            if (!day || !lesson || !timetable || !groupId) {
                return next(ApiError.badRequest('Не все обязательные поля заполнены'))
            }
            
            // Проверка существования группы
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

    // Удаление расписания
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

    // Обновление расписания
    async updateSchedule(req, res, next) {
        try {
            const {id} = req.params
            const {day, lesson, timetable, groupId} = req.body
            
            const schedule = await Schedule.findByPk(id)
            if (!schedule) {
                return next(ApiError.notFound('Расписание не найдено'))
            }
            
            // Проверка существования группы, если она меняется
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
}

module.exports = new ScheduleController()