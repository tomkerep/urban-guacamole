import { createSignal, createResource } from "solid-js";
import NewTaskModal from "@solid/NewTaskModal";
import EditTaskModal from "@solid/EditTaskModal";
import date from "@layouts/DateDisplay.astro";


export default function SolidTaskSimple(props) {
    // Funktion zum Formatieren des Datums
    const formatDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const year = today.getFullYear();
      return `${day}.${month}.${year}`;
    };
    

  let baseUrl = 'http://localhost:3000/api/taskdb';
  const [filterString, setFilterString] = createSignal("");

  const fetchTasksResource = async () => {
    console.log("refetch");
    let data = await fetch(baseUrl, { method: 'GET' });
    let json = await data.json();
    console.log("data fetched", json);
    return json.taskObject.tasks;
  };

  const [tasks, { refetch: refetchTasks }] = createResource(fetchTasksResource);

  const deleteTask = async (taskId) => {
    console.log("delete ", taskId);
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'id': taskId }
    };
    let data = await fetch(baseUrl, requestOptions);
    if (data.status === 200) {
      let json = await data.json();
      console.log(json);
      refetchTasks();
    } else {
      alert("Fehler: " + data.statusText);
    }
  };

  return (
    <div>
      <h1 class="text-3xl mt-5 mb-2 font-bold">Aufgaben Übersicht</h1>
      <p class="text-l mb-5 font-semibold">Heute, {formatDate()}</p>
      <div>
        <input
          onInput={(e) => setFilterString(e.target.value)}
          type="text"
          id="filter"
          class="input input-bordered w-full"
          placeholder="Filter..."
          required
        />
      </div>
      <div>
        <NewTaskModal refetchFunction={refetchTasks} />
      </div>
      <table class="table w-full">
        <thead>
          <tr class="px-6 py-3">
            <th>Aufgaben Name</th>
            <th>Kommentar</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {tasks() && tasks().filter((task) =>
            task.taskName.toLowerCase().indexOf(filterString().toLowerCase()) >= 0 ||
            task.kommentar.toLowerCase().indexOf(filterString().toLowerCase()) >= 0
          ).map((task) =>
            <tr>
              <th scope="row" class="py-4">
                {task.taskName}
              </th>
             
              <td class="py-4">
                {task.kommentar}
              </td>
               {/* <td class="py-4">
                <input type="checkbox" checked={task.status} class="checkbox" />
              </td> */}
              <td class="py-4" >
                <EditTaskModal
                  taskId={task.taskId}
                  taskName={task.taskName}
                  kommentar={task.kommentar}
                  //status={task.status}
                  refetchFunction={refetchTasks}
                />
              </td>
              <td class="py-4">
                <button onClick={() => deleteTask(task.taskId)} class="btn  btn-accent btn-sm">
                  Erledigt
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
