import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api").then((res) => {
            setList(res.data);
        });
    }, []);
    const subitform = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/insert", { name, pass })
            .then(() => {
                alert("success");
            });
    };
    return (
        <>
            <div className="list">
            {list.map((item)=>{
                return `name: ${item.name}, pass: ${item.pass}`;
            })}
            </div>
            <div className="form">
                <form>
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        placeholder="name"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <label htmlFor="">Pass</label>
                    <input
                        type="text"
                        placeholder="pass"
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                    />
                    <button type="submit" onClick={subitform}>
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default App;
