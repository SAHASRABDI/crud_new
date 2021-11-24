import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

function Form() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/").then((resp) => {
      console.log(resp.data);
      setData(resp.data);
    });
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [idBeingEdited, setIdBeingEdited] = useState("")

  const [addFormData, setAddFormData] = useState({
    registrationNo: "",
    username: "",
    role: "Select",
  });

  function onChangeReg(e) {
    setAddFormData({ ...addFormData, registrationNo: e.target.value });
  }

  function onChangeName(e) {
    setAddFormData({ ...addFormData, username: e.target.value });
  }

  function onChangeRole(e) {
    setAddFormData({ ...addFormData, role: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    const newFormData = {
      registrationNo: addFormData.registrationNo,
      username: addFormData.username,
      role: addFormData.role,
    };
    if (!editMode)
      axios
        .post("http://localhost:5000/add", newFormData)
        .then((res) => {
          console.log(res);

          //Update Current Form Data Locally, No Wait from Server needed
          axios.get("http://localhost:5000/").then((resp) => {
            console.log(resp.data);
            setData(resp.data);
          });
          //Reset Form State
          setAddFormData({
            registrationNo: "",
            username: "",
            role: "Select",
          });
        })
        .catch((err) => console.log(err.message));
    else
        axios.post(`http://localhost:5000/update/${idBeingEdited}`,newFormData).then((resp)=>{
            //Update Current Form Data Locally, No Wait from Server needed
          axios.get("http://localhost:5000/").then((resp) => {
            console.log(resp.data);
            setData(resp.data);
          });
          //Reset Form State
          setAddFormData({
            registrationNo: "",
            username: "",
            role: "Select",
          });
          setEditMode(false)
        })
        .catch((err) => console.log(err.message));
  }

  function onDelete(index) {
    axios
      .post(`http://localhost:5000/${data[index]._id}`)
      .then((resp) => {
        console.log(resp);
        let newData = data.filter((value, i) => index !== i);
        setData(newData);
      })
      .catch(console.error);
  }

  function onEdit(index) {
    setEditMode(!editMode);
    setIdBeingEdited(data[index]._id);
    setAddFormData({
        registrationNo:data[index].registrationNo,
        username:data[index].username,
        role:data[index].role,
    })
  }
  return (
    <div className="app-container">
      <h3 className="text-center">Sahasrabdi Bhattacherya Capstone</h3>
      <br />
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>RegistrationNo</label>
          <input
            type="number"
            placeholder="Enter Registration Number"
            className="form-control"
            name="regNo"
            required="required"
            onChange={onChangeReg}
            value={addFormData.registrationNo}
          />
        </div>
        <br />
        <div className="form-group">
          <label>UserName</label>
          <input
            type="text"
            placeholder="Enter full name"
            className="form-control"
            name="empName"
            required="required"
            onChange={onChangeName}
            value={addFormData.username}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Role</label>
          <select
            className="form-control"
            required="required"
            name="role"
            onChange={onChangeRole}
            value={addFormData.role}
          >
            <option value="Select" default disabled>
              Select
            </option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Security Analyst">Security Analyst</option>
            <option value="Product Manager">Product Manager</option>
          </select>
        </div>
        <br />
        <br />
        <div className="form-group">
          <input
            type="submit"
            value={!editMode ? "Create" : "Confirm Update"}
            className={!editMode ? "btn btn-primary": "btn btn-outline-primary"}
          />
        </div>
      </form>

      <div className="app-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>RegistrationNo</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="elements">
            {data.map((value, i) => {
              console.log(value);
              return (
                <tr key={value._id}>
                  <td>{value.registrationNo}</td>
                  <td>{value.username}</td>
                  <td>{value.role}</td>
                  <td>
                    <Button
                      variant="primary"
                      style={{ margin: "5px" }}
                      onClick={() => onEdit(i)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      style={{ margin: "5px" }}
                      onClick={() => onDelete(i)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Form;
