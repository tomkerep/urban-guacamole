import { createSignal, createResource } from "solid-js";
import NewTaskModal from "@solid/NewTaskModal";
import EditTaskModal from "@solid/EditTaskModal";

export default function SolidTaskSimple(props) {
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
      <h1 class="text-3xl my-5 font-bold">Aufgaben Übersicht</h1>
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
      <table class="table table-zebra w-full">
        <thead>
          <tr class="px-6 py-3">
            <th>Aufgaben Name</th>
            <th>Kommentar</th>
            <th>Status</th>
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
               <td class="py-4">
                <input type="checkbox" checked={task.status} class="checkbox" />
              </td>
              <td class="py-4">
                <EditTaskModal
                  taskId={task.taskId}
                  taskName={task.taskName}
                  kommentar={task.kommentar}
                  status={task.status}
                  refetchFunction={refetchTasks}
                />
              </td>
              <td class="py-4">
                <button onClick={() => deleteTask(task.taskId)} class="btn btn-sm">
                  Löschen
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
