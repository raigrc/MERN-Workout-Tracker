import { useEffect, useState } from "react"
import axios from 'axios'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//components
import WorkoutsDetails from "../components/WorkoutsDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/workouts')
        // const data = await response.data

        if (response.status === 200) {
          dispatch({ type: 'SET_WORKOUTS', payload: response.data })

        } else {
          console.error("Error fetching response:", response.statusText)
        }
      } catch (error) {
        console.error("Error fetching data:", error.message)
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutsDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home