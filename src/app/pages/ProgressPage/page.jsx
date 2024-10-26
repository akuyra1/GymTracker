'use client'
import styles from '@/app/styles/progressPage.module.css'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProgressPage() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    // Fetch workouts from localStorage
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || []
    setWorkouts(storedWorkouts)
  }, [])

  return (
    <div className={styles.container}>
      <header className="flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">Your Progress</h1>
        <Link href="/">
          <button className={styles.backButton}>Back to Home</button>
        </Link>
      </header>
      
      <main className={styles.resultsGrid}>
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div key={index} className={styles.resultCard}>
              <h2>{workout.exercise}</h2>
              <p>Sets: {workout.sets}</p>
              <p>Reps: {workout.reps}</p>
              <p>Weight: {workout.weight} lbs</p>
              <p className={styles.workoutDate}>{workout.date}</p>
            </div>
          ))
        ) : (
          <p>No workouts logged yet.</p>
        )}
      </main>
    </div>
  )
}
