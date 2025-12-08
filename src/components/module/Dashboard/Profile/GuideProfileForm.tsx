/* eslint-disable react-hooks/set-state-in-effect */
// components/profile/GuideProfileForm.tsx
'use client';

import {  UserInfo } from '@/types/user.interface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';

// Note: GuideProfile fields (expertise, dailyRate) are often nested under user.guideProfile.
// However, for simplified form data handling with FormData, we'll keep them flattened 
// here and assume the backend handles the nesting update.

interface GuideFormProps {
    user: UserInfo;
    isEditing: boolean;
    isSubmitting: boolean;
    onSave: (data: Partial<UserInfo>) => void;
    onCancel: () => void;
}

export default function GuideProfileForm({ user, isEditing, isSubmitting, onSave, onCancel }: GuideFormProps) {
    
    // Safely initialize state, including nested guideProfile fields
    const initialLanguagesString = Array.isArray(user.languages) ? user.languages.join(', ') : '';
    const initialExpertiseString = Array.isArray(user.guideProfile?.expertise) ? user.guideProfile.expertise.join(', ') : '';

    const [form, setForm] = useState({
        name: user.name,
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        languages: initialLanguagesString,
        expertise: initialExpertiseString,
        dailyRate: user.guideProfile?.dailyRate?.toString() || '',
    });

    // Effect to reset form when user data or editing state changes
    useEffect(() => {
        const newLanguagesString = Array.isArray(user.languages) ? user.languages.join(', ') : '';
        const newExpertiseString = Array.isArray(user.guideProfile?.expertise) ? user.guideProfile.expertise.join(', ') : '';

        setForm({
            name: user.name,
            phone: user.phone || '',
            address: user.address || '',
            bio: user.bio || '',
            languages: newLanguagesString,
            expertise: newExpertiseString,
            dailyRate: user.guideProfile?.dailyRate?.toString() || '',
        });
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Prepare data for saving
        const dataToSave: Partial<UserInfo> = {
            name: form.name,
            phone: form.phone,
            address: form.address,
            bio: form.bio,
            // Convert comma-separated strings back to arrays
            languages: form.languages.split(',').map(lang => lang.trim()).filter(lang => lang.length > 0),
            // The backend must handle the nested update for guideProfile.expertise
            guideProfile: {
                expertise: form.expertise.split(',').map(exp => exp.trim()).filter(exp => exp.length > 0),
                dailyRate: parseFloat(form.dailyRate) || undefined,
            }
            // Note: If you send `guideProfile` as a JSON string in `formData`, 
            // you'll need to stringify the whole `guideProfile` object here.
        };

        onSave(dataToSave);
    };

    const renderField = (label: string, name: keyof typeof form, type: 'text' | 'tel' | 'textarea' | 'number') => {
        const currentValue = form[name];

        if (!isEditing) {
            return (
                <div className="py-2">
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <p className="text-lg font-semibold text-gray-800">{currentValue || 'N/A'}</p>
                </div>
            );
        }

        // Editing mode
        return (
            <div className="space-y-1">
                <Label htmlFor={name}>{label}</Label>
                {type === 'textarea' ? (
                    <Textarea
                        id={name}
                        name={name}
                        value={currentValue}
                        onChange={handleChange}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                        rows={4}
                        disabled={isSubmitting}
                    />
                ) : (
                    <Input
                        id={name}
                        name={name}
                        type={type}
                        value={currentValue}
                        onChange={handleChange}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                        disabled={isSubmitting}
                    />
                )}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* === General Details === */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField('Full Name', 'name', 'text')}
                    {renderField('Phone Number', 'phone', 'tel')}
                </div>
                {renderField('Address', 'address', 'text')}
            </section>

            <Separator />

            {/* === Guide Professional Details === */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Guide Profile</h3>
                
                {renderField('Daily Rate ($)', 'dailyRate', 'number')}
                
                {/* Bio */}
                {renderField('Bio (Your Story)', 'bio', 'textarea')}

                {/* Languages */}
                <div className="space-y-1">
                    {renderField('Languages (Comma Separated)', 'languages', 'text')}
                    <p className="text-xs text-muted-foreground">e.g., English, Japanese, French</p>
                </div>

                {/* Expertise */}
                <div className="space-y-1">
                    {renderField('Expertise/Niches (Comma Separated)', 'expertise', 'text')}
                    <p className="text-xs text-muted-foreground">e.g., History, Food, Hiking, Photography</p>
                </div>
            </section>

            {/* === Action Buttons (Only visible in Edit Mode) === */}
            {isEditing && (
                <div className="flex justify-end space-x-4 pt-4">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Check className="w-4 h-4 mr-2" />
                        )}
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            )}
        </form>
    );
}