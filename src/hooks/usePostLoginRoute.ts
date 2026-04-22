import { useAuth } from '@context/AuthContext'

type PostLoginRoute = '/onboarding/plans' | '/onboarding/business' | '/dashboard'

export const usePostLoginRoute = (): PostLoginRoute => {
  const { userProfile } = useAuth()

  if (!userProfile || userProfile.role === 'CLIENT') {
    return '/onboarding/plans'
  }
  if (userProfile.businessId === null) {
    return '/onboarding/business'
  }
  return '/dashboard'
}
