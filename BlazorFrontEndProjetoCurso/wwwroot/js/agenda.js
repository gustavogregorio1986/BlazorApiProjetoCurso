function loadAgenda(eventsUrl) {
    var calendarEl = document.getElementById("eventAgendaId");
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        themeSystem: 'Yeti',
        contentHeight: "auto",
        events: eventsUrl,
        selectable: true,
        editable: true,
        locale: 'pt',
        buttonText: {
            prev: 'Anterior',
            next: 'Seguinte',
            month: 'Mês',
            today: 'Hoje',
            week: 'Semana',
            day: 'dia',
            list: 'Lista',
        },
        select: handleSelectEvent,
        eventClick: handleEventClick,
        eventChange: handleEventChange,
    });
    calendar.render();

    function handleSelectEvent() { }

    function handleEventClick() { }

    function handleEventChange() { }    
}