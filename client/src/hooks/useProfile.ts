import { useQuery } from '@tanstack/react-query';

import { UserService } from '@/services/user.service';

export function useProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => UserService.getProfile(),
  });

  return { data, isLoading };
}
