// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer";
import About from "./components/About";

function App() {

    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([

        // For testing purposes
        // {
        //     id: 1,
        //     text: "present",
        //     day: "christmas",
        //     reminder: true,
        // },
        // {
        //     id: 2,
        //     text: "shopping",
        //     day: "thanksgiving",
        //     reminder: true,
        // },
        // {
        //     id: 3,
        //     text: "candy",
        //     day: "halloween",
        //     reminder: false,
        // },

    ])

    // Fetch tasks
    const fetchTasks = async () => {
        const res = await fetch("http://mytodoreminder.com/task")
        const data = await res.json()
        return data
    }

    // Fetch a task
    const fetchTask = async (id) => {
        const res = await fetch(`http://mytodoreminder.com/task/${id}`)
        const data = await res.json()
        return data
    }

    // Side effect
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    // Add tasks
    const addTask = async (task) => {
        const res =await fetch("http://mytodoreminder.com/task/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        })

        const data = await res.json()
        setTasks([...tasks, data]);

        // const id = Math.floor(Math.random() * 10000) + 1;
        // const newTask = {id, ...task};
        // setTasks([...tasks, newTask]);
    }

    // Delete task, filter does remove the specific item
    const deleteTask = async (id) => {
        await fetch(`http://mytodoreminder.com/task/${id}`, {method: "DELETE"})
        setTasks(tasks.filter((task) => task.id !== id));
    }

    // Toggle the reminder
    const toggleReminder = async (id) => {
        const taskToggle = await fetchTask(id)
        const updateTask = {...taskToggle, reminder: !taskToggle.reminder}

        // Temp: http://localhost:5000/task/
        const res = await fetch(`http://mytodoreminder.com/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateTask)
        })

        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task));
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
                <Route path={"/"} exact render={(props) => (
                    <>
                        {showAddTask && <AddTask onAdd={addTask}/>}
                        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                            : "No Reminders! Let's get started."}
                    </>
                )}/>
                <Route path={"/about"} component={About}/>
                <Footer/>
            </div>
        </Router>
    );
}

// if using class
// class App extends React.Component {
//     render() {
//         return <h1>Hello World lol!</h1>
//     }
// }

export default App;
