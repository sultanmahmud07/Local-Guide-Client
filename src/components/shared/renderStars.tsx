// utils/renderStars.tsx (Create this helper file)
import { Star } from "lucide-react";

export const renderStars = (avgRating: number, size: number = 4) => {
    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    const stars = [];

    // Full Stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} className={`w-${size} h-${size} text-green-600 fill-green-600`} />);
    }
    
    // Half Star (for simplicity, we'll just use a slightly filled star or round)
    // Here, we just rely on rounding and adding an empty star if rating is not integer
    if (hasHalfStar) {
        stars.push(<Star key="half" className={`w-${size} h-${size} text-green-600 fill-green-300`} />); 
    }
    
    // Empty Stars
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-${i}`} className={`w-${size} h-${size} text-gray-300 fill-gray-200`} />);
    }

    return <div className="flex items-center space-x-0.5">{stars}</div>;
};