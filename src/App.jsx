import React from 'react'
import ReactDOM from 'react-dom/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars ,faPlusCircle} from '@fortawesome/free-solid-svg-icons';
function Header()
{
    return(
        <div className="header">
            <div className="menu">
                <button type="button" className='menu-button'>
                    <FontAwesomeIcon className='icons' icon={faBars} />
                </button>
            </div>
        </div>
    )
}

function Tasks()
{
    return(
        <div className='tasks'>
            these are tasks
        </div>
    )

}
function Footer()
{
    return(
        <div className='footer'>
            <div className="Add-item">
                <button type="button" className='add-button'>
                    <FontAwesomeIcon className='icons' icon={faPlusCircle} />
                </button>
            </div>
        </div>
    )
}
export default function App()
{
    return(
        <div className='container'>
            <Header />
            <Tasks />
            <Footer />
        </div>
        
    )
} 