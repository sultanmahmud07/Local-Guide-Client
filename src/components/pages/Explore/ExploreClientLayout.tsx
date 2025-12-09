/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, DollarSign, Globe, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import GuideCard from '@/components/module/Guid/GuideCard/GuideCard';
import TourCard from '@/components/module/Tour/TourCard';

interface ExploreClientLayoutProps {
    initialResults: any[];
    initialMeta: any;
    initialType: string;
}

// Filter Data Structure (Simplified)
const CATEGORIES = ["Food", "History", "Adventure", "Art"];

// Helper component for the Toggle (simplified)
const ToggleButton = ({ type, currentType, setType }: { type: string; currentType: string; setType: (type: string) => void }) => (
    <Button 
        variant={currentType === type ? 'default' : 'outline'}
        onClick={() => setType(type)}
        className={currentType === type ? "bg-green-600 hover:bg-green-700" : "border-gray-300 hover:bg-gray-50"}
    >
        {type.charAt(0).toUpperCase() + type.slice(1)}s
    </Button>
);


export default function ExploreClientLayout({ initialResults, initialMeta, initialType }: ExploreClientLayoutProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // --- State Initialization ---
    const [searchType, setSearchType] = useState(initialType);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

    // Price Filter (Min/Max)
    const priceParam = searchParams.get('priceRange') || ''; // e.g., "50-200"
    const [minPrice, setMinPrice] = useState(priceParam.split('-')[0] || '');
    const [maxPrice, setMaxPrice] = useState(priceParam.split('-')[1] || '');

    // Category Filter (e.g., "Adventure")
    const [category, setCategory] = useState(searchParams.get('category') || '');
    
    // Language Filter (e.g., "English")
    const [languageInput, setLanguageInput] = useState(searchParams.get('language') || '');
    // --- End State Initialization ---

    // Sync state with URL parameter on navigation
    useEffect(() => {
        const currentSearch = searchParams.get('search') || "";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (searchQuery !== currentSearch) setSearchQuery(currentSearch);
        
        const price = searchParams.get('priceRange') || '';
        const [min, max] = price.split('-');
        setMinPrice(min || '');
        setMaxPrice(max || '');
        
        const currentCategory = searchParams.get('category') || "";
        if (category !== currentCategory) setCategory(currentCategory);

        const currentLanguage = searchParams.get('language') || "";
        if (languageInput !== currentLanguage) setLanguageInput(currentLanguage);

    }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps


    // --- Core URL Update Logic ---
    const updateUrlParams = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        
        // 1. Set/Delete new parameters
        Object.keys(newParams).forEach(key => {
            const value = newParams[key];
            if (value && value.trim()) {
                params.set(key, value.trim());
            } else {
                params.delete(key);
            }
        });
        
        // 2. Navigate and trigger re-fetch on the server
        router.push(`?${params.toString()}`);
    };

    // Handler for the main search bar (Destination/City)
    const handleMainSearch = () => {
        updateUrlParams({ search: searchQuery });
    };

    // Handler for the Type Toggle (Tour/Guide)
    const handleTypeToggle = (type: string) => {
        setSearchType(type);
        updateUrlParams({ type: type, search: searchQuery }); 
    };

    // Handler for general filter changes (used by Checkbox)
    const handleFilterChange = (key: string, value: string) => {
        updateUrlParams({ [key]: value });
    };

    // Handler for Price submission (on Add button click or blur)
    const handlePriceSubmit = () => {
        // Construct the "min-max" format
        const min = minPrice.trim();
        const max = maxPrice.trim();
        
        if (min || max) {
            updateUrlParams({ 'priceRange': `${min}-${max}` });
        } else {
            updateUrlParams({ 'priceRange': null });
        }
    };
    
    // Handler for Language submission (on Add button click or blur/Enter)
    const handleLanguageSubmit = () => {
        if (languageInput.trim()) {
            updateUrlParams({ 'language': languageInput });
        } else {
             updateUrlParams({ 'language': null });
        }
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Check if the focus is on the main search bar or language bar
            if (e.currentTarget.id === 'main-search') {
                handleMainSearch();
            } else if (e.currentTarget.id === 'language-input') {
                handleLanguageSubmit();
            }
        }
    };
    
    return (
        <div className="flex flex-col">
            
            {/* 1. Small Top Banner/Search Section */}
            <div className="bg-gray-800 py-10 text-white shadow-xl pt-20 md:pt-32">
                <div className="main-container flex flex-col md:flex-row items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold">
                        Explore {searchType.charAt(0).toUpperCase() + searchType.slice(1)}s
                    </h1>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-lg">
                        <Input
                            id="main-search"
                            type="text"
                            placeholder="Destination / City (e.g., Dhaka)"
                            className="w-full pl-4 pr-24 py-3 text-base rounded-lg text-white bg-white/10 border-gray-600 placeholder:text-gray-300 focus:bg-white focus:text-gray-800 transition"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            size="sm"
                            onClick={handleMainSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-green-600 hover:bg-green-700"
                        >
                            <Search className="h-4 w-4 mr-1" />
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Layout */}
            <div className="main-container py-10">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-2 p-1 border rounded-lg bg-gray-50">
                        <ToggleButton type="tour" currentType={searchType} setType={handleTypeToggle} />
                        <ToggleButton type="guide" currentType={searchType} setType={handleTypeToggle} />
                    </div>
                    <p className="text-sm text-gray-600">
                         Showing {initialResults.length} results
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* A. Sidebar Filters (Col 1) */}
                    <Card className="lg:col-span-1 h-fit sticky top-24 shadow-xl">
                        <CardHeader className='p-4 border-b'>
                            <CardTitle className='text-xl flex items-center gap-2'><Filter className='w-5 h-5 text-green-600' /> Filters</CardTitle>
                        </CardHeader>
                        <CardContent className='p-4 space-y-5'>
                            
                            {/* --- Price Range Filter (Min/Max) --- */}
                            <div className="space-y-2">
                                <Label className="font-semibold text-gray-800 flex items-center gap-1">
                                    <DollarSign className='w-4 h-4 text-green-600' /> Price Range
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Input 
                                        type="number" 
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-1/2"
                                        onBlur={handlePriceSubmit}
                                    />
                                    <span className='text-gray-400'>-</span>
                                    <Input 
                                        type="number" 
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-1/2"
                                        onBlur={handlePriceSubmit}
                                    />
                                    <Button 
                                        size="icon" 
                                        className='flex-shrink-0 bg-green-600 hover:bg-green-700'
                                        onClick={handlePriceSubmit}
                                    >
                                        <Plus className='w-4 h-4' />
                                    </Button>
                                </div>
                                {(minPrice || maxPrice) && (
                                    <p className='text-xs text-gray-500'>Current: ${minPrice || 0} to ${maxPrice || '∞'}</p>
                                )}
                            </div>

                            <Separator />
                            
                            {/* --- Category Filter (Shadcn Checkbox) --- */}
                            <div className="space-y-3">
                                <Label className="font-semibold text-gray-800 flex items-center gap-1">
                                    <MapPin className='w-4 h-4 text-green-600' /> Category
                                </Label>
                                <div className="space-y-2">
                                    {CATEGORIES.map(cat => (
                                        <div key={cat} className="flex items-center space-x-3">
                                            <Checkbox 
                                                id={cat} 
                                                checked={category === cat}
                                                onCheckedChange={() => 
                                                    handleFilterChange('category', category === cat ? '' : cat)
                                                }
                                                className='border-gray-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600'
                                            />
                                            <Label htmlFor={cat} className="font-normal cursor-pointer">{cat}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <Separator />

                            {/* --- Language Filter (With Add Button) --- */}
                            <div className="space-y-2">
                                <Label className="font-semibold text-gray-800 flex items-center gap-1">
                                    <Globe className='w-4 h-4 text-green-600' /> Language
                                </Label>
                                <div className='flex gap-2'>
                                    <Input 
                                        id="language-input"
                                        type="text" 
                                        placeholder="English, Spanish"
                                        value={languageInput}
                                        onChange={(e) => setLanguageInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleLanguageSubmit()}
                                    />
                                     <Button 
                                        size="icon" 
                                        className='flex-shrink-0 bg-green-600 hover:bg-green-700'
                                        onClick={handleLanguageSubmit}
                                    >
                                        <Plus className='w-4 h-4' />
                                    </Button>
                                </div>
                                {languageInput && (
                                    <p className='text-xs text-gray-500'>Current: {languageInput}</p>
                                )}
                            </div>

                            <Button 
                                variant="outline" 
                                className='w-full border-gray-300 text-gray-600 hover:bg-gray-50 mt-6'
                                onClick={() => router.push('/explore')} // Reset button
                            >
                                Reset Filters
                            </Button>

                        </CardContent>
                    </Card>

                    {/* B. Main Results Area (Cols 2-4) */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {initialResults.length > 0 ? (
                                initialResults.map((item: any) => (
                                    // Use the appropriate card component based on searchType
                                    searchType === 'guide' ? (
                                        <GuideCard key={item._id} guide={item} />
                                    ) : (
                                        <TourCard key={item._id} tour={item} />
                                    )
                                ))
                            ) : (
                                <div className="lg:col-span-3 text-center py-16 text-gray-500 border border-dashed rounded-lg">
                                    No {searchType}s found matching your criteria.
                                </div>
                            )}
                        </div>
                        {/* Pagination component would go here */}
                    </div>

                </div>
            </div>
        </div>
    );
}