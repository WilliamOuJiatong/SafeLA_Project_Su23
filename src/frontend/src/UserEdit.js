// UserEdit.js
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
import styles from './UserEdit.module.css';

function UserEdit() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const [updatedUser, setUpdatedUser] = useState({
        UserID: user.UserID,
        UserName: user.UserName,
        Email: user.Email,
        Password: user.Password,
    })

    const handleChange = (event) => {
        setUpdatedUser({ ...updatedUser, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.put('http://localhost:8081/useredit', updatedUser)
            if (res.data.status === 'Success') {
                setUser(updatedUser)
                navigate('/home')
            } else {
                alert('Update failed')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:8081/userdelete/${user.UserID}`);
            navigate('/');
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };


    return (
        <div className={styles.container}> {/*using a class from CSS Module*/}
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Username"
                    name="UserName"
                    value={updatedUser.UserName}
                    onChange={handleChange}
                />
                <input
                    className={styles.formInput}
                    type="email"
                    placeholder="Email"
                    name="Email"
                    value={updatedUser.Email}
                    onChange={handleChange}
                />
                <input
                    className={styles.formInput}
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={updatedUser.Password}
                    onChange={handleChange}
                />
                <button className={styles.formButton} type="submit">Submit update</button>
                <br></br><br></br>
                <button onClick={(e) => deleteUser(e)} className={styles.deleteButton}>Delete Account</button>
                <br></br><br></br>
                <button onClick={() => navigate('/home')} className={styles.formButton}>Back</button>
            </form>
        </div >
    )
}

export default UserEdit
