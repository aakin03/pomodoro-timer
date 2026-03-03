import { useState } from "react";

export function BreakTodoList() {
    const [breakIdeas, setBreakIdeas] = useState<string[]>([]);
    const [newBreakIdea, setNewBreakIdea] = useState("");

    const addBreakIdea = () => {
        if (newBreakIdea.trim()) {
            setBreakIdeas([...breakIdeas, newBreakIdea]);
            setNewBreakIdea("");
        }
    };

    const deleteBreakIdea = (index: number) => {
        setBreakIdeas(breakIdeas.filter((_, i) => i !== index));
    };

    return (
        <div className="break-todo-list">
            <div className="flex gap-2">
                <input id="new-break-idea" type="text" value={newBreakIdea} onChange={(e) => setNewBreakIdea(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addBreakIdea()} placeholder="Add a new break idea" className="border border-gray-300 rounded-md px-2 py-1" />
                <button className="add" onClick={addBreakIdea}>Add</button>
            </div>
            <ul>
                {breakIdeas.map((breakIdea, index) => (
                    <li className="break-todo-list-item" key={index}>
                        {breakIdea}
                        <button className="delete" onClick={() => deleteBreakIdea(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}