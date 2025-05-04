import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


moment.updateLocale("en", {
  week: { dow: 1 },
});

const localizer = momentLocalizer(moment);

function TrainingCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);

  useEffect(() => {
    fetch(import.meta.env.VITE_TRAINING_API_URL + "/gettrainings")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((t: any) => {
          const start = new Date(t.date);
          const end = new Date(start.getTime() + t.duration * 60000);
          return {
            title: `${t.activity} - ${t.customer.firstname} ${t.customer.lastname}`,
            start,
            end,
          };
        });
        setEvents(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        views={["month", "week", "day"]}
        style={{ height: "100%" }}
        popup
      />
    </div>
  );
}

export default TrainingCalendar;
