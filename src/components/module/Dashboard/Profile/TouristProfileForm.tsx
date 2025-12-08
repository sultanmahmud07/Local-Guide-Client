/* eslint-disable react-hooks/set-state-in-effect */
import { UserInfo } from '@/types/user.interface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';


interface TouristFormProps {
  user: UserInfo;
  isEditing: boolean;
  isSubmitting: boolean; // Added for loading state
  onSave: (data: Partial<UserInfo>) => void;
  onCancel: () => void;
}

export default function TouristProfileForm({ user, isEditing, isSubmitting, onSave, onCancel }: TouristFormProps) {
  
  // Helper to safely get string representation of array
  const initialLanguagesString = Array.isArray(user.languages) ? user.languages.join(', ') : '';

  // Initialize form state with user data
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone || '',
    address: user.address || '',
    bio: user.bio || '', 
    languages: initialLanguagesString, 
  });

  // Effect to reset form if editing state changes or user prop updates
  useEffect(() => {
    const newLanguagesString = Array.isArray(user.languages) ? user.languages.join(', ') : '';
    setForm({
      name: user.name,
      phone: user.phone || '',
      address: user.address || '',
      bio: user.bio || '',
      languages: newLanguagesString,
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSave: Partial<UserInfo> = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      bio: form.bio,
      // Convert comma-separated string back to array
      languages: form.languages.split(',').map(lang => lang.trim()).filter(lang => lang.length > 0),
    };
    console.log(dataToSave)
    onSave(dataToSave);
  };

  const renderField = (label: string, name: keyof typeof form, type: 'text' | 'tel' | 'textarea') => {
    const currentValue = form[name];

    if (!isEditing) {
      return (
        <div className="py-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold text-gray-800">{currentValue || 'N/A'}</p>
        </div>
      );
    }

    // Editing mode: Render Input/Textarea
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
        <h3 className="text-xl font-semibold border-b pb-2">General Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Full Name', 'name', 'text')}
          {renderField('Phone Number', 'phone', 'tel')}
        </div>
        {renderField('Address', 'address', 'text')}
      </section>

      <Separator />

      {/* === Biographical & Language Details === */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Biographical Details</h3>
        {renderField('Bio (About Me)', 'bio', 'textarea')}
        
        <div className="space-y-1">
          {renderField('Languages (Comma Separated)', 'languages', 'text')}
          <p className="text-xs text-muted-foreground">e.g., English, Spanish, Bengali (max 5)</p>
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