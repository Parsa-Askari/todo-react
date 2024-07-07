import React from 'react'
import ReactDOM from 'react-dom/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars ,faPlus,faTimes , faFloppyDisk,faCaretSquareDown, faTvAlt} from '@fortawesome/free-solid-svg-icons';
import { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { taskIdHook } from './hooks/hooks';
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
function Modal()
{
    const [showSelect,SetShowSelect]=useState("hidden")
    const [selected,SetSelected]=useState("")
    const [taskId,SetTaskID]=taskIdHook()
    const [taskName,SetTaskName]=useState("")
    const [startDate,SetStartDate]=useState("")
    const [EndtDate,SetEndDate]=useState("")
    const [selectedValue,SetSelectedValue]=useState("")
    const [decValue,SetDescValue]=useState("")
    
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
        console.log(classname)
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
                "taskName":taskName,
                "startDate":startDate,
                "endtDate":EndtDate,
                "selectedValue":selectedValue,
                "decValue":decValue
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
                            placeholder='set a title for your task'>
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
                        <textarea className='description' placeholder='describe your task'/>
                    </div>
                </div>
                
            </div>
            
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
function DashboardBody()
{
    
}
function Dashboard(){
    const val=localStorage.getItem("key")
    return(
        <div className='dash'>
            <DashboardHeader />
            {/* <DashboardBody /> */}
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
            </Routes>
        </Router>
    )
}