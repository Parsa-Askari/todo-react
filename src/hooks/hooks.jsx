import { useState } from "react"
function taskIdHook(){
    const [taskId,SetTaskID]=useState(0)
    return ([taskId,SetTaskID])
}

export {taskIdHook}