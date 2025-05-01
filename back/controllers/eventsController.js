const ApiError = require('../error/ApiError')
const {Events, Groups, User} = require('../models/models')
const {Op} = require('sequelize')

class EventsController {
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const event = await Events.findByPk(id, {
                include: [
                    {
                        model: Groups,
                        attributes: ['id', 'group_code', 'speciality'],
                        through: {attributes: []},
                        required:false
                    },
                    {
                        model: User,
                        attributes: ['id', 'login'],
                        required:false
                    }
                ]
            })

            if (!event) {
                return next(ApiError.notFound('Мероприятие не найдено'))
            }

            return res.json(event)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Получение всех мероприятий с фильтрацией
    async getAll(req, res, next) {
        try {
            let {description, dateFrom, dateTo, groupId, limit, page} = req.query
            page = page || 1
            limit = limit || 8
            let offset = page * limit - limit

            const where = {}
            if (description) where.description = {[Op.iLike]: `%${description}%`}
            
            // Фильтрация по дате
            if (dateFrom || dateTo) {
                where.day_of_week = {}
                if (dateFrom) where.day_of_week[Op.gte] = new Date(dateFrom)
                if (dateTo) where.day_of_week[Op.lte] = new Date(dateTo)
            }

            // Фильтрация по группе
            let include = []
            if (groupId) {
                include.push({
                    model: Groups,
                    where: {id: groupId},
                    attributes: [],
                    through: {attributes: []}
                })
            }

            const events = await Events.findAndCountAll({
                where,
                limit,
                offset,
                include,
                order: [['day_of_week', 'ASC']],
                distinct: true
            })

            return res.json({
                events: events.rows,
                total: events.count,
                pages: Math.ceil(events.count / limit),
                currentPage: page
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Создание нового мероприятия
    async addEvent(req, res, next) {
        try {
            const {name,image, description, day_of_week} = req.body
            if (!description || !day_of_week) {
                return next(ApiError.badRequest('Не указаны description или day_of_week'))
            }

            // Создание мероприятия
            const event = await Events.create({
                image: image || null,
                name,
                description,
                day_of_week,
            })

            return res.status(201).json({
                message: 'Мероприятие успешно создано',
                event
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
    async updateEvent(req, res, next) {
        try {
            const {id} = req.params
            const {name,image, description, day_of_week} = req.body

            const event = await Events.findByPk(id)
            if (!event) {
                return next(ApiError.notFound('Мероприятие не найдено'))
            }

            await event.update({
                image: image || event.image,
                description: description || event.description,
                day_of_week: day_of_week || event.day_of_week,
                name,

            })

            return res.json({
                message: 'Мероприятие успешно обновлено',
                event
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Удаление мероприятия
    async deleteEvent(req, res, next) {
        try {
            const {id} = req.params

            const event = await Events.findByPk(id)
            if (!event) {
                return next(ApiError.notFound('Мероприятие не найдено'))
            }

            await event.destroy()
            return res.json({message: 'Мероприятие успешно удалено'})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Получение мероприятий для конкретной группы
    async getEventsForGroup(req, res, next) {
        try {
            const {groupId} = req.params
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit

            const group = await Groups.findByPk(groupId)
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'))
            }

            const events = await group.getEvents({
                limit,
                offset,
                order: [['day_of_week', 'ASC']]
            })

            return res.json(events)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new EventsController()