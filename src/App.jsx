import React from 'react'
import ReactDOM from 'react-dom/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faBars ,
    faPlus,faTimes ,
    faFloppyDisk,
    faCaretSquareDown,
    faTrash,
    faPencilSquare} from '@fortawesome/free-solid-svg-icons';
import { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { taskIdHook ,headerHook} from './hooks/hooks';
// import { btnContext , showContext} from './contexts/context';
// import Modal from 'react-bootstrap/Modal';
function AddButtonElement()
{
    return(
        <Link to={"/modal"}>
            <div className='add-task' >
                    <FontAwesomeIcon className='add-btn' icon={faPlus} />
            </div>
        </Link>
    )
}
function InitialState()
{

    return (
        <div className='init-state'>
            <AddButtonElement />
        </div>
    )
}
function BasicForm(props)
{
    const returnTo=props.returnTo
    const selected=props.selected
    const showSelect=props.showSelect
    const taskName=props.taskName
    const startDate=props.startDate
    const endtDate=props.EndtDate
    const descValue=props.descValue
    return(
        <div className='form-content'>
            <div className='form-header'>
                <Link to={returnTo}>
                    <div className='btn' id="close">
                            <FontAwesomeIcon className='close-btn' icon={faTimes} />
                    </div>
                </Link>
                <Link to="/dashboard" >
                    <div className='btn' id="save">
                        <FontAwesomeIcon className='save-btn' icon={faFloppyDisk} />
                    </div>
                </Link>
            </div>
            <div className='form-body'>
                <div className='task-name'>
                    <input 
                        type='text' 
                        className='form-input task-name'
                        name='title'
                        placeholder='set a title for your task'
                        value={taskName||""}>
                    </input>
                </div>
                <div className='task-date'>
                    <div className='start'>
                        <div>
                            from
                        </div>
                        <input 
                            type="date" 
                            name="start"
                            value={startDate||""}
                            >
                        </input>
                    </div>
                    <div className='end'>
                        <div>
                            To
                        </div>
                        <input 
                            type="date" 
                            name="end" 
                            value={endtDate||""}
                            >
                        </input>
                    </div>
                </div>
                <div className='importance'>
                    <div className='select-header'>
                        <label className='select-label'>priority</label>
                        <div className='select-importance' >
                            <div className='selected'>
                                {selected}
                            </div>
                            <FontAwesomeIcon icon={faCaretSquareDown} />
                        </div>
                    </div>
                    
                    <div className={`${showSelect} options`} >
                        <div className='importance-option importance-option-1'>
                            High
                        </div>
                        <div className='importance-option importance-option-2'>
                            Mediom
                        </div>
                        <div className='importance-option importance-option-3'>
                            Low
                        </div>
                    </div>
                </div>
                <div className='description-box'>
                    <textarea 
                            className='description' 
                            placeholder='describe your task'
                            value={descValue||""}
                            />
                </div>
            </div>
            
        </div>
    )
}
function Modal()
{
    const [showSelect,SetShowSelect]=useState("hidden")
    const [selected,SetSelected]=useState("")
    const [taskId,SetTaskID]=taskIdHook()
    const [taskName,SetTaskName]=useState("")
    const [startDate,SetStartDate]=useState("")
    const [EndtDate,SetEndDate]=useState("")
    const [selectedValue,SetSelectedValue]=useState("")
    const [descValue,SetDescValue]=useState("")
    
    const returnTo="/"

    useEffect(()=>{
        if(taskId==0 && localStorage.getItem("taskId")){
            SetTaskID(Number(localStorage.getItem("taskId")))
        }
        else{
            localStorage.setItem('taskId',taskId)
        } 
        
    },[taskId])

    function setInputs(event){
        const elem=event.target
        if(elem.name=="title"){
            SetTaskName(elem.value)
        }
        else if(elem.name=="start"){
            SetStartDate(elem.value)
        }
        else if(elem.name=="end"){
            SetEndDate(elem.value)
        }
        else if(elem.className=="description"){
            SetDescValue(elem.value)
        }
    }

    function handler(event){
        const classname=event.target.closest("div").className
        // console.log(classname)
        if(classname=="select-importance" || classname=="selected" )
        {
            if(showSelect=="hidden") SetShowSelect("visible");
            else SetShowSelect("hidden");
        }
        else if(String(classname).includes("importance-option"))
        {
            const txt =event.target.closest("div").innerHTML
            SetSelected(txt)
            SetSelectedValue(txt)
            SetShowSelect("hidden");
        }
        else if(event.target.closest("div").id=="save"){
            const task={
                "Id":taskId,
                "taskName":taskName,
                "startDate":startDate,
                "endtDate":EndtDate,
                "selectedValue":selectedValue,
                "descValue":descValue
            }
            localStorage.setItem(taskId,JSON.stringify(task))
            SetTaskID(taskId+1)
        }
        else{
            SetShowSelect("hidden");
        }
    }
    
    return(
        <div className='add-form' onMouseDown={handler} onChange={setInputs} >
            <BasicForm returnTo={returnTo} 
                        selected={selected} 
                        showSelect={showSelect} 
                        taskName={taskName}
                        startDate={startDate}
                        EndtDate={EndtDate}
                        descValue={descValue}/>
        </div>
    )
}
function DashboardHeader()
{
    
   
        
    return(
        <div className='dash-header'>
            <div className='dash-header__status'>
                <div className='item' id='un-done'>
                    <div className='content'></div>
                    <div className='label'>
                        un-done
                    </div>
                </div>
                <div className='item' id='done'>
                    <div className='content'></div>
                    <div className='label'>
                        done
                    </div>
                </div>
                <div className='item' id='passed'>
                    <div className='content'></div>
                    <div className='label'>
                        passed
                    </div>
                </div>
            </div>
            <div className='dash-header__bar'>
                <div className='bar__item' ></div>
            </div>
        </div>
    )
}
function DashboardTask(props)
{
    const [taskId]=useState(props.info.Id)
    const [taskName]=useState(props.info.taskName)
    const [start]=useState(props.info.startDate)
    const [end]=useState(props.info.endtDate)
    const [priority]=useState(props.info.selectedValue)
    const [desc]=useState(props.info.descValue)

    const [headerStatus,SetHeaderStatus]=useState({"done":0,"undone":0,"passed":0})
    // console.log(document.querySelector(".dash-body__item"))
    // console.log(props.info.priority)
    function handler(event)
    {
        const elem = event.target.closest(".dash-body__item")
        const btn=event.target.closest(".btn")
        console.log(btn)
        // console.log(elem)
        if(btn && btn.id=="delete")
        {
            // console.log(elem.id)
            elem.remove()
            
            localStorage.removeItem(elem.id)
        }
        else if(btn && btn.id=="edit")
        {
            console.log(elem.id)
            const EditForm={
                "id":taskId,
                "priority":elem.querySelector(".text").innerHTML,
                "taskName":elem.querySelector("#task-name").innerHTML,
                "start":elem.querySelector(".start").innerHTML,
                "end":elem.querySelector(".end").innerHTML,
                "desc":elem.querySelector("#desc-box").innerHTML,
            }
            
            localStorage.setItem("edit",JSON.stringify(EditForm))
        }
    }
    function change_header(event)
    {
        const checks=document.querySelectorAll(".check")
        for(let i=0;i<checks.length;++i)
        {
            let check=checks[i]
            if(check.checked)
            {
                SetHeaderStatus({...headerStatus,"done":headerStatus.done+1})
                SetHeaderStatus({...headerStatus,"undone":headerStatus.undone-1})
                
            }
            else
            {
                SetHeaderStatus({...headerStatus,"undone":headerStatus.undone+1})
                SetHeaderStatus({...headerStatus,"done":headerStatus.done-1})
                
            }
        }
        const doneElem=document.querySelector("#done").firstElementChild
        const undoneElem=document.querySelector("#un-done").firstElementChild
        const passedElem=document.querySelector("#passed").firstElementChild
        
    }
    
    return (
        
        <div className='dash-body__item' onClick={handler} onChange={change_header} id={taskId}>
            <div className='row' id='check-box'>
                <div className='content'>
                    <label htmlFor=".check">done</label>
                    
                    <input type="checkbox" className='check'/>
                </div>
                
            </div>
            <div className='row' id='control-box'>
                <div className='importance'>
                    <div className='text'>
                        {priority}
                    </div>
                    <div className='triangle'>

                    </div>
                </div>
                <div className='buttons'>
                    <div className='btn' id='delete'>
                        <FontAwesomeIcon icon={faTrash}/>
                    </div>
                    <Link to={"/edit"}>
                        <div className='btn' id='edit'>
                            <FontAwesomeIcon icon={faPencilSquare} />
                        </div>
                    </Link>
                    
                </div>
            </div>
            <div className='row' id='info-box'>
                <div className='field' id="task-name">
                    {taskName}
                </div>
                <div className='field' id='date'>
                    <span className='start'>{start}</span> 
                    to 
                    <span className='end'>{end}</span>
                </div>
            </div>
            <div className='row' id='desc-box'>
                {desc}
            </div>
        </div>
        
        
    )
}
function DashboardBody()
{
    const sto = { ...localStorage };
    let items=[]
    for (const [key, value] of Object.entries(sto)) {
        if(key!="taskId" && key!="edit")
        {
            items.push(<DashboardTask info={JSON.parse(value)} k={key} />)
        }
    }
    
    
    return(
        <div className='dash-body'>
            {...items}
        </div>
    )
}

function Dashboard(){
    const val=localStorage.getItem("key")
    
    return(
        <div className='dash'>
            <DashboardHeader />
            <DashboardBody />
            
        </div>
    )
}

function EditTask(){
    
    const init_task=JSON.parse(localStorage.getItem("edit"))
    const [taskId]=useState(init_task.id)

    const [showSelect,SetShowSelect]=useState("hidden")
    const [selected,SetSelected]=useState(init_task.priority)
    const [taskName,SetTaskName]=useState(init_task.taskName)
    const [startDate,SetStartDate]=useState(init_task.start)
    const [EndtDate,SetEndDate]=useState(init_task.end)
    const [descValue,SetDescValue]=useState(init_task.desc)
    const returnTo="/dashboard"
    // console.log(taskName)
    function setInputs(event){
        const elem=event.target
        if(elem.name=="title"){
            SetTaskName(elem.value)
        }
        else if(elem.name=="start"){
            SetStartDate(elem.value)
        }
        else if(elem.name=="end"){
            SetEndDate(elem.value)
        }
        else if(elem.className=="description"){
            SetDescValue(elem.value)
        }
    }

    function handler(event){
        const classname=event.target.closest("div").className
        if(classname=="select-importance" || classname=="selected" )
        {
            if(showSelect=="hidden") SetShowSelect("visible");
            else SetShowSelect("hidden");
        }
        else if(String(classname).includes("importance-option"))
        {
            const txt =event.target.closest("div").innerHTML
            SetSelected(txt)
            SetShowSelect("hidden");
        }
        else if(event.target.closest("div").id=="save"){
            const task={
                "Id":taskId,
                "taskName":taskName,
                "startDate":startDate,
                "endtDate":EndtDate,
                "selectedValue":selected,
                "descValue":descValue
            }
            localStorage.setItem(taskId,JSON.stringify(task))
        }
        else{
            SetShowSelect("hidden");
        }
    }

    return(
        <div className='add-form' onMouseDown={handler} onChange={setInputs} >
            <BasicForm returnTo={returnTo} 
                        selected={selected} 
                        showSelect={showSelect} 
                        taskName={taskName}
                        startDate={startDate}
                        EndtDate={EndtDate}
                        descValue={descValue}
                        />
        </div>
    )

}
export default function App()
{
    return (
        <Router>
            <Routes>
                <Route path='/' element={<InitialState />}/>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path="/modal" element={<Modal />}/>
                <Route path='/edit' element={<EditTask />}/>
            </Routes>
        </Router>
    )
}