import { useState } from "react";

// const initialItems = [
//     { id: 1, description: "Passports", quantity: 2, packed: false },
//     { id: 2, description: "Socks", quantity: 12, packed: true },
//     { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    function handleRemoveItems(itemID) {
        setItems((items) => items.filter((item) => item.id !== itemID));
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} onRemoveItems={handleRemoveItems} />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return console.log("podaj co");

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };
        // console.log(items);

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip 😍</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></input>
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, onRemoveItems }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onRemoveItems={onRemoveItems}
                    />
                ))}
            </ul>
        </div>
    );
}

function Item({ item, onRemoveItems }) {
    return (
        <li>
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onRemoveItems(item.id)}>❌</button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>
                👜 You have X items on your list, and you already packed X(X%)
            </em>
        </footer>
    );
}
