"use client"

import type React from "react"

interface DotButtonProps {
  selected: boolean
  onClick: () => void
}

export const DotButton: React.FC<DotButtonProps> = ({ selected, onClick }) => (
  <button className={`embla__dot ${selected ? "embla__dot--selected" : ""}`} type="button" onClick={onClick} />
)
