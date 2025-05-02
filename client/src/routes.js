
import AdminPage from "./pages/AdminPage"
import Auth from "./pages/Auth"
import HomePage from "./pages/HomePage"
import HomeWork from "./pages/Homework"
import Profile from "./pages/Profile"
import Schedule from "./pages/Schedule"
import Events from "./pages/Events"
import HomeWorkPage from "./pages/HomeworkPage"
import EventsPage from "./pages/EventsPage"

import { ADMIN_ROUTE, EVENTS_ROUTE, HOMEPAGE_ROUTE, HOMEWORK_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, SCHEDULE_ROUTE,HOMEWORKID_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path:ADMIN_ROUTE,
        Component:AdminPage
    },
    {
        path:PROFILE_ROUTE,
        Component:Profile
    },
    {
        path:HOMEWORK_ROUTE,
        Component:HomeWork
    },
    {
        path:HOMEWORKID_ROUTE + '/:id',
        Component:HomeWorkPage
    },
    {
        path:SCHEDULE_ROUTE ,
        Component:Schedule
    }
]
export const publicRoutes = [
    {
        path:HOMEPAGE_ROUTE,
        Component:HomePage
    },
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },
    {
        path:REGISTER_ROUTE,
        Component:Auth
    },
    {
        path:EVENTS_ROUTE,
        Component:Events
    },
    {
        path:EVENTS_ROUTE + '/:id',
        Component: EventsPage
    }
]