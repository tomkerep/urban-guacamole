import { createSignal, createResource } from "solid-js";

const EditPersonModal = (props) => {
    const [prename, setPrename] = createSignal(props.prename);
    const [surname, setSurname] = createSignal(props.surname);
    const [age, setAge] = createSignal(props.age);
    const [schoolClass, setSchoolClass] = createSignal(props.class);
    const [isOpen, setIsOpen] = createSignal(false);

    let baseUrl = 'http://localhost:3000/api/persondb'

    const putPerson = async() => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: props.id, prename: prename(), surname: surname(), age: age(), schoolClass: schoolClass() })
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

    let editPerson = () =>  {
        console.log(props.id, ": ", prename(), " " ,surname(), ", ", age(), ", ",schoolClass());
        setIsOpen(false);
        putPerson();
    }

    let updatePrename = (e) => {
        setPrename(e.target.value);
    }

    let updateSurname = (e) => {
        setSurname(e.target.value);
    }

    let updateAge = (e) => {
        setAge(e.target.value);
    }

    let updateSchoolClass = (e) => {
        setSchoolClass(e.target.value);
    }

    return (
        <div>
            <button class="btn btn-sm" onClick={() => setIsOpen(true)}>Person editieren</button>
            <div class={isOpen() ? "modal modal-open" : "modal"}>
                <div class="modal-box">
                <p class="py-4">Bitte Daten eingeben</p>
                <form method="dialog">
                    <label class="input input-bordered flex items-center gap-2">
                        <input type="text" class="grow" placeholder="Vorname..." value={ prename() } onInput = {  updatePrename  }/>
                    </label>
                    <label class="input input-bordered flex items-center gap-2 my-2">
                        <input type="text" class="grow" placeholder="Nachname..." value={ surname() } onInput =  { updateSurname } />
                    </label>
                    <label class="input input-bordered flex items-center gap-2 my-2">
                        <input type="number" class="grow" placeholder="Alter..." value={ age() } onInput =  { updateAge } />
                    </label>
                    <label class="input input-bordered flex items-center gap-2 my-2">
                        <input type="text" class="grow" placeholder="Klasse..." value={ schoolClass() } onInput = {  updateSchoolClass} />
                    </label>
                </form>
                <div class="modal-action">
                    <button class="btn" onClick={() => setIsOpen(false)}>Close</button>
                    <button class="btn" onClick={() => editPerson()}>Speichern</button> 
                </div>  
            </div>
            </div> 
        </div>
    )
};

export default EditPersonModal;

