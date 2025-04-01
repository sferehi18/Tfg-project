import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español
import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalTemplate from "../components/ModalTemplate";
import CreationContext from "../context/ModalsMenusContext";
import { useEvents } from "../hooks/UseResources";

const localizer = momentLocalizer(moment);

function MyCalendar() {

  const { openModal } = useContext(CreationContext);
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null); // Guarda la fecha seleccionada
  const {handleAddEvent,getEvents} = useEvents();
  const modalId = "EventMenu";
  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end }); // Guarda el slot seleccionado
    openModal(modalId);
  };
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
 
  const newEvent = (event) => {
    if (event.title) {
      
     

      handleAddEvent({title: event.title,
        start: selectedSlot.start,
        end: selectedSlot.end});
    }
  };

  const messages = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    showMore: (total) => `+ Ver más (${total})`,
  };

  return (
    <div className="contentContainer rounded-4">
      <h2 className="p-2">Calendario</h2>
      <Calendar
    
        localizer={localizer}
        events={data}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        style={{ height: 500 }}
        messages={messages}
      />

      {
        <ModalTemplate
          title={"Añadir Evento"}
          fields={["title"]}
          actionButtonStyle={"primary"}
          actionText={"Añadir"}
          action={newEvent}
          modalOptionId={modalId}
        ></ModalTemplate>
      }
    </div>
  );
}

export default MyCalendar;
