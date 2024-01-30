import './App.css';
import {Routes, Route} from "react-router-dom";
import Queries from "./pages/queries/Queries";
import Query from "./pages/query/Query";

function App() {
    return (
        <div className="App">
            <div className="content">
                <Routes>
                    <Route path='/' element={<Queries />}/>
                    <Route path='/query/:queryId' element={<Query />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
