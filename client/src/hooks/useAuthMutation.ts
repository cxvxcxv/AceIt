'use client';

import { useMutation } from '@tanstack/react-query';

import { TAuthInput, TAuthMethod } from '@/types/auth.types';

import { AuthService } from '@/services/auth/auth.service';

export function useAuthMutation(authMethod: TAuthMethod) {
  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: TAuthInput) => AuthService.auth(authMethod, data),
  });
}
