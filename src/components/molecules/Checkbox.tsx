import { useState } from 'react'

type CheckboxProps = {
  label: string
  init?: boolean
  onTrue?: () => void
  onFalse?: () => void
}

export default function Checkbox(props: CheckboxProps) {
  const { label, init, onTrue, onFalse } = props
  const [state, setState] = useState(init || false)

  const handleChange = () => {
    const nextState = !state

    if (nextState && onTrue) onTrue()
    if (!nextState && onFalse) onFalse()
    setState(nextState)
  }

  return (
    <label className="block cursor-pointer select-none rounded-full border border-gray-50 py-2 px-4 shadow-lg active:shadow-none">
      <input
        className="mr-2"
        type="checkbox"
        checked={state}
        onChange={() => handleChange()}
      />
      {label}
    </label>
  )
}
