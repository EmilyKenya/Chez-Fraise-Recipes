
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  const handleAuth = async (email: string, password: string, isSignUp: boolean) => {
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      
      toast({
        title: isSignUp ? "Account created!" : "Welcome back!",
        description: isSignUp 
          ? "Your account has been created successfully." 
          : "You have been signed in successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const AuthFormContent = ({ isSignUp }: { isSignUp: boolean }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleAuth(email, password, isSignUp);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>
    );
  };

  return (
    <Card className="w-full bg-white/10 backdrop-blur-md border-white/20">
      <CardContent className="p-6">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 mb-6">
            <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <AuthFormContent isSignUp={false} />
          </TabsContent>
          <TabsContent value="signup">
            <AuthFormContent isSignUp={true} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
