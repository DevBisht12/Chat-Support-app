import './updateUser.css'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
// import { updateUser } from '../../Redux/features/userSlice';

const UpdateUser = () => {
    const { id } = useParams(); 
    const [userData, setUserData] = useState({});
    const [role, setRole] = useState('');


    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    console.log(user)


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const req = await fetch(`http://localhost:5000/api/user/userdetails/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await req.json();
                console.log(data);
                if (data) setUserData(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const req = await fetch('http://localhost:5000/api/user/update/User', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    role: role,
                })
            });
            const data = await req.json();
            console.log(data);
            // dispatch(updateUser(role))
            alert(data.message)
        } catch (error) {
            console.log(error);
        }
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    return (
        <div className="updateUser_form">
            <form className='UpdateForm' action="" onSubmit={handleSubmit}>
                <Link to='/'><h1>LoGo</h1></Link>
                <label htmlFor="name">Name</label>
                <input type="text" value={userData.name || ''} id="name" placeholder="Name" />
                <label htmlFor="email">Email</label>
                <input type="text" value={userData.email || ''} id="email" placeholder="Email" />
                <label htmlFor="">Role</label>
                <select name="" id="" value={role} onChange={handleRoleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="support">Support</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateUser;
