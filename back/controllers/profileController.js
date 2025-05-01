const ApiError = require('../error/ApiError')
const {Profile, User, Groups} = require('../models/models')

class ProfileController {

    async addImage(req, res, next) {
        try {
            const {image, PC_PASSWORD} = req.body;
            const userId = req.user.id; 
    
            if (!image && !PC_PASSWORD) {
                return next(ApiError.badRequest('Необходимо указать image или PC_PASSWORD'));
            }
    
            if (PC_PASSWORD && (PC_PASSWORD.length < 6 || PC_PASSWORD.length > 15)) {
                return next(ApiError.badRequest('Пароль должен быть от 6 до 15 символов'));
            }
    
            const profile = await Profile.findOne({where: {userId}});
            if (!profile) {
                return next(ApiError.notFound('Профиль не найден'));
            }
    
            await profile.update({
                image: image || profile.image,
                PC_PASSWORD: PC_PASSWORD || profile.PC_PASSWORD
            });
    
            return res.json({
                message: 'Профиль успешно обновлен',
                profile: {
                    id: profile.id,
                    image: profile.image,
                    PC_PASSWORD: profile.PC_PASSWORD,
                    userId: profile.userId
                }
            });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    async getProfile(req, res, next) {
        try {
            const {id} = req.params

            const profile = await Profile.findOne({
                where: {userId: id},
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

            if (!profile) {
                return next(ApiError.notFound('Профиль не найден'))
            }

            return res.json(profile)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
    async addGroup(req, res, next) {
        try {
            const { groupId } = req.body; 
            const userId = req.user.id; 
    
            const user = await User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
    
            const group = await Groups.findByPk(groupId);
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'));
            }
    
            const existingProfile = await Profile.findOne({ where: { userId } });
            if (existingProfile && existingProfile.groupId === groupId) {
                return next(ApiError.badRequest('Пользователь уже в этой группе'));
            }
    
            if (existingProfile) {
                await existingProfile.update({ groupId });
            } else {
                await Profile.create({ userId, groupId });
            }
            await group.addUser(user); 

            return res.json({ message: 'Пользователь успешно добавлен в группу' });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async removeGroup(req, res, next) {
        try {
            const {userId} = req.params

            const profile = await Profile.findOne({where: {userId}})
            if (!profile) {
                return next(ApiError.notFound('Профиль не найден'))
            }

            if (!profile.groupId) {
                return next(ApiError.badRequest('Пользователь не состоит в группе'))
            }

            await profile.update({groupId: null})

            return res.json({message: 'Пользователь успешно удален из группы'})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ProfileController()