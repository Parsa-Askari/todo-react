import React from 'react'
import ReactDOM from 'react-dom/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars ,faPlus,faTimes , faFloppyDisk,faCaretSquareDown} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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

    function handler(event){
        const classname=event.target.closest("div").className
        console.log(classname)
        if(classname=="select-importance")
        {
            if(showSelect=="hidden") SetShowSelect("visible");
            else SetShowSelect("hidden");
        }
    }
    
    return(
        <div className='add-form' onMouseDown={handler}>
            <div className='form-content'>
                <div className='form-header'>
                    <div className='btn'>
                        <FontAwesomeIcon className='close-btn' icon={faTimes} />
                    </div>
                    <div className='btn'>
                        <FontAwesomeIcon className='save-btn' icon={faFloppyDisk} />
                    </div>
                    
                </div>
                <div className='form-body'>
                    <div className='task-name'>
                        <input 
                            type='text' 
                            className='form-input task-name' 
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
                                <FontAwesomeIcon icon={faCaretSquareDown} />
                            </div>
                        </div>
                        
                        <div className={`options ${showSelect}`} >
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
                </div>
                
            </div>
            
        </div>
    )
}
export default function App()
{
    return (
        <Router>
            <Routes>
                <Route path='/' element={<InitialState />}/>
                <Route path='/dashboard' />
                <Route path="/modal" element={<Modal />}/>
            </Routes>
        </Router>
    )
}