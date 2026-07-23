
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';




export default function Login02() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-balance text-center font-semibold text-foreground text-xl">
            Log in or create account
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
              <Input
                autoComplete="password"
                className="mt-2"
                id="password-login-02"
                name="password-login-02"
                placeholder="**************"
                type="password"
              />
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
