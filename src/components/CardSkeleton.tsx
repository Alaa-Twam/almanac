import { Card, CardContent, Skeleton } from '@mui/material'

function CardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={220} />
      <CardContent>
        <Skeleton width="60%" />
        <Skeleton width="40%" />
        <Skeleton />
        <Skeleton />
        <Skeleton width="80%" />
      </CardContent>
    </Card>
  )
}

export default CardSkeleton
