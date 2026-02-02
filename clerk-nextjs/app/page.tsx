 'use client'

import { useState } from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

type CoffeeDate = {
  id: number
  name: string
  date: string
  time: string
  location: string
  notes: string
}

function CoffeeApp() {
  const [coffeeDates, setCoffeeDates] = useState<CoffeeDate[]>([])
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    notes: '',
  })

  function updateField(field: string, value: string) {
    setForm({ ...form, [field]: value })
  }

  function clearForm() {
    setForm({
      name: '',
      date: '',
      time: '',
      location: '',
      notes: '',
    })
  }

  function addCoffeeDate() {
    if (!form.name || !form.date || !form.time || !form.location) {
      alert('Please fill in all required fields!')
      return
    }

    const newDate: CoffeeDate = {
      id: Date.now(),
      ...form,
    }

    const updated = [...coffeeDates, newDate].sort(
      (a, b) =>
        new Date(a.date + ' ' + a.time).getTime() -
        new Date(b.date + ' ' + b.time).getTime()
    )

    setCoffeeDates(updated)
    clearForm()
  }

  function deleteCoffeeDate(id: number) {
    setCoffeeDates(coffeeDates.filter((d) => d.id !== id))
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function formatTime(timeString: string) {
    const [h, m] = timeString.split(':')
    const hour = parseInt(h)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const display = hour % 12 || 12
    return `${display}:${m} ${ampm}`
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <main className="container">
    <header className="header-row">
  <div className="title-row">
    <div className="coffee-icon">☕</div>
    <h1>Coffee Time</h1>
  </div>

  <p className="subtitle">Schedule your next coffee catch-up</p>
</header>


      <div className="card">
        <div className="input-group">
          <label>Who are you meeting?</label>
          <input value={form.name} onChange={e => updateField('name', e.target.value)} />
        </div>

        <div className="input-group">
          <label>When?</label>
          <input type="date" min={today} value={form.date}
            onChange={e => updateField('date', e.target.value)} />
        </div>

        <div className="input-group">
          <label>What time?</label>
          <input type="time" value={form.time}
            onChange={e => updateField('time', e.target.value)} />
        </div>

        <div className="input-group">
          <label>Where?</label>
          <input value={form.location}
            onChange={e => updateField('location', e.target.value)} />
        </div>

        <div className="input-group">
          <label>Notes</label>
          <textarea value={form.notes}
            onChange={e => updateField('notes', e.target.value)} />
        </div>

        <div className="button-group">
          <button className="btn-primary" onClick={addCoffeeDate}>
            Schedule Coffee
          </button>
          <button className="btn-secondary" onClick={clearForm}>
            Clear
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Upcoming Coffee Dates</h2>

        {coffeeDates.length === 0 && (
          <div className="empty-state">
            No coffee dates scheduled yet. Add one above!
          </div>
        )}

        {coffeeDates.map((c) => (
          <div key={c.id} className="schedule-item">
            <div>
              <h3>Coffee with {c.name}</h3>
              <div className="schedule-meta">
                <span>📅 {formatDate(c.date)}</span>
                <span>🕐 {formatTime(c.time)}</span>
                <span>📍 {c.location}</span>
              </div>
              {c.notes && <p>{c.notes}</p>}
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteCoffeeDate(c.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <>
      <SignedOut>
        <main style={{ padding: 40 }}>
          <h1>You are signed out</h1>
          <SignInButton />
          <SignUpButton />
        </main>
      </SignedOut>

      <SignedIn>
        <CoffeeApp />
      </SignedIn>
    </>
  )
}




