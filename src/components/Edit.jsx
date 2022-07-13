import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useParams ,useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const Edit = () => {

    let history = useHistory();

    const {id} = useParams();

    let {data : task , pending} = useFetch("http://localhost:8000/tasks/" + id);


    // let uName = useRef("");
    // let uTaskName = useRef("");
    // let uTaskDetail = useRef("");
    // let uStartDate = useRef("");
    // let uEndDate = useRef("");
    
    let [userName , setuName] = useState("");
    let [taskName , setTaskName] = useState("");
    let [taskDetail , setTaskDetail] = useState("");
    let [StartDate , setstartDate] = useState("");
    let [EndDate , setendDate] = useState("");

   

    const handleEdit = (e)=>{
        e.preventDefault();

    }
        

        let currentDate = new Date();
        let startDate = new Date(StartDate.current.value);
        let endDate = new Date(EndDate.current.value);
        let status = "";

        if(currentDate < startDate)
        {
            status = "Pending";
        }
        else if(currentDate>=startDate && currentDate<=endDate)
        {
            status = "Ongoing"
        }
        else
        {
            status = "Completed";
        }

       let newTask = {userName , taskName, taskDetail, StartDate, EndDate }


        fetch("http://localhost:8000/tasks/"+id , 
        {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newTask)
        }
        ).then(()=>{
            alert("task edited successfully");
            history.push("/tasklist");
    })
    


    return ( 
    <div className="edit-task">

        <h1>Edit a Task</h1>

        {task && <div>
            <form onSubmit={handleEdit}>

            <label>User Name</label> <input type="text" defaultValue={task.userName} onChange = {(e)=>{setuName(e.target.value)}} />

            <label>Task Name</label> <input type="text" defaultValue={task.taskName} onChange = {(e)=>{setTask(e.target.value)}} />

            <label>Task Detail</label> <textarea defaultValue={task.taskDetail} onChange = {(e)=>{setTaskDetail(e.target.value)}}/>

            <label>Start Date</label> <input type="date" defaultValue={task.startDate} onChange = {(e)=>{setstartDate(e.target.value)}}/>

            <label>End Date</label> <input type="date" defaultValue={task.endDate} onChange = {(e)=>{setendDate(e.target.value)}}/>

            <input type="submit" value="Edit Task" />

            </form>

        <Link to="/tasklist">
            <button className="btn">Click to view all task list</button>
        </Link>
        </div>}
        
    </div> 
    );
}   
export default Edit;