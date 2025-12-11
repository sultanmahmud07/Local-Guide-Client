"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShieldCheck, User, Mail, Lock, Phone, MapPin, CheckCircle } from "lucide-react";
import { createAdmin } from "@/services/auth/registerUser";


export default function CreateAdminForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);
    
    // Prepare Payload (exclude confirmPassword)
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      role: "ADMIN", // Explicitly setting role
    };

    try {
      const result = await createAdmin(payload);

      if (result.success) {
        toast.success("New Admin created successfully!");
        // Optional: Small delay for user to read success message
        setTimeout(() => {
             router.push("/admin/dashboard/admin-management");
        }, 1000);
      } else {
        toast.error(result.message || "Failed to create admin");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-[80vh] py-10">
      <Card className="w-full max-w-2xl shadow-lg border-gray-100">
        <CardHeader className="bg-gray-50/50 pb-8 border-b">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-orange-600" />
            </div>
            <div>
                <CardTitle className="text-xl">Create New Administrator</CardTitle>
                <CardDescription>
                    Grant system access to a new team member. They will have permissions to manage users and bookings.
                </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-8">
            
            {/* Identity Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4" /> Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                        <Input 
                            id="name" name="name" 
                            placeholder="e.g. Sultan Mahmud" 
                            required 
                            value={formData.name} onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input 
                                id="email" name="email" type="email" 
                                className="pl-9"
                                placeholder="admin@example.com" 
                                required 
                                value={formData.email} onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Security Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Security
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                        <Input 
                            id="password" name="password" type="password" 
                            placeholder="******" 
                            required 
                            value={formData.password} onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                        <Input 
                            id="confirmPassword" name="confirmPassword" type="password" 
                            placeholder="******" 
                            required 
                            value={formData.confirmPassword} onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <Separator />

            {/* Contact Details (Optional) */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input 
                                id="phone" name="phone" 
                                className="pl-9"
                                placeholder="+880..." 
                                value={formData.phone} onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                            id="address" name="address" 
                            placeholder="City, Country" 
                            value={formData.address} onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

          </CardContent>

          <CardFooter className="flex justify-end gap-4 bg-gray-50/50 py-4 border-t mt-4">
            <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isSubmitting}
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                    </>
                ) : (
                    <>
                        Create Admin <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}