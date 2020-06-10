import React from "react"
import CompileRouter from "../compileRouter"
function Page2(props) {
    console.log(props)
    return (
        <div>
            <h1>page2</h1>
            <CompileRouter {...props} />
        </div>
    )
}
export default Page2