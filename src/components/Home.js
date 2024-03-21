import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchEmployees } from './actions'; // Import action creators

function Home() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '', gender: 'male', maritalStatus: 'single' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    fetchEmployees();
  }, []);


  // Create functionality

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://crud-first-751c1-default-rtdb.firebaseio.com/employees.json');
      const data = response.data;
      console.log("Hi....", data);
      if (data) {
        const employeesArray = Object.keys(data).map(key => ({
          id: key,
          name: data[key].name,
          role: data[key].role,
          gender: data[key].gender,
          maritalStatus: data[key].maritalStatus
        }));
        setEmployees(employeesArray);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Post functionality

  const postEmployee = async () => {
    try {
      await axios.post('https://crud-first-751c1-default-rtdb.firebaseio.com/employees.json', formData);
      setFormData({ name: '', role: '', gender: 'male', maritalStatus: 'single' });
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };


  // Edit functionality

  const handleUpdate = async () => {
    try {
      await axios.put(`https://crud-first-751c1-default-rtdb.firebaseio.com/employees/${editId}.json`, formData);
      setFormData({ name: '', role: '', gender: 'male', maritalStatus: 'single' });
      setIsEditing(false);
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // delete functionality

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://crud-first-751c1-default-rtdb.firebaseio.com/employees/${id}.json`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({ name: '', role: '', gender: 'male', maritalStatus: 'single' });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdate();
    } else {
      postEmployee();
    }
  };

  const handleEdit = (employee) => {
    setFormData({ name: employee.name, role: employee.role, gender: employee.gender, maritalStatus: employee.maritalStatus });
    setIsEditing(true);
    setEditId(employee.id);
    setShowModal(true);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mx-5">Add Employee</Button>
      <Row className='align-items-center'>
        <Col>
          <table className="striped bordered hover table border border-secondary w-50 m-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Gender</th>
                <th>Marital Status</th>
                <th className='mx-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.maritalStatus}</td>
                  <td>
                    <Button variant="primary" className='mx-2' onClick={() => handleEdit(employee)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className=''>{isEditing ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitModal}>
            <Form.Group controlId="formTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" placeholder="Enter role" name="role" value={formData.role} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Check inline type="radio" label="Male"  name="gender"  class="mx-2" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
              <Form.Check inline type="radio" label="Female" name="gender"  class="mx-2" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Marital Status</Form.Label>
              <Form.Check inline type="radio" label="Single"  name="maritalStatus"   class="mx-2" value="single" checked={formData.maritalStatus === 'single'} onChange={handleChange} />
              <Form.Check inline type="radio" label="Married"  name="maritalStatus" class="mx-2" value="married" checked={formData.maritalStatus === 'married'} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="m-3 w-20">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  employees: state.employees,
});

export default connect(mapStateToProps, { fetchEmployees })(Home);

