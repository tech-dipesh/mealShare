interface FoodStatusProps {
  status: 'Claimed' | 'Available'
}

const FoodStatus = ({ status }: FoodStatusProps) => {
  const isClaimed = status === 'Claimed'
  return (
    <span className={`px-3 py-1 text-xs rounded-full ${isClaimed ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
      {isClaimed ? 'Claimed' : 'Available'}
    </span>
  )
}

export default FoodStatus
