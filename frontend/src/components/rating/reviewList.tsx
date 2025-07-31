import React from "react"

export default function ReviewList({ reviews }: { reviews: { user: string, comment: string, rating: number }[] }) {
  return (
    <div className="space-y-3 mt-4">
      {reviews.map((r, i) => (
        <div key={i} className="border-b pb-2">
          <div className="flex justify-between">
            <span className="font-semibold">{r.user}</span>
            <span className="text-yellow-400">{'★'.repeat(r.rating)}</span>
          </div>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  )
}