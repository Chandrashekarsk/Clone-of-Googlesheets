import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";

const Addtask = () => {

        let uName=useRef("");
        let uTaskName=useRef("");
        let uTaskDetail=useRef("");
        let uStartDate=useRef("");
        let uEndDate=useRef("");
        let history =useHistory();

        const handleSubmit = (e) =>{
            e.preventDefault();

            let currentDate = new Date();
            let startDate = new Date(uStartDate.current.value);
            let endDate = new Date(uEndDate.current.value);
            let status = "";

            if(currentDate < startDate)
            {
                status = "yet to start";
            }
            else if (currentDate >= startDate && currentDate <= endDate )
            {
                status = "Onging :)";
            }
            else {
                status = "Completed :) ";
            }


            const newTask = 
            {
                userName : uName.current.value,
                taskName : uTaskName.current.value,
                taskDetail : uTaskDetail.current.value,
                startDate : uStartDate.current.value,
                endDate : uEndDate.current.value,
                status 

            }

            console.log(newTask)
        

            fetch("http://localhost:8000/tasks",
            {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(newTask)
            }
            ).then(()=>alert("task added successful"))
            history.push("/tasklist");

        }

    return ( 
        <div className="add-task">
            <h1>Add a Task</h1>

                <form onSubmit={handleSubmit}>

                <label>User name</label> <input type="text" ref={uName} />
                <label>Task Name</label> <input type="text" ref={uTaskName}/>
                <label>Task Detail</label> <textarea ref={uTaskDetail}/>
                <label>Start date</label> <input type="date"  ref={uStartDate}/>
                <label>End date</label> <input type="date" ref={uEndDate}/>
                <input type="submit" value="add"/>

                </form>
                <Link to={"/tasklist"} ><button>Task List</button></Link>
        </div>
     );
}
 
export default Addtask;
