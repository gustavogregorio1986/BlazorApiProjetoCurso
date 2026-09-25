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

    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    const btn = document.getElementById("btnSaveEvent");
    btn.addEventListener("click", saveEvent);
       
    function getFormattedDate(dateStr) {
        var result = "";
        if (dateStr.lengh > 16) {
            result = dateStr.substring(0, 16);
        } else {
            result = dateStr.substring(0, 10) + "T00:00"; 
        }

        return result
    }

    function handleSelectEvent(info) {
        document.getElementById("eventModalTitle").innerHTML = "Adicionar Evento"
        document.getElementById("eventModal_event_id").value = ""
        document.getElementById("eventModal_event_allday").value = false
        document.getElementById("eventModal_event_title").value = ""
        document.getElementById("eventModal_event_description").value = ""
        document.getElementById("eventModal_event_start_date").value = getFormattedDate(info.startStr)
        document.getElementById("eventModal_event_end_date").value = getFormattedDate(info.endStr)
        document.getElementById("btnDeleteEvent").style.visibility = "hidden"
        eventModal.show()
    }

    function handleEventClick(info) {

        info.jsEvent.preventDefault();

        document.getElementById("eventModalTitle").innerHTML = "Adicionar Evento"
        document.getElementById("eventModal_event_id").value = info.event.id
        document.getElementById("eventModal_event_allday").value = info.event.allDay
        document.getElementById("eventModal_event_title").value = info.event.title
        document.getElementById("eventModal_event_description").value = info.event.extendedProps.description
        document.getElementById("eventModal_event_start_date").value = getFormattedDate(info.event.startStr)
        document.getElementById("eventModal_event_end_date").value = getFormattedDate(info.event.endStr)
        document.getElementById("btnDeleteEvent").style.visibility = "visible"

        eventModal.show();
         

    }

    function handleEventChange() {
        calendar.refetchEvents();
    } 

    async function saveEvent() {
        var id = document.getElementById("eventModal_event_id").value;
        var allDay = document.getElementById("eventModal_event_allday").value;
        var title = document.getElementById("eventModal_event_title").value;
        var start = document.getElementById("eventModal_event_start_date").value;
        var end = document.getElementById("eventModal_event_end_date").value;
        var description = document.getElementById("eventModal_event_description").value;

        if (!end) end = null;

        try {
            var url = eventsUrl;
            var httpMethod = "POST";

            if (id && id.length > 0) {
                url = `${eventsUrl}/${id}`;
                httpMethod = "PUT";
            }

            console.log("URL:", url);
            console.log("Método:", httpMethod);
            console.log("Dados enviados:", { title, start, end, description, allDay });

            let response = await fetch(url, {
                method: httpMethod,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, start, end, description, allDay })
            });

            console.log("Resposta do servidor:", response);

            if (!response.ok) {
                eventModal.hide();
                alert("Erro ao salvar evento (Status: " + response.status + ")");
            } else {
                eventModal.hide();
            }

        } catch (errors) {
            console.error("Erro capturado no catch:", errors);
            alert("Erro no catch: " + errors);
        }
    }  
}