"use client";

import { LoginType, loginSchema } from "@/lib/validators/login-form";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginForm: FC = ({}) => {
  return (
    <div className="mx-auto flex w-[400px] flex-col justify-center items-center space-y-6 rounded-lg md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-6 sm:p-8">
        <Tabs defaultValue="student" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">STUDENT</TabsTrigger>
            <TabsTrigger value="staff">STAFF</TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <CustomForm entityType="student" />
          </TabsContent>
          <TabsContent value="staff">
            <CustomForm entityType="staff" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const CustomForm = ({ entityType }: { entityType: "student" | "staff" }) => {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: async () => {
      const payload: LoginType = form.getValues();
      console.log("💪", entityType);
      const { data } = await axios.post(
        `${BASE_URL}/auth/login/${entityType}`,
        payload
      );
      //validation credentials
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            title: "Invalid Credentials",
            description: "Please enter valid credentials",
            variant: "destructive",
          });
        } else {
          return toast({
            title: "Something went wrong",
            description: "Please try again later",
          });
        }
      }
    },
    onSuccess: async () => {
      toast({
        title: "Welcome",
        description: "Login Successfully",
      });
      router.push("/dashboard");
    },
  });
  return (
    <div className="bg-background h-full p-5 pb-8 rounded-md space-y-8 border border-border">
      <div className="text-center space-y-3">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-primary">
          Sign in to your account
        </h1>
        <p className="text-sm text-secondary">
          Enter your <span className="font-bold uppercase">{entityType}</span>{" "}
          credentials below to login
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => onSubmit())}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="code..." {...field} />
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
                  <Input placeholder="password..." type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
            size="lg"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
