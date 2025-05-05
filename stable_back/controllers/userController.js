const { User, Profile } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const { validationResult } = require('express-validator')
const sequelize = require('../config/database')

const generateJwt = (id, login, role) => {
    return jwt.sign(
        { id, login, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()))
            }

            const { login, password } = req.body
            
            const user = await User.findOne({
                where: { login },
                include: [{ model: Profile }]
            })
            
            if (!user) {
                return next(ApiError.unauthorized('Invalid credentials'))
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return next(ApiError.unauthorized('Invalid credentials'))
            }

            const token = generateJwt(user.id, user.login, user.role)
            
            return res.json({
                token,
                user: {
                    id: user.id,
                    login: user.login,
                    role: user.role,
                    profile: user.Profile
                }
            })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()))
            }

            const { login, password, role = 'Student' } = req.body
            const existingUser = await User.findOne({
                where: 
                    {login}
            })
            
            if (existingUser) {
                return next(ApiError.badRequest(`User with this user already exists`))
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const result = await sequelize.transaction(async (t) => {
                const user = await User.create({
                    login,
                    password: hashedPassword,
                    role
                }, { transaction: t })

                const profile = await Profile.create({
                    userId: user.id
                }, { transaction: t })

                await user.update({ profileId: profile.id }, { transaction: t })
                
                return { user, profile }
            })

            const token = generateJwt(result.user.id, result.user.login, result.user.role)
            
            return res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: result.user.id,
                    login: result.user.login,
                    role: result.user.role
                }
            })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let { page = 1, limit = 10 } = req.query
            limit = parseInt(limit)
            page = parseInt(page)
            const offset = (page - 1) * limit

            const users = await User.findAndCountAll({
                limit,
                offset,
                attributes: ['id', 'login', 'role'],
                include: [{
                    model: Profile,
                    attributes: ['id', 'image']
                }]
            })

            return res.json({
                users: users.rows,
                total: users.count,
                pages: Math.ceil(users.count / limit),
                currentPage: page
            })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async check(req, res, next) {
        try {

            const user = await User.findByPk(req.user.id, {
                attributes: ['id', 'login', 'role'],
                include: [{
                    model: Profile,
                    attributes: ['id', 'image']
                }]
            })

            if (!user) {
                return next(ApiError.unauthorized('User not found'))
            }

            const token = generateJwt(user.id, user.login, user.role)
            
            return res.json({
                token,
                user
            })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    async getGroup(req,res,next){
          try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Group }]
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
    }
    async doGroup(req,res,next){
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            
            user.groupId = req.body.groupId;
            await user.save();
            
            res.json(user);
          } catch (e) {
            res.status(500).json({ message: 'Server error' });
          }
    }
    async getProfile(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: ['id', 'login', 'role'],
                include: [{
                    model: Profile,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            })

            if (!user) {
                return next(ApiError.notFound('User not found'))
            }

            return res.json(user)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new UserController()