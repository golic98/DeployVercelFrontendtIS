import { createContext, useContext, useState } from "react";
import { createNewSchedule, createVisit, getAllSchedule, getVisits } from "../api/vigilant.js";
import {
    createTaskRequest,
    getTaskRequest,
    getTaskHomeRequest,
    deleteTaskRequest,
    getTaskAdminRequest,
    getOneTaskRequest,
    updateTaskRequest,
    createTaskRequest2,
    getTaskRequest2,
    getTaskHomeRequest2,
    deleteTaskRequest2,
    getTaskAdminRequest2,
    getOneTaskRequest2,
    updateTaskRequest2
} from "../api/task.js";

const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useStack debe ser usado en el provider");
    }
    return context;
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);
    const [tasks2, setTasks2] = useState([]);
    const [tasksHome, setTaskHome] = useState([]);
    const [tasksHome2, setTaskHome2] = useState([]);
    const [tasksAdmin, setTaskAdmin] = useState([]);
    const [tasksAdmin2, setTaskAdmin2] = useState([]);
    const [addObject] = useState([]);
    const [addVisit, setAddVisit] = useState([]);
    const [setSchedules] = useState([]);

    const getTaskAdmin = async () => {
        try {
            const res = await getTaskAdminRequest();
            setTaskAdmin(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTaskAdmin2 = async () => {
        try {
            const res = await getTaskAdminRequest2();
            setTaskAdmin2(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTaskHome = async () => {
        try {
            const res = await getTaskHomeRequest();
            setTaskHome(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTaskHome2 = async () => {
        try {
            const res = await getTaskHomeRequest2();
            setTaskHome2(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTasks = async () => {
        try {
            const res = await getTaskRequest();
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTasks2 = async () => {
        try {
            const res = await getTaskRequest2();
            setTasks2(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            setTaskAdmin(prev => [...prev, res.data]);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const createTask2 = async (task) => {
        try {
            const res = await createTaskRequest2(task);
            setTaskAdmin2(prev => [...prev, res.data]);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask2 = async (id) => {
        try {
            const res = await deleteTaskRequest2(id);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const oneTask = async (id) => {
        try {
            const res = await getOneTaskRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const oneTask2 = async (id) => {
        try {
            const res = await getOneTaskRequest2(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task);
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask2 = async (id, task) => {
        try {
            await updateTaskRequest2(id, task);
        } catch (error) {
            console.error(error);
        }
    };

    const createScheduleVigilant = async (object) => {
        try {
            const res = await createNewSchedule(object);
        } catch (error) {
            console.log(error);
        }
    }

    const createVisitVigilant = async (visit) => {
        try {
            const res = await createVisit(visit);
        } catch (error) {
            console.log(error);
        }
    }

    const getSchedules = async () => {
        try {
            const res = await getAllSchedule();
            setSchedules(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getVisitVigilant = async () => {
        try {
            const res = await getVisits();
            setAddVisit(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                tasks2,
                createTask,
                createTask2,
                getTasks,
                getTasks2,
                getTaskHome,
                getTaskHome2,
                tasksHome,
                tasksHome2,
                deleteTask,
                deleteTask2,
                tasksAdmin,
                tasksAdmin2,
                getTaskAdmin,
                getTaskAdmin2,
                oneTask,
                oneTask2,
                updateTask,
                updateTask2,
                addObject,
                addVisit,
                createScheduleVigilant,
                createVisitVigilant,
                getVisitVigilant,
                getSchedules
            }}>
            {children}
        </TaskContext.Provider>
    );
}