import NavBar from "./components/navabar.component";
import CitizenListMDG from "./pages/citizenList.muiDataGrid.page";
import {Routes, Route} from "react-router";
import CitizenListRT from "./pages/citizenList.ReactTable.page";
import Error404Page from "./pages/Error404.page";


function App() {
  return (
    <div className="App">
      <NavBar/>
      <div>
        <Routes>
          <Route exact path={'/'} element={<CitizenListMDG/>}/>
          <Route path={'/mui-table'} element={<CitizenListMDG/>}/>
          <Route path={'/react-table'} element={<CitizenListRT/>}/>
          <Route path={'*'} element={<Error404Page/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
