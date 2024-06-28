import { Route, Routes } from "react-router-dom";
import AddTrafficLightForm from "./pages/AddLight/AddLight";
import TrafficLightDetail from "./pages/DetailTrafficLight/DetailTrafficLight";
import TrafficLightEdit from "./pages/EditTrafficLight/EditTrafficLight";
import TrafficLightList from "./pages/TrafficLightList/TrafficLightList";
import "./App.css";
import NotFound from "./pages/NotFound/NotFound";
function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/add-traffic-light" element={<AddTrafficLightForm />} />
      <Route path="/" element={<TrafficLightList />} />
      {/* <Route path="/traffic-light/:id" element={<TrafficLightDetail />} /> */}
      <Route path="/traffic-light">
        <Route index element={<TrafficLightList />} />
        <Route path=":id" element={<TrafficLightDetail />} />
        <Route path="edit/:id" element={<TrafficLightEdit />} />
      </Route>
      {/* <Route path="/traffic-light/:id" element={<TrafficLightDetail />} /> */}
      <Route path="/traffic-light-edit/:id/" element={<TrafficLightEdit />} />
    </Routes>
  );
}

export default App;
