import React, { useState, useRef } from 'react'

type FormElement = React.FormEvent<HTMLFormElement>;
interface Itask {
  name: string;
  done: boolean;
}

const App = (): JSX.Element => {

  const [task, setTask] = useState<string>('')
  const [tasks, setTasks] = useState<Itask[]>([])

  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTask(task)
    console.log(tasks);
    setTask('')
    taskInput.current?.focus()
  }

  const addTask = (name: string): void => {
    const newTasks: Itask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
  }

  const toggleDoneTask = (i: number): void => {
    const newTasks: Itask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done
    setTasks(newTasks)
  }

  const removeTask = (index: number) => {
    const newTasks: Itask[] = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  return (
    <div className='container p-4'>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className='text-center'>TASK LIST</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={e => setTask(e.target.value)}
                  value={task}
                  className="form-control"
                  autoFocus
                  required
                  ref={taskInput}
                />
                <button type='submit' className='btn btn-success d-block mt-2'>Save</button>
              </form>
            </div>
          </div>

          {
            tasks.map((task: Itask, index: number) => (
              <div
                className='card card-body mt-2'
                key={index}
              >
                <h2 style={{ textDecoration: task.done ? 'line-through' : '', textTransform: 'capitalize' }}> {task.name}</h2>
                <div className='d-flex gap-4'>
                  <button className='btn btn-secondary' onClick={() => toggleDoneTask(index)}>
                    {task.done ? '✅' : '❌'}
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => removeTask(index)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            )
            )
          }
        </div>
      </div>
    </div >
  )
}

export default App