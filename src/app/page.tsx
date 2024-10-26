'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dumbbell, LineChart, Calendar, Clock } from "lucide-react"
import styles from '@/app/styles/progressPage.module.css'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    // Fetch workouts from localStorage
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || []
    setWorkouts(storedWorkouts)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Dumbbell className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">GymTracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#progress">
            Progress
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Fitness Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Easily log your workouts, track your progress, and achieve your fitness goals with GymTracker.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <LineChart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Visualize your fitness journey with detailed charts and graphs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Calendar className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Weekly & Monthly Views</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Analyze your workouts on a weekly or monthly basis.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Quick Logging</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Easily input your sets, reps, and weights in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Try It Out</h2>
            <WorkoutForm setWorkouts={setWorkouts} />
          </div>
        </section>

        {/* Progress Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="progress">
          <div className={styles.container}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Your Progress</h2>
            <div className={styles.resultsGrid}>
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
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 GymTracker. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function WorkoutForm({ setWorkouts }) {
  const [exercise, setExercise] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  // const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare workout data
    const workoutData = { exercise, sets, reps, weight, date: new Date().toLocaleDateString() }

    // Get existing workouts from localStorage or initialize an empty array
    const workouts = JSON.parse(localStorage.getItem('workouts')) || []

    // Add new workout to the list
    workouts.push(workoutData)

    // Save updated workout list to localStorage
    localStorage.setItem('workouts', JSON.stringify(workouts))

    // Update the state
    setWorkouts(workouts)

    // Reset form fields
    setExercise('')
    setSets('')
    setReps('')
    setWeight('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="exercise">Exercise</Label>
        <Select onValueChange={setExercise} value={exercise}>
          <SelectTrigger id="exercise">
            <SelectValue placeholder="Select an exercise" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bench-press">Bench Press</SelectItem>
            <SelectItem value="squat">Squat</SelectItem>
            <SelectItem value="deadlift">Deadlift</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="sets">Sets</Label>
        <Input
          id="sets"
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          placeholder="e.g., 3"
          required
        />
      </div>
      <div>
        <Label htmlFor="reps">Reps</Label>
        <Input
          id="reps"
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="e.g., 10"
          required
        />
      </div>
      <div>
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g., 135"
          required
        />
      </div>
      <Button type="submit" className="w-full">Log Workout</Button>
    </form>
  )
}
