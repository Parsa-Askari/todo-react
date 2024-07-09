import { useState } from "react"
function taskIdHook(){
    const [taskId,SetTaskID]=useState(0)
    return ([taskId,SetTaskID])
}

function headerHook(){
    const [headerStatus,SetHeaderStatus]=useState({"done":0,"undone":0,"passed":0})
    return ([headerStatus,SetHeaderStatus])
}
export {taskIdHook}
export {headerHook}