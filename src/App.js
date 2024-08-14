import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Add} from "./services/Add";
import {Creds} from "./services/Creds";
import {Signup} from "./services/Signup";


function App() {

    return (

        <Router>

            <Routes>

                <Route path="/" element={ <Creds/> } />
                <Route path="/signup" element={ <Signup/> } />
                <Route path="/add" element={ <Add/> } />

            </Routes>

        </Router>

    )

}

export default App;
