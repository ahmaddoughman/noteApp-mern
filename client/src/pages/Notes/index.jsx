import React, {useEffect,useState} from 'react';
import { useAuth } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Notes = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const handleDeleteNote = async (id) => {
    const res = await fetch(`http://localhost:3001/api/v1/notes/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`
        }
      }
    );
    const data = await res.json();
     setNotes(notes.filter(note => note._id!== id));
    if (data.success) {
      toast.success('Note deleted successfully');
    } else {
      toast.error(data.error || 'Failed to delete note');
    }
    getAllNotes();
  }

  const getAllNotes = async () => {

    if (!user) {
      return; // Don't fetch notes if user is not logged in
    }

    const res = await fetch('http://localhost:3001/api/v1/notes',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`
        }
      },
      );
      const data = await res.json();
      setLoading(false);
      console.log(data)
      setNotes(data);
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className='my-2'>
      {loading && <h1>Loading...</h1>}
      <div  className='flex items-center justify-around'>
      {notes.length === 0 && <h1>No Notes</h1> }
       { notes.map((note) => (
        <div key={note._id}  style={{backgroundColor: note.color}} className='flex flex-col gap-4 p-4  items-center justify-center w-80 h-40'>
          <h1 className='text-white'>{note.title}</h1>
          <p className='text-white'>{note.description}</p>
          <div className='flex gap-4'>
            <button>
              <Link to={`/notes/update/${note._id}`} className='bg-blue-500 text-white hover:bg-blue-400 p-2 rounded shadow'>
              Update Note
              </Link>
            </button>
            <button className='bg-blue-500 text-white hover:bg-blue-400 p-2 rounded shadow'
              onClick={()=> handleDeleteNote(note._id)}
            >
              Delete Note
            </button>
          </div>
        </div>
      ))}
      </div>
      <button className='my-10'>
        <Link to='/notes/create' className='bg-blue-500 text-white hover:bg-blue-400 p-2 rounded shadow'>
        create Note
        </Link>
      </button>
    </div>
  )
}

export default Notes
