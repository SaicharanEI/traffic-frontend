import { Route, Routes } from "react-router-dom";
import AddTrafficLightForm from "./pages/addLight";
import TrafficLightDetail from "./pages/detailTrafficLight";
import TrafficLightList from "./pages/trafficLightList";
import NotFound from "./pages/notFound";
import TrafficLightEdit from "./pages/editTrafficLight";

function App() {
  return (
    <Routes>
      <Route path="/add-traffic-light" element={<AddTrafficLightForm />} />
      <Route path="/" element={<TrafficLightList />} />
      <Route path="/traffic-light">
        <Route index element={<TrafficLightList />} />
        <Route path=":id" element={<TrafficLightDetail />} />
      </Route>
      <Route path="/traffic-light-edit/:id" element={<TrafficLightEdit />} />
      <Route path="*" element={<NotFound heading="Page not found" />} />
    </Routes>
  );
}

export default App;
