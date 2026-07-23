'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-balance text-center font-semibold text-foreground text-xl">
            Log in
          </h2>
          <form action="#" className="mt-6 space-y-4" method="post">
            <div>
              <Label
                className="font-medium text-foreground text-sm dark:text-foreground"
                htmlFor="email-login-02"
              >
                Email
              </Label>
              <Input
                autoComplete="email"
                className="mt-2"
                id="email-login-02"
                name="email-login-02"
                placeholder="user@email.com"
                type="email"
              />
            </div>
            <div>
              <Label
                className="font-medium text-foreground text-sm dark:text-foreground"
                htmlFor="password-login-02"
              >
                Password
              </Label>
              <div className="relative mt-2">
                <Input
                  autoComplete="password"
                  className="pr-10"
                  id="password-login-02"
                  name="password-login-02"
                  placeholder="**************"
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button className="mt-4 w-full py-2 font-medium bg-green-500" type="submit">
              Sign in
            </Button>
          </form>

          <p className="mt-4 text-pretty text-muted-foreground text-xs dark:text-muted-foreground">
            By signing in, you agree to our{' '}
            <a className="underline underline-offset-4" href="#">
              terms of service
            </a>{' '}
            and{' '}
            <a className="underline underline-offset-4" href="#">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}