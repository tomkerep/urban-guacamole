import { createSignal, onMount } from "solid-js";

const EditTaskModal = (props) => {
    const [taskName, setTaskName] = createSignal(props.taskName);
    const [status, setStatus] = createSignal(props.status === 1);
    const [kommentar, setKommentar] = createSignal(props.commentary);
    const [isOpen, setIsOpen] = createSignal(false);

    let baseUrl = 'http://localhost:3000/api/taskdb';

    onMount(async () => {
        // Fetch person data if needed
    });

    const updateTask = async () => {
        const payload = {
            taskId: props.taskId, 
            taskName: taskName(), 
            status: status() ? 1 : 0, 
            kommentar: kommentar()
        };
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        let data = await fetch(baseUrl, requestOptions);
        if (data.status === 200) {
            let json = await data.json(); 
            props.refetchFunction();
        } else {
            alert("Fehler: " + data.statusText);
        }
    }

    let saveTask = () => {
        setIsOpen(false);
        updateTask();
    }

    let updateTaskName = (e) => {
        setTaskName(e.target.value);
    }

    let updateStatus = (e) => {
        setStatus(e.target.checked);
    }

    let updateKommentar = (e) => {
        setKommentar(e.target.value);
    }

    return (
        <div>
            <button class="btn btn-sm" onClick={() => setIsOpen(true)}>Edit</button>
            <div class={isOpen() ? "modal modal-open" : "modal"}>
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Aufgabe bearbeiten</h3>
                    <p class="py-4">Bitte Daten ändern</p>
                    <form method="dialog">
                        <label class="input input-bordered flex items-center gap-2 my-2">
                            <input type="text" class="grow" placeholder="Aufgabenname..." value={taskName()} onInput={updateTaskName} />
                        </label>
                        <label class="input input-bordered flex items-center gap-2 my-2">
                            <input type="text" class="grow" placeholder="Kommentar..." value={kommentar()} onInput={updateKommentar} />
                        </label>
                        <label class="input input-bordered flex items-center gap-2 my-2">
                            <input type="checkbox" class="checkbox" checked={status()} onInput={updateStatus} /> Erledigt
                        </label>
                        
                    </form>
                    <div class="modal-action">
                        <button class="btn" onClick={() => setIsOpen(false)}>Close</button>
                        <button class="btn" onClick={() => saveTask()}>Speichern</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditTaskModal;
