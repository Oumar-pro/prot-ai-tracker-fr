import { useState } from "react";

const WeekCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(15);
  
  const days = [
    { letter: "L", number: 10 },
    { letter: "M", number: 11 },
    { letter: "M", number: 12 },
    { letter: "J", number: 13 },
    { letter: "V", number: 14 },
    { letter: "S", number: 15 },
    { letter: "D", number: 16 }
  ];

  return (
    <div className="flex justify-center gap-2 mb-6">
      {days.map((day) => (
        <button
          key={day.number}
          onClick={() => setSelectedDate(day.number)}
          className={`flex flex-col items-center p-2 rounded-full transition-all ${
            selectedDate === day.number
              ? "bg-primary text-primary-foreground scale-105"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <span className="text-xs font-medium mb-1">{day.letter}</span>
          <span className="text-sm font-bold">{day.number}</span>
        </button>
      ))}
    </div>
  );
};

export default WeekCalendar;