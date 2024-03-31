import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    hire_date: '',
    job_id: '',
    salary: '',
    department_id: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
      console.log(data);
      setEmployees(data);

    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });
      fetchEmployees();
      setNewEmployee({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        hire_date: '',
        job_id: '',
        salary: '',
        department_id: ''
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
        method: 'DELETE',
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='heading1'>Employee Management System</h1>
        <form onSubmit={handleSubmit} className="form-container">
          {/* Form inputs for adding a new employee */}
        </form>
        <div>
          <h2 className='heading2'>Employees</h2>
          <table className="employee-list">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Hire Date</th>
                <th>Job ID</th>
                <th>Salary</th>
                <th>Department ID</th>
                <th>Action</th> {/* Column for the delete button */}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone_number}</td>
                  <td>{employee.hire_date}</td>
                  <td>{employee.job_id}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.department_id}</td>
                  <td>
                    <button onClick={() => deleteEmployee(employee.employee_id)}>
                      Delete
                    </button>
                  </td> {/* Delete button */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
