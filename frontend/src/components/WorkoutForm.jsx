import axios from 'axios'
import React, { useState } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newWorkout = { title: title, load: load, reps: reps }
    console.log(newWorkout);

    try {
      const response = await axios.post('http://localhost:4000/api/workouts', newWorkout);

      if (response.status === 200) {
        setTitle('');
        setLoad('');
        setReps('');
        setError(null);
        setEmptyFields([])
        setSuccess('Successfully added a workout!');
        console.log("New workout is added!", response.data);
        dispatch({ type: 'CREATE_WORKOUT', payload: response.data })
      } else {
        setError('An error occurred while adding the workout');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        console.error('Request failed with status code', error.response.status);
        setError(error.response.data.error || 'An error occurred while adding the workout');
        setEmptyFields(error.response.data.emptyFields)
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received');
        setError('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        setError('An error occurred while processing your request');
      }
    }


  }

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Excersize Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}

        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
        />

        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
        />

        <button>Add Workout</button>

        {error && <div className='error'>{error}</div>}
        {success && <div className='success'>{success}</div>}
      </form>
    </div>
  )
}

export default WorkoutForm