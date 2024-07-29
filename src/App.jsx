import { useState } from 'react';

const App = () => {
    const [inputTask, setInputTask] = useState('');
    const [list, setList] = useState([]);

    const handleAddTodo = () => {
        if (inputTask.trim() === '') return; // Não permite adicionar tarefas vazias
        const newTask = {
            id: Math.random(),
            todo: inputTask,
            completed: false, // Adiciona o estado de conclusão
        };

        setList([...list, newTask]);
        setInputTask('');
    };

    const handleDeleteTodo = (id) => {
        const newList = list.filter((todo) => todo.id !== id);
        setList(newList);
    };

    const handleInputChange = (event) => {
        setInputTask(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddTodo();
        }
    };

    const handleToggleComplete = (id) => {
        const updatedList = list.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setList(updatedList);
    };

    const handleEditTodo = (id, newTask) => {
        const updatedList = list.map(todo =>
            todo.id === id ? { ...todo, todo: newTask } : todo
        );
        setList(updatedList);
    };

    return (
        <section className="My-To-Do-List py-40 gap-10 text-black font-medium max-w-screen-md mx-auto">
            <div className="Card m-4 flex flex-col bg-white shadow-lg rounded-xl p-4">
                <h1 className='text-center text-3xl'>My To-Do List</h1>
                <div className="Input flex self-center my-4">
                    <input
                        className="input border rounded-lg p-1 m-2"
                        type="text"
                        value={inputTask}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} // Adiciona o evento de tecla
                        placeholder="Digite uma tarefa"
                    />
                    <button className="btn shadow-sm px-2 bg-gray-200 rounded-full" onClick={handleAddTodo}>
                        ➕
                    </button>
                </div>

                <div className="List m-4">
                    <hr />
                    <ul className='flex flex-col gap-2 p-2'>
                        {list.map((todo, index) => (
                            <li className="task flex flex-col" key={todo.id}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-lg font-semibold">{index + 1 + "-"}</span>
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleToggleComplete(todo.id)} // Marca a tarefa como concluída
                                        />
                                        <div className='border-l pl-2'>
                                            <p
                                                style={{
                                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                                    overflowWrap: 'break-word', // Adiciona quebra de palavra
                                                    wordBreak: "break-word"
                                                }}
                                            >
                                                {todo.todo}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='gap-2 flex'>
                                        <button
                                            className='bg-blue-500 p-2 rounded-3xl ml-2 text-white'
                                            onClick={() => {
                                                const newTask = prompt('Edite sua tarefa:', todo.todo); // Solicita ao usuário para editar
                                                if (newTask) {
                                                    handleEditTodo(todo.id, newTask);
                                                }
                                            }}
                                        >
                                            ✏️
                                        </button>
                                        <button className='bg-red-700 p-2 rounded-3xl text-white' onClick={() => handleDeleteTodo(todo.id)}>
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                                <div className="border-b border-gray-300 my-2" /> {/* Barra horizontal */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default App;
