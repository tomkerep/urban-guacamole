import { createSignal, onMount } from "solid-js";

function HealthCardModal({ personId }) {
    const [person, setPerson] = createSignal(null);
    const [isOpen, setIsOpen] = createSignal(false);

    const baseUrl = 'http://localhost:3000/api/medicaldb'; // Beispiel-URL für die Medical API

    onMount(async () => {
        try {
            const response = await fetch(`${baseUrl}/${personId}`);
            if (response.ok) {
                const data = await response.json();
                setPerson(data);
            } else {
                console.error('Fehler beim Laden der Gesundheitsdaten:', response.statusText);
            }
        } catch (error) {
            console.error('Fehler beim Laden der Gesundheitsdaten:', error.message);
        }
    });

    return (
        <>
            <button class="btn btn-sm btn-accent" onClick={() => setIsOpen(true)}>
                Gesundheitskarte
            </button>
            {isOpen() && person() && (
                <div class="modal modal-open">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">Gesundheitskarte</h3>
                        <div class="mt-2" style="text-align: left;">
                            <p className="py-1"><strong>Vorname:</strong> {person().prename}</p>
                            <p className="py-1"><strong>Nachname:</strong> {person().surname}</p>
                            <p className="py-1"><strong>Adresse:</strong> {person().address}</p>
                            <p className="py-1"><strong>Allergien:</strong> {person().allergies}</p>
                            <p className="py-1"><strong>Blutgruppe:</strong> {person().bloodType}</p>
                            <p className="py-1"><strong>Anfällige Krankheiten:</strong> {person().medicalConditions}</p>
                            <p className="py-1"><strong>Medikamente:</strong> {person().medicine}</p>
                            <p className="py-1"><strong>Notfallkontakt:</strong> {person().emergencyContact}</p>
                            <p className="py-1"><strong>Telefonnummer:</strong> {person().phoneNumber}</p>
                            <p className="py-1"><strong>Notizen:</strong> {person().comments}</p>
                            {/* Weitere Informationen hinzufügen */}
                        </div>
                        <div class="modal-action">
                            <button class="btn" onClick={() => setIsOpen(false)}>Schließen</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HealthCardModal;
