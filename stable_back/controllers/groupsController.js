const ApiError = require('../error/ApiError')
const {Groups, User, Profile} = require('../models/models')

class GroupController {
    // Получение одной группы по ID с информацией о студентах
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id)
            const group = await Groups.findByPk(id, {
                include: [{
                    model: User,
                    through: { attributes: [] },
                    include: [{ model: Profile, attributes: ['image'] }],
                    attributes: ['id', 'login', 'role'],
                    where: { role: 'Student' },
                    required:false
                }]
            });
    
            if (!group) {
                return next(ApiError.badRequest('Группа не найдена')); // или добавить notFound
                // return next(ApiError.notFound('Группа не найдена')); // если метод есть
            }
    
            return res.json(group);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    // Получение всех групп с фильтрацией и пагинацией
    async getAll(req, res, next) {
        try {
            let {group_code, speciality, limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit

            const where = {}
            if (group_code) where.group_code = group_code
            if (speciality) where.speciality = {[Op.iLike]: `%${speciality}%`}

            const groups = await Groups.findAndCountAll({
                where,
                limit,
                offset,
                order: [['group_code', 'ASC']],
                include: [{
                    model: User,
                    attributes: ['id'],
                    through: {attributes: []},
                    required: false
                }]
            })

            return res.json({
                groups: groups.rows,
                total: groups.count,
                pages: Math.ceil(groups.count / limit),
                currentPage: page
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Создание новой группы
    async addGroup(req, res, next) {
        try {
            const {group_code, speciality, image} = req.body

            // Валидация
            if (!group_code || !speciality) {
                return next(ApiError.badRequest('Не указаны group_code или speciality'))
            }

            if (typeof group_code !== 'number') {
                return next(ApiError.badRequest('group_code должен быть числом'))
            }

            // Проверка на существование группы
            const candidate = await Groups.findOne({where: {group_code}})
            if (candidate) {
                return next(ApiError.badRequest('Группа с таким кодом уже существует'))
            }

            const group = await Groups.create({
                group_code,
                speciality,
                image: image || null
            })

            return res.status(201).json({
                message: 'Группа успешно создана',
                group
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Обновление группы
    async updateGroup(req, res, next) {
        try {
            const {id} = req.params
            const {group_code, speciality, image} = req.body

            const group = await Groups.findByPk(id)
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'))
            }

            // Проверка на уникальность group_code
            if (group_code && group_code !== group.group_code) {
                const existingGroup = await Groups.findOne({where: {group_code}})
                if (existingGroup) {
                    return next(ApiError.badRequest('Группа с таким кодом уже существует'))
                }
            }

            await group.update({
                group_code: group_code || group.group_code,
                speciality: speciality || group.speciality,
                image: image || group.image
            })

            return res.json({
                message: 'Группа успешно обновлена',
                group
            })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Удаление группы
    async deleteGroup(req, res, next) {
        try {
            const {id} = req.params

            const group = await Groups.findByPk(id)
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'))
            }

            // Проверка наличия студентов в группе
            const usersCount = await User.count({
                include: [{
                    model: Groups,
                    where: {id}
                }]
            })

            if (usersCount > 0) {
                return next(ApiError.badRequest('Невозможно удалить группу с участниками'))
            }

            await group.destroy()
            return res.json({message: 'Группа успешно удалена'})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // Получение статистики по группе
    async getGroupStats(req, res, next) {
        try {
            const {id} = req.params

            const group = await Groups.findByPk(id, {
                include: [{
                    model: User,
                    attributes: ['id'],
                    through: {attributes: []}
                }]
            })

            if (!group) {
                return next(ApiError.notFound('Группа не найдена'))
            }

            const stats = {
                totalStudents: group.Users.length,
            }

            return res.json(stats)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new GroupController()