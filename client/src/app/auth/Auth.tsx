'use client';

import { Eye, EyeClosed } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ButtonActive } from '@/components/ui/button/ButtonActive';
import { Field } from '@/components/ui/input/Field';

import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@/constants/user.constants';

import { TAuthInput, TAuthMethod } from '@/types/auth.types';

import studentIcon from '@/assets/student.png';

import { PAGES } from '@/config/urls.config';

import { useAuthMutation } from '@/hooks/useAuthMutation';

import { getErrorMessage } from '@/api/get-error-message';

export const Auth = () => {
  const [authMethod, setAuthMethod] = useState<TAuthMethod>('login');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthInput>({ mode: 'onBlur' });

  const { replace } = useRouter();

  const { mutate, isSuccess, error } = useAuthMutation(authMethod);

  const onSubmit: SubmitHandler<TAuthInput> = data => {
    mutate(data);
  };

  const changeAuthMethod = () => {
    setAuthMethod(authMethod === 'login' ? 'register' : 'login');
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPasswordVisible(prev => !prev);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        authMethod === 'login'
          ? 'Logged in successfully'
          : 'Registered successfully',
      );
      replace(PAGES.QUIZZES);
    }
  }, [isSuccess]);

  return (
    <section className="flex justify-center">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-white p-12">
        <h1 className="text-8xl">
          Ace<span className="text-primary">It</span>
        </h1>
        <h2>{authMethod === 'login' ? 'Welcome back!' : 'Welcome!'}</h2>
        <form
          id="auth"
          className="flex w-full flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field
            className="w-full"
            inputClassname="border-b-0"
            id="username"
            label="username"
            {...register('username', {
              required: 'Username must not be empty',
              minLength: {
                value: USERNAME_MIN_LENGTH,
                message: `Username must be at least ${USERNAME_MIN_LENGTH} characters long`,
              },
              maxLength: {
                value: USERNAME_MAX_LENGTH,
                message: `Username must be no more than ${USERNAME_MAX_LENGTH} characters long`,
              },
            })}
          />
          <div className="relative w-full">
            <Field
              className="w-full"
              inputClassname="pr-16"
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              label="password"
              {...register('password', {
                required: 'Password must not be empty',
                minLength: {
                  value: PASSWORD_MIN_LENGTH,
                  message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
                },
              })}
            />
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2"
              type="button"
              onMouseDown={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <Eye className="text-gray-500" strokeWidth="1.5" />
              ) : (
                <EyeClosed className="text-gray-500" strokeWidth="1.5" />
              )}
            </button>
          </div>
          <p className="my-4 text-sm text-error">
            {(errors.username && errors.username.message) ||
              (errors.password && errors.password.message) ||
              (error && getErrorMessage(error))}
          </p>
          <ButtonActive className="w-2/3 px-6 py-3">
            {authMethod === 'login' ? 'Login' : 'Register'}
          </ButtonActive>
          <div className="mt-4 flex gap-1">
            <p className="font-light">
              {authMethod === 'login' ? 'New here?' : 'Already registered?'}
            </p>
            <button
              className="underline"
              type="button"
              onClick={changeAuthMethod}
            >
              {authMethod === 'login' ? 'Register' : 'Login'}
            </button>
          </div>
        </form>
      </div>
      <div className="hidden h-screen w-full items-center justify-center bg-gray-50 lg:flex">
        <Image src={studentIcon} alt="student hat" className="w-1/2" priority />
      </div>
    </section>
  );
};
