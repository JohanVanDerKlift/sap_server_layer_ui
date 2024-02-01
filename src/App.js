import './App.css';
import {Routes, Route} from "react-router-dom";
import Queries from "./pages/queries/Queries";
import Query from "./pages/query/Query";
import NavBar from "./components/NavBar";
import NewQuery from "./pages/newQuery/NewQuery";

function App() {
    return (
        <div className="App">
            <div className="max-w-screen-xl m-auto flex flex-col">
                <NavBar />
                <Routes>
                    <Route path='/' element={<Queries />}/>
                    <Route path='/query/:queryId' element={<Query />}/>
                    <Route path='/query/new' element={<NewQuery />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
