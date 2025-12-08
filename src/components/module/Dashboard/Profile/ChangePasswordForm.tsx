// components/auth/ChangePasswordForm.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Key, Check } from 'lucide-react';
import { toast } from 'sonner';
import { changePassword } from '@/services/auth/auth.service';

export default function ChangePasswordForm() {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const clientValidation = () => {
        const { oldPassword, newPassword, confirmNewPassword } = formData;
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return "All password fields are required.";
        }
        if (newPassword.length < 6) {
            return "New password must be at least 6 characters long.";
        }
        if (newPassword !== confirmNewPassword) {
            return "New password and confirmation do not match.";
        }
        if (oldPassword === newPassword) {
            return "New password cannot be the same as the old password.";
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = clientValidation();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);
        setError('');

        const payload = {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
        };

        try {
            const result = await changePassword(payload);

            if (result?.success) {
                toast.success(result.message || "Password changed successfully!");
                // Clear the form on success
                setFormData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
            } else {
                // Display server-side error (e.g., Incorrect old password)
                setError(result?.message || "Password change failed due to a server error.");
                toast.error(result?.message || "Password change failed.");
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
            toast.error("Network error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-lg mx-auto shadow-2xl border-t-4 border-t-green-600">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                    <Key className="w-6 h-6 mr-2 text-green-600" />
                    Change Your Password
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {error && (
                        <div className="text-sm text-red-600 border border-red-200 bg-red-50 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Label htmlFor="oldPassword">Current Password</Label>
                        <Input
                            id="oldPassword"
                            name="oldPassword"
                            type="password"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                        <Input
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            type="password"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                            <Check className="w-5 h-5 mr-2" />
                        )}
                        {isSubmitting ? 'Changing...' : 'Update Password'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}