import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { fetchSchedule } from "../http/scheduleAPI"
import { Context } from ".."
import { toJS } from 'mobx'

const Schedule = observer(() => {
    const { schedule, user } = useContext(Context)

    useEffect(() => {
        const groupId = schedule.selectedGroupId || user.user?.group?.id
        if (groupId) {
            fetchSchedule(groupId).then(data => {
                schedule.setSchedule(data.schedules)
            })
        }
    }, [schedule.selectedGroupId, user.user?.group?.id])

    const dayOrder = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница']
    const schedulesArray = toJS(schedule.schedules)

    const groupedByDay = schedulesArray.reduce((acc, item) => {
        if (!acc[item.day]) acc[item.day] = []
        acc[item.day].push(item)
        return acc
    }, {})

    return (
        <div className='schedule_centered'>
            <h3 style={{ textAlign: 'center', marginBottom: '20px',marginTop:'3%' }}>
                {schedule.selectedGroupId 
                    ? `Расписание вашей группы ` 
                    : `Расписание вашей группы ${user.user?.group?.group_code || ''}`
                }
            </h3>
            {dayOrder
                .filter(day => groupedByDay[day])
                .map(day => (
                    <div key={day} className="schedules">
                        <h3 style={{ color: '#484848', borderBottom: '1px solid #484848', marginBottom: '1%', textAlign: 'center' }}>
                            {`._{ ${day} }_.`}
                        </h3>
                        {groupedByDay[day].map(item => (
                            <div key={item.id}>
                                <ul>
                                    <li><h4>{item.lesson}</h4></li>
                                    <li style={{ borderBottom: '1px solid #484848' }}>
                                        {item.timetable}
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
})

export default Schedule