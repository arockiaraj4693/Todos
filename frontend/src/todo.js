import { useEffect, useState } from "react";
export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState("-1");
  const [edittitle, setEditTitle] = useState("");
  const [editdescription, setEditDescription] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = () => {
    setTitle("");
    setDescription("");
    setError("");
    // check inputs
    if ((title || "").trim() !== "" && (description || "").trim() !== "") {
      fetch(`${process.env.REACT_APP_API_URL}/r1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            // add a item
            setTodos([...todos, { title, description }]);
            setMessage("Item Added succesfully");
            setTimeout(() => {
              setMessage("");
            }, 2000);
          } else {
            setError("Unable To Create a TODO Item");
          }
        })
        .catch(() => {
          setError("Unable To Create a TODO Item");
        });
    }
  };
  const handleClear = () => {
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(`${process.env.REACT_APP_API_URL}/r1`)
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      });
  };
  const handleEdit = (item) => {
    (setEditId(item._id), setEditTitle(item.title));
    setEditDescription(item.description);
  };

  const handleUpdate = () => {
    setError("");
    // check inputs
    if (edittitle.trim() !== "" && editdescription.trim() !== "") {
      fetch(`${process.env.REACT_APP_API_URL}/r1/+editId`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: edittitle,
          description: editdescription,
        }),
      })
        .then((res) => {
          if (res.ok) {
            // update a item
            const updatedTodo = todos.map((item) => {
              if (item._id == editId) {
                item.title = edittitle;
                item.description = editdescription;
              }
              return item;
            });
            setTodos(updatedTodo);
            setMessage("Item Updated succesfully");
            setTimeout(() => {
              setMessage("");
            }, 2000);
            setEditId(-1);
          } else {
            setError("Unable To Update a TODO Item");
          }
        })
        .catch(() => {
          setError("Unable To Upadate a TODO Item");
        });
    }
  };
  const handleCancel = () => {
    setEditId(-1);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are You Sure Delete this TODO")) {
      fetch(`${process.env.REACT_APP_API_URL}/r1/+id`, {
        method: "DELETE",
      }).then(() => {
        const updatedTodos = todos.filter((item) => item._id !== id);
        setTodos(updatedTodos);
      });
    }
  };
  return (
    <>
      <div className="row p-3 bg-success text-light">
        <h1>ToDo Project with MERN Stack</h1>
      </div>
      <div className="row">
        <h3>Add Item</h3>
        {message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-2 m-2 ">
          <input
            placeholder="Please Add a Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-control"
            type="text"
          ></input>
          <input
            placeholder="Please Add a Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
            type="text"
          ></input>
          <button className="btn btn-outline-success" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn btn-outline-warning" onClick={handleClear}>
            Clear
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <h3>Tasks</h3>
          <ul className="list-group">
            {todos.map((item) => (
              <li className="list-group-item bg-info d-flex justify-content-between my-2">
                <div className="d-flex flex-column">
                  {editId == -1 || editId !== item._id ? (
                    <>
                      <span className="fw-bold">{item.title}</span>
                      <span>{item.description}</span>
                    </>
                  ) : (
                    <>
                      <div className="form-group d-flex justify-content-between gap-2 ">
                        <input
                          onChange={(e) => setEditTitle(e.target.value)}
                          value={edittitle}
                          className="form-control"
                          type="text"
                        ></input>
                        <input
                          onChange={(e) => setEditDescription(e.target.value)}
                          value={editdescription}
                          className="form-control"
                          type="text"
                        ></input>
                      </div>
                    </>
                  )}
                </div>
                <div className="d-flex gap-2">
                  {editId == -1 || editId !== item._id ? (
                    <button
                      className="btn btn-outline-dark fw-bold"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button onClick={handleUpdate}>Update</button>
                  )}
                  {editId == -1 || editId !== item._id ? (
                    <button
                      className="btn btn-outline-danger fw-bold"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger fw-bold"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
