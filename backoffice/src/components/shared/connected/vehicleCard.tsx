import React from 'react'
import { observer } from 'mobx-react'

import { classNamesPrefix } from 'utils/react'

import './vehicleCard.scss'

const block = 'vehicle-card'
const cx = classNamesPrefix(block)

type DriverProps = {
    id: string,
    name: string,
    vehicle: string,
    location: number[],
    online: boolean,
    speed: number,
    temperature: number,
    plate: string,
    updatedAt: string,
}

const Vehicle = observer(({ 
    name,
    vehicle,
    online,
    speed,
    temperature,
    plate,
}: DriverProps) => {

    
    return (
        <div className={[block, cx({ '--online': online })].join(' ')}>
            <div className={cx('__vehicle-name')}>
                {name}
            </div>
            <div className={cx('__vehicle-description')}>
                {vehicle} ({plate})
            </div>
                    
            <div>{speed} KM/H -  {temperature} °C</div>
        </div>
    )
})

export default Vehicle
