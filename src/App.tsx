import { useEffect, useState } from "react"
import { ListPriority, type Priority, type Task } from "./types/data"
import { Trash2 } from "lucide-react";

interface CreateBadgeProps {
  priority: Priority;
}
const CreateBadge: React.FC<CreateBadgeProps> = ({ priority }) => {

  const badgeClasses: { [key in Priority]: string } = {
    "Moyenne": "badge badge-soft badge-warning p-3",
    "Urgente": "badge badge-soft badge-error p-3",
    "Basse": "badge badge-soft badge-info p-3", // Ajoute "Basse" ici si nécessaire
  };

  const badgeClass = badgeClasses[priority] || "badge badge-soft badge-info p-3"; // Valeur par défaut si la priorité n'est pas définie

  return <div className={badgeClass}>{priority}</div>;
};
function App() {
  const [priority, setPriority] = useState<Priority>("Basse")
  const [taskName, setTaskName] = useState<string>("")
  const [listTask, setListTask] = useState<Task[]>([])
  const [listTaskNotChange, setListTaskNotChange] = useState<Task[]>([])

  const [select, setSelect] = useState<Task[]>([])
  const [error, setError] = useState(false)

  const handleSaveToBd = (listTask: Task[]) => {
    if(listTask.length > 0){
      setListTaskNotChange(listTask)
      localStorage.setItem("task", JSON.stringify(listTask))
    }

  }
  
  const handleChargeData = () => {
    const storage: string | null = localStorage.getItem("task")
    if (storage) {
      console.log("STORAGE", storage);
      setListTask(JSON.parse(storage))
      setListTaskNotChange(JSON.parse(storage))

    }
  }
  useEffect(() => {
    handleChargeData()
  }, [])

  const handleFilter = (priority: Priority | "All") => {
    if(priority === "All"){
      handleChargeData()
    }else{
      let [...data] = listTaskNotChange
      data = data.filter(elem => elem.priority === priority)
      setListTask(data)
    }
  }

  const handleDeleteTask = (task: Task) =>{
    let newData = [...listTask]
    newData = newData.filter(elem => elem.id !== task.id)
    handleSaveToBd(newData)
  }

  const handleSelect = (task: Task) => {
    let [...copyCheckedTask] = select
    const exitElem = copyCheckedTask.filter(element => element.id === task.id)
    console.log("RECERCHE : ", exitElem);

    if (exitElem.length > 0) {
      console.log("EST DEDANS");

      copyCheckedTask = copyCheckedTask.filter(elem => elem.id != task.id)
    } else {
      console.log("PAS DEDANT");

      copyCheckedTask.push(task)
    }
    setSelect(copyCheckedTask)
    console.log("COPY : ", copyCheckedTask);

  }
  const handleSaveTask = () => {
    if (taskName.trim().length <= 0) {
      setError(true)
    } else {
      setError(false)
      const id = Date.now()
      const task: Task = {
        id: id,
        description: taskName,
        priority: priority
      }
      console.log("NEW TASK CREATE : ", task);

      const [...oldTask] = listTask

      oldTask.push(task)
      setListTask(oldTask)
      setTaskName("")
      setPriority("Basse")
      handleSaveToBd(oldTask)
    }
  }


  const countTaskPriority = (prio: Priority) => {
    return (listTaskNotChange.filter(task => task.priority === prio)).length
  }

  const checkedTask = (elem: Task) => {
    const isTask = select.filter(task => task.id == elem.id)
    return isTask.length > 0
  }

  let inputClass: string = "input w-full "
  inputClass += error ? "input-error border-2" : ""
  console.log(taskName);

  console.log("LIST TASK", listTask);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-2/3 bg-base-300 my-15 flex flex-col gap-4 p-5 rounded-2xl">
          <div className="flex justify-between">
            <input type="text"
              placeholder="Ajouter une tâche..."
              className={inputClass}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)} />
            <select defaultValue="Choisir la priorité"
              className="select w-full"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}>
              {ListPriority.map((elem, index) =>
                <option value={elem} key={index}>{elem}</option>
              )}
            </select>
            <button className="btn btn-secondary px-14 ml-2" onClick={handleSaveTask}>Ajouter</button>
          </div>
          <div className="flex justify-between relative">
            <div className="w-2/3 gap-5 justify-between">
              <button className="btn btn-neutral py-5 mx-5" onClick={() => handleFilter("All")}>Tous ({listTaskNotChange.length})</button>
              {ListPriority.map((prio, index) =>
                <button className="btn btn-neutral py-5 mx-5" key={index} onClick={() => handleFilter(prio)}>{prio} ({countTaskPriority(prio)})</button>
              )}

            </div>
            <div>
              <button className="btn btn-wide">Finir la sélection ({select.length})</button>
            </div>
          </div>
          <div className="w-full mt-5">
            {listTask.map((task, key) =>
              <div className="flex justify-between gap-5 pt-3" key={task.id}>
                <div className="">
                  <input type="checkbox" id={`${task.id}`} className="checkbox checkbox-info checkbox-sm" onClick={() => handleSelect(task)} checked={checkedTask(task)} />
                  <label htmlFor={`${task.id}`} className="pl-2.5 pr-4">{`${task.description}`}</label>
                  <CreateBadge priority={task.priority} />
                </div>
                <div className="p-2 bg-accent-content justify-center rounded-md cursor">
                  <Trash2 size={20} color="red" className="" style={{ verticalAlign: 'middle', marginRight: '5px' }} onClick={() => handleDeleteTask(task)}/>
                </div>
              </div>
            )}

          </div>
        </div>
        <div>
        </div>

      </div>
    </>
  )
}

export default App
