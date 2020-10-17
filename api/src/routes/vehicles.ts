import VehicleService from 'services/vehicle'

const PRIVATE_KEYS = [
    'polyline',
    'defaultSpeed',
    'defaultTemperature',
    'line',
    'distance',
]

const undefPrivateKeys = PRIVATE_KEYS.reduce((acc, key) => ({
    ...acc,
    [key]: undefined,
}), {})

const VehiclesRoute = async (server : any, opts : any, next: () => void) => {
    server.route({
        method: 'GET',
        url: '/vehicles',
        // TODO: make auth preHandler work
        // preHandler: server.auth([server.authenticateAccount]),
        async handler(req: any, res: any) {
            const { vehicles } = VehicleService
            res.statusCode = 200
            /**
             * Note: or we could use lodash.omit if we plan to use lodash
             * https://lodash.com/docs/#omit
             */
            res.send(vehicles.map((vehicle) => ({
                ...vehicle,
                ...undefPrivateKeys,
            })))
        },
    })

    server.route({
        method: 'POST',
        url: '/vehicles/online/:id',
        // TODO: make auth preHandler work
        // preHandler: server.auth([server.authenticateAccount]),
        async handler(req: any, res: any) {
            const updatedVehicle = VehicleService.updateVehicleById(req.params.id)
            
            if (!updatedVehicle) {
                res.statusCode = 500
                res.send({
                    statusCode: 500,
                    error: 'Internal Server Error',
                })
            } else {
                res.statusCode = 200
                res.send({})
            }
        },
    })
    next()
}

export default VehiclesRoute
