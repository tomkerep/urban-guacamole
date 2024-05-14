import { createSignal, createResource } from "solid-js";

const NewPersonModal = (props) => {
    const [prename, setPrename] = createSignal("");
    const [surname, setSurname] = createSignal("");
    const [age, setAge] = createSignal("");
    const [city, setCity] = createSignal("");
    const [isOpen, setIsOpen] = createSignal(false);

    let baseUrl = 'http://localhost:3000/api/persondb'

    const postPerson = async() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prename: prename(), surname: surname(), age: age(), city: city() })
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

    let savePerson = () =>  {
        console.log(prename(), " " ,surname(), ", ", age(), ", ", city());
        setIsOpen(false);
        postPerson();
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

    let updateCity = (e) => {
        setCity(e.target.value);
    }

    return (
        <div>
            <button class="btn my-5" onClick={() => setIsOpen(true)}>Neue Person anlegen</button>
            <div class={isOpen() ? "modal modal-open" : "modal"}>
                <div class="modal-box">
                <h3 class="font-bold text-lg">Neue Person hinzufügen.</h3>
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
                        <input type="text" class="grow" placeholder="Stadt..." value={ city() } onInput = {  updateCity } />
                    </label>
                </form>
                <div class="modal-action">
                    <button class="btn" onClick={() => setIsOpen(false)}>Close</button>
                    <button class="btn" onClick={() => savePerson()}>Speichern</button> 
                </div>  
            </div>
            </div> 
        </div>
    )
};

export default NewPersonModal;

