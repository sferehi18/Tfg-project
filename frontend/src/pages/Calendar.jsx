import React, { useState } from "react";
import { Calendar, momentLocalizer , dayjsLocalizer} from "react-big-calendar";
import dayjs from "dayjs";
import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalTemplate from "../components/ModalTemplate";
import CreationContext from "../context/ModalsMenusContext";
import { useEvents } from "../hooks/UseResources";

import "dayjs/locale/es"; // Importa el idioma español para dayjs
import { useCrudOptions } from "../hooks/UseCrudOptions";
import ConfirmActionModal from "../components/ConfirmActionModal";
dayjs.locale("es"); // Establece el idioma español para dayjs
const localizer = dayjsLocalizer(dayjs); // Configura el localizador para usar dayjs
 // Establece el idioma español para moment.js
function MyCalendar() {
  

  const { openModal } = useContext(CreationContext);
  const [selectedOption,setSelectedOption] = useState({}); // Guarda la opción seleccionada
  const {event} = useCrudOptions();
  const [selectedSlot, setSelectedSlot] = useState(null); // Guarda la fecha seleccionada
  const {getEvents} = useEvents();
  const modalId = "EventMenu";
  const handleSelectSlot = ({ start, end }) => {
    console.log("Slot seleccionado:", start, end); // Muestra el slot seleccionado en la consola
    setSelectedSlot({ start, end }); // Guarda el slot seleccionado
    setSelectedOption(event.createOption);
    openModal(modalId);
     // Establece la opción seleccionada
  };

  const handleSelectEvent = (eventSelected) => {
    console.log("Evento seleccionado:", eventSelected);
    event.deleteOption.resourceId = eventSelected.id; // Muestra el evento seleccionado en la consola
    setSelectedOption(event.deleteOption); // Establece la opción seleccionada
    openModal(modalId);
  }


  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const events = await getEvents();
      return events.map(event => ({
        ...event,
        start: new Date(event.start), // <-- 🔥 convertir a Date
        end: new Date(event.end),
      }));
    },
  });
  
  const handleAddEvent = (newevent) => {
    if (selectedOption.fields) {
      
     

      selectedOption.action({
        title: newevent.title,
        start: selectedSlot.start,
        end: selectedSlot.end,
      });
      
  }
    setSelectedOption({}); // Cierra el modal después de crear el evento
};

  const messages = {
    allDay: "Todo el día",
    previous: "<",
    next: ">",
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
      popup
        localizer={localizer}
        events={data}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        startAccessor="start"
        endAccessor="end"
       step={15}
       onSelectEvent={handleSelectEvent}
        defaultView="week"
        views={['month', 'week', 'day', 'agenda']} 
        style={{ height: 500 }}
        messages={messages}
      />

      {   (selectedOption != null ) &&  selectedOption.fields != undefined ? (<ModalTemplate
          title={selectedOption.label}
          fields={selectedOption.fields}
          actionButtonStyle={"primary"}
          actionText={selectedOption.label}
          action={handleAddEvent}
          modalOptionId={modalId}
        ></ModalTemplate>):  <ConfirmActionModal
        title={selectedOption.label}
        message={selectedOption.message}
        confirmButtonType={selectedOption.actionButtonStyle} // Use the correct style
        confirmButtonText={selectedOption.label} // Use the correct text
        action={selectedOption.action}
        resourceId={selectedOption.resourceId} // Ensure it matches the state
        modalId={modalId} // Ensure it matches the state
        // resurceId={resourceId} // Asegúrate de que coincida con el estado
       
      />
       
      }
    </div>
  );
}

export default MyCalendar;
