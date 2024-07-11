import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Add} from "./services/Add";


function App() {

    return (

        <Router>

            <Routes>

                <Route path="/" element={ <Add/> } />

            </Routes>

        </Router>

    )

}

export default App;
