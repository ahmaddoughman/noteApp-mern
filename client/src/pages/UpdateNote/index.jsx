import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from'react-router-dom';
import { useAuth } from '../../contexts/auth';
import { toast } from 'react-toastify';

const UpdateNote = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#ffffff');

    const { id } = useParams();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3001/api/v1/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user}`
            },
            body: JSON.stringify({
                title,
                description,
                color
            })
        })
        const data = await res.json();
        if (data.success) {
            toast.success('Note updated successfully');
        } else {
            toast.error(data.error || 'Failed to update note');
        }
        navigate('/notes');
    }

    useEffect(() => {
        fetch(`http://localhost:3001/api/v1/notes/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user}`
                }
            }
        )
       .then(res => res.json())
       .then(data => {
                setTitle(data.data.title);
                setDescription(data.data.description);
                setColor(data.data.color);
                setLoading(false);
            })
    }, [])

  return (
    <div>
        {loading && <h1>Loading...</h1>}
        <div className='flex flex-col items-center justify-center my-3 p-10  rounded '>
            <form action=""  onSubmit={handleSubmit}
            className='flex flex-col items-center justify-center my-3 w-1/2 p-10 bg-gray-300 rounded shadow'>
                <input className='border-2 my-6 border-gray-300 p-2 rounded outline-none focus:border-blue-400 focus:shadow'
                    type="text" placeholder='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input
                className='border-2 my-6 border-gray-300 p-2 rounded outline-none focus:border-blue-400 focus:shadow' 
                type="text" placeholder='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />

                <select  className='border-2 my-6 border-gray-300 p-2 rounded outline-none focus:border-blue-400 focus:shadow' name="color" value={color} onChange={(e)=>setColor(e.target.value)}>
                    <option value="#ffffff">white</option>
                    <option value="#000000">black</option>
                    <option value="#ff0000">red</option>
                    <option value="#00ff00">green</option>
                    <option value="#0000ff">blue</option>
                </select>

                <button className='w-full bg-blue-500 text-white hover:bg-blue-400 p-2 rounded shadow' type='submit'>Update Note</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateNote
