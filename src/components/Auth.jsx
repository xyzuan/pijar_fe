"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Icons } from "./ui/icon";
import {
  useLogoutMutation,
  useSigninMutation,
  useSignupMutation,
} from "@/redux/api/authApi";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logOut, setCredentials } from "@/redux/authSlices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useGetMeQuery } from "@/redux/api/meApi";
import useIsMobile from "@/utils/useIsMobile.hook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const cookies = new Cookies();

function Auth() {
  const [open, setOpen] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);
  const dispatch = useDispatch();

  const [logoutMutation] = useLogoutMutation();
  const { data } = useGetMeQuery();

  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (cookies.get("ACCESS-TOKEN")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {!isLogged ? (
            <Button className="md:w-fit w-full">Sign In</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {data?.data?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {data?.data?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={async () => {
                      logoutMutation();
                      dispatch(logOut());
                      window.location.href = "/";
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Authentication Panel</DialogTitle>
            <DialogDescription>Auth your own current account</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SiginForm handleModal={setOpen} />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      {!isLogged ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>Sign In</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Sign In</DrawerTitle>
              <DrawerDescription>
                Log in to your own current account
              </DrawerDescription>
            </DrawerHeader>
            <Tabs defaultValue="signin" className="px-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SiginForm className="px-4" handleModal={setOpen} />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {data?.data?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {data?.data?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={async () => {
                  logoutMutation();
                  dispatch(logOut());
                  window.location.href = "/";
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

function SiginForm({ className, handleModal }) {
  const [authLoading, setAuthLoading] = React.useState(false);
  const [requestLogin] = useSigninMutation();
  const dispatch = useDispatch();

  const formSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setAuthLoading(true);
    requestLogin({
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .unwrap()
      .then((res) => {
        const access_token = res.access_token.split("|")[1];
        console.log(access_token);
        dispatch(
          setCredentials({
            ACCESS_TOKEN: access_token,
          })
        );
        cookies.set("ACCESS-TOKEN", access_token, {
          path: "/",
        });
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error ${err?.status}: ${err?.data?.message}`);
      })
      .finally(() => {
        setAuthLoading(false);
        handleModal(false);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-3", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={authLoading}>
          {authLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Login
        </Button>
      </form>
    </Form>
  );
}

function SignupForm({ className }) {
  const [authLoading, setAuthLoading] = React.useState(false);
  const [requestSignup] = useSignupMutation();
  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setAuthLoading(true);
    requestSignup({
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    })
      .unwrap()
      .then(() => {
        toast.success(`Success create the account`, {
          description: "You can now use the account in Login Panel",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error ${err?.status}: ${err?.data?.message}`);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-3", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={authLoading}>
          {authLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create Account
        </Button>
      </form>
    </Form>
  );
}

export default Auth;
