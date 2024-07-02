import { Route, Routes } from "react-router-dom";
import AddTrafficLightForm from "./pages/AddLight";
import TrafficLightDetail from "./pages/DetailTrafficLight";
import TrafficLightList from "./pages/TrafficLightList";
import "./App.css";
import NotFound from "./pages/NotFound/NotFound";
import TrafficLightEdit from "./pages/EditTrafficLight";
function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound heading="page not found" />} />
      <Route path="/add-traffic-light" element={<AddTrafficLightForm />} />
      <Route path="/" element={<TrafficLightList />} />
      <Route path="/traffic-light">
        <Route index element={<TrafficLightList />} />
        <Route path=":id" element={<TrafficLightDetail />} />
      </Route>
      <Route path="/traffic-light-edit/:id" element={<TrafficLightEdit />} />
    </Routes>
  );
}

export default App;
