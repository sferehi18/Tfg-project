import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español
import { useContext } from "react";
moment.locale("es"); // Ahora debería funcionar

import "react-big-calendar/lib/css/react-big-calendar.css";
import Eventmenu from "../components/EventMenu";

const localizer = momentLocalizer(moment);


function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar/ocultar el menú
  const [selectedSlot, setSelectedSlot] = useState(null); // Guarda la fecha seleccionada
   
  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end }); // Guarda el slot seleccionado
    setShowMenu(true); // Muestra el menú
    
  };

  const handleAddEvent = (title) => {
    if (title) {
      setEvents([...events, { title, start: selectedSlot.start, end: selectedSlot.end }]);
      setShowMenu(false); // Oculta el menú después de agregar
    }
  };

  return (
    <div className="w-100 p-4">
      <h2>Calendario</h2>
      <Calendar
        localizer={localizer}
        events={events}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        style={{ height: 500 }}
      />
      
      {/* Renderiza EventMenu si showMenu es true */}
      {showMenu && <Eventmenu onAddEvent={handleAddEvent} onClose={setShowMenu}/>}
    </div>
  );
}

export default MyCalendar;
