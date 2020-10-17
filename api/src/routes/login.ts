import Logger from '@harmonyjs/logger'
import EncryptionService from 'services/encryption'

const logger = Logger({
    name: 'AccountLogin',
    configuration: {
        console: true,
    },
})

const LoginRoute = async (server : any, opts : any, next: () => void) => {
    server.route({
        method: 'POST',
        url: '/login',
        async handler(req: any, res: any) {
            /**
             * Note: usually, we should retrieve user from the db, searching by email
             * then compare encrypted password with provided one
             */
            try {
                if (req.conf.account.email !== req.body.login) {
                    res.statusCode = 401
                    res.send({
                        statusCode: 401,
                        error: 'Bad Request',
                        message: 'user_not_found',
                    })
                    return
                }
                const isSamePassword = EncryptionService.comparePassword({
                    password: req.body.password,
                    salt: req.conf.account.id,
                    encrypted: req.conf.account.password,
                })
                if (isSamePassword) {
                    const token = server.jwt.sign({
                        userId: req.conf.account.id,
                        name: req.conf.account.name,
                        isAdmin: false,
                    })
                    res.statusCode = 200
                    res.send({ token })
                } else {
                    res.statusCode = 401
                    res.send({
                        statusCode: 401,
                        error: 'Bad Request',
                        message: 'wrong_credentials',
                    })
                }
            } catch (error) {
                res.statusCode = 500
                res.send({
                    statusCode: 500,
                    error: 'Internal Server Error',
                })
            }
        },
    })
    next()
}

export default LoginRoute
