import React from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'

import { classNamesPrefix } from 'utils/react'

import state from 'state'

import { useCallback } from 'hooks'

import { IconTruck, IconLocation, IconSpeed, IconTemperature } from 'components/shared/icons'

import './vehicle.scss'

const block = 'driver'
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
    id,
    name,
    vehicle,
    location,
    online,
    speed,
    temperature,
    plate,
    updatedAt,
}: DriverProps) => {


    // @action.bound
    const onConnectClick = async () => {
        const { setOnline } = state.vehicles
        try {
            await setOnline(id)
        } catch (error) {
          // TODO: handle error
        }
    }

    // @action.bound
    const onDisconnectClick = async () => {
        const { setOffline } = state.vehicles
        try {
            await setOffline(id)
        } catch (error) {
          // TODO: handle error
        }
    }

    const formattedDate = moment(updatedAt).format('DD/MM/YYYY-HH:mm:ss')
    
    return (
        <div className={block}>

            { /* Info (name, vehicle and update time */ }
            <div className={cx('__group', '__vehicle', {
                'no-mobile': !name,
            })}
            >
                <IconTruck className={cx('__icon', '__vehicle-icon')} />
                <div className={cx('__column', '__vehicle-info')}>
                    <div className={cx('__vehicle-name')}>
                        {name}
                    </div>
                    <div className={cx('__vehicle-description')}>
                        {vehicle} ({plate})
                    </div>
                    <div className={cx('__vehicle-update')}>
                        {formattedDate}
                    </div>
                </div>
            </div>

            { /* Speed */ }
            <div className={cx('__group', '__speed', { '__speed--hidden': !speed })}>
                <IconSpeed className={cx('__icon')} />
                <div className={cx('__column')}>
                    <div className={cx('__speed-theme')}>
                        {speed} KM/H
                    </div>
                </div>
            </div>

            { /* Temperature */ }
            <div className={cx('__group', '__temperature', { '__temperature--hidden': !temperature })}>
                <IconTemperature className={cx('__icon')} />
                <div className={cx('__column')}>
                    <div className={cx('__temperature-theme')}>
                        {temperature} °C
                    </div>
                </div>
            </div>

            { /* Location */ }
            <div className={cx('__group', '__location', { '__location--hidden': !location })}>
                <IconLocation className={cx('__icon', '__location-icon')} />
                <div className={cx('__column', '__location-info')}>
                    <div className={cx('__location-theme')}>
                        {parseFloat(location[0].toFixed(3))}
                        {', '}
                        {parseFloat(location[1].toFixed(3))}
                    </div>
                </div>
            </div>

            { /* Buttons ([Online|Offline]) */ }
            <div className={cx('__group', '__buttons')}>
                <button
                    type="button"
                    className={cx('__button', { '__button--hidden': !online })}
                    onClick={onDisconnectClick}
                >
                    Déconnecter
                </button>
                <button
                    type="button"
                    className={cx('__button', { '__button--hidden': online })}
                    onClick={onConnectClick}
                >
                    Connecter
                </button>
            </div>

        </div>
    )
})

export default Vehicle
