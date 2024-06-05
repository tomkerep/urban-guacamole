import { createSignal, onMount } from "solid-js";

const NewTaskModal = (props) => {
    const [taskName, setTaskName] = createSignal("");
    const [kommentar, setKommentar] = createSignal("");
    const [isOpen, setIsOpen] = createSignal(false);

    let baseUrl = 'http://localhost:3000/api/taskdb';

    onMount(async () => {
        // Fetch person data if needed
    });

    const postTask = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                taskName: taskName(), 
                kommentar: kommentar()
            })
        };
        let data = await fetch(baseUrl, requestOptions);
        if (data.status === 200) {
            let json = await data.json(); 
            console.log(json);
            props.refetchFunction();
        } else {
            alert("Fehler: " + data.statusText);
        }
    }

    let saveTask = () => {
        console.log(taskName(), kommentar());
        setIsOpen(false);
        postTask();
    }

    let updateTaskName = (e) => {
        setTaskName(e.target.value);
    }

    let updateKommentar = (e) => {
        setKommentar(e.target.value);
    }

    return (
        <div>
            <button class="btn btn-accent my-5" onClick={() => setIsOpen(true)}>Neue Aufgabe anlegen</button>
            <div class={isOpen() ? "modal modal-open" : "modal"}>
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Neue Aufgabe hinzufügen.</h3>
                    <p class="py-4">Bitte Daten eingeben</p>
                    <form method="dialog">
                        <label class="input input-bordered flex items-center gap-2 my-2">
                            <input type="text" class="grow" placeholder="Aufgabenname..." value={taskName()} onInput={updateTaskName} />
                        </label>
                        <label class="input input-bordered flex items-center gap-2 my-2">
                            <input type="text" class="grow" placeholder="Kommentar..." value={kommentar()} onInput={updateKommentar} />
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

export default NewTaskModal;
