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

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='heading1'>Employee Management System</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input type="text" name="first_name" placeholder="First Name" value={newEmployee.first_name} onChange={handleInputChange} required />
          <input type="text" name="last_name" placeholder="Last Name" value={newEmployee.last_name} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleInputChange} required />
          <input type="text" name="phone_number" placeholder="Phone Number" value={newEmployee.phone_number} onChange={handleInputChange} required />
          <input type="date" name="hire_date" value={newEmployee.hire_date} onChange={handleInputChange} required />
          <input type="text" name="job_id" placeholder="Job ID" value={newEmployee.job_id} onChange={handleInputChange} required />
          <input type="number" name="salary" placeholder="Salary" value={newEmployee.salary} onChange={handleInputChange} required />
          <input type="number" name="department_id" placeholder="Department ID" value={newEmployee.department_id} onChange={handleInputChange} required />
          <button type="submit">Add Employee</button>
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
        </tr>
    </thead>
    <tbody>
        {employees.map((employee) => (
            <tr key={employee[0]}>
                <td>{employee[0]}</td>
                <td>{employee[1]}</td>
                <td>{employee[2]}</td>
                <td>{employee[3]}</td>
                <td>{employee[4]}</td>
                <td>{employee[5]}</td>
                <td>{employee[6]}</td>
                <td>{employee[7]}</td>
                <td>{employee[8]}</td>
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