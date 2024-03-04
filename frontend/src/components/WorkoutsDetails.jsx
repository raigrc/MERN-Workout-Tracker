import axios from 'axios'
import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutsDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const handleClick = async () => {
    const response = await axios.delete('http://localhost:4000/api/workouts/' + workout._id)

    if (response.status === 200) {
      dispatch({ type: 'DELETE_WORKOUT', payload: response.data })
    }
  }
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong>{workout.load}</p>
      <p><strong>Reps:</strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutsDetails