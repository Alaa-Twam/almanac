import { Alert, Button } from '@mui/material'

interface ErrorAlertProps {
  message: string
  onRetry?: () => void
}

function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <Alert
      severity="error"
      action={
        onRetry ? (
          <Button color="inherit" size="small" onClick={onRetry}>
            Try again
          </Button>
        ) : undefined
      }
    >
      {message}
    </Alert>
  )
}

export default ErrorAlert
