const ApiError = require('../error/ApiError')
const {Homework, User, Groups} = require('../models/models')

class HomeWorkController {
    // Получение всех домашних заданий с фильтрацией и пагинацией
    async getAll(req, res, next) {
        try {
            let {lesson, description, userId, groupId, limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit

            const where = {}
            if (lesson) where.lesson = lesson
            if (description) where.description = description
            if (userId) where.userId = userId
            if (groupId) where.groupId = groupId

            const homeworks = await Homework.findAndCountAll({
                where,
                limit,
                offset,
                include: [
                    {
                        model: User,
                        attributes: ['id', 'login', 'role']
                    },
                    {
                        model: Groups,
                        attributes: ['id', 'group_code', 'speciality']
                    }
                ]
            })

            return res.json({
                homeworks: homeworks.rows,
                total: homeworks.count,
                pages: Math.ceil(homeworks.count / limit),
                currentPage: page
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const homework = await Homework.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'login', 'role']
                    },
                    {
                        model: Groups,
                        attributes: ['id', 'group_code', 'speciality']
                    }
                ]
            })

            if (!homework) {
                return next(ApiError.notFound('Домашнее задание не найдено'))
            }

            return res.json(homework)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Создание нового домашнего задания
    async addHomeWork(req, res, next) {
        try {
            const {lesson, description, userId, groupId} = req.body

            // Валидация обязательных полей
            if (!lesson || !description) {
                return next(ApiError.badRequest('Не указаны lesson или description'))
            }

            // Проверка существования пользователя и группы
            if (userId) {
                const user = await User.findByPk(userId)
                if (!user) {
                    return next(ApiError.badRequest('Пользователь не найден'))
                }
            }

            if (groupId) {
                const group = await Groups.findByPk(groupId)
                if (!group) {
                    return next(ApiError.badRequest('Группа не найдена'))
                }
            }

            const homework = await Homework.create({
                lesson,
                description,
                userId: userId || null,
                groupId: groupId || null
            })

            return res.status(201).json({
                message: 'Домашнее задание успешно создано',
                homework
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Обновление домашнего задания
    async updateHomeWork(req, res, next) {
        try {
            const {id} = req.params
            const {lesson, description, userId, groupId} = req.body

            const homework = await Homework.findByPk(id)
            if (!homework) {
                return next(ApiError.notFound('Домашнее задание не найдено'))
            }

            // Проверка существования пользователя и группы при обновлении
            if (userId) {
                const user = await User.findByPk(userId)
                if (!user) {
                    return next(ApiError.badRequest('Пользователь не найден'))
                }
            }

            if (groupId) {
                const group = await Groups.findByPk(groupId)
                if (!group) {
                    return next(ApiError.badRequest('Группа не найдена'))
                }
            }

            await homework.update({
                lesson: lesson || homework.lesson,
                description: description || homework.description,
                userId: userId || homework.userId,
                groupId: groupId || homework.groupId
            })

            return res.json({
                message: 'Домашнее задание успешно обновлено',
                homework
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Удаление домашнего задания
    async deleteHomeWork(req, res, next) {
        try {
            const {id} = req.params

            const homework = await Homework.findByPk(id)
            if (!homework) {
                return next(ApiError.notFound('Домашнее задание не найдено'))
            }

            await homework.destroy()
            return res.json({message: 'Домашнее задание успешно удалено'})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new HomeWorkController()