import React from 'react';
import ReactDOM from 'react-dom';
import router from "./router"
// import CompileRouter from "./compileRouter"
import CompileRouter from "qf-router-config"
// import { BrowserRouter as Router } from 'react-router-dom';
// console.log(CompileRouter);
ReactDOM.render(
    <CompileRouter {...router} /> ,
    document.getElementById('root')
);
