import { IGuide } from '@/types/user.interface';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';   
import { MapPin, Globe, Star, Users } from 'lucide-react'; 

const GuideCard = ({ guide }: { guide: IGuide }) => {
    
    // Fallback for languages string
    const languagesString = guide.languages?.join(', ') || 'N/A';
    
    // Calculate full stars and determine if there's a half star
    const avgRating = guide.avg_rating || 0;
    const fullStars = Math.floor(avgRating);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hasHalfStar = avgRating - fullStars >= 0.25 && avgRating - fullStars < 0.75;
    
    // Get the first location or use a fallback
    const guideLocation = guide.address || 'Global';

    // Helper to render star icons
    const renderStars = () => {
        const stars = [];
        let currentRating = avgRating;

        for (let i = 0; i < 5; i++) {
            if (currentRating >= 1) {
                // Full star
                stars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
                currentRating--;
            } else if (currentRating > 0 && currentRating < 1) {
                // Half star (visually represented as a mostly empty star for simplicity)
                stars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-gray-300" />);
                currentRating = 0;
            } else {
                // Empty star
                stars.push(<Star key={i} className="w-4 h-4 text-gray-300 fill-gray-200" />);
            }
        }
        return <div className="flex items-center">{stars}</div>;
    };


    return (
        <article
            key={guide._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border border-gray-100"
        >
            {/* Image & Featured Badge */}
            <div className="relative w-full h-56">
                <Image
                    src={guide?.picture ? guide.picture :  "/default.png"}
                    alt={guide.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                />
                
                {/* Featured Badge */}
                {guide.isFeatured && (
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white font-semibold">
                        ⭐ Featured
                    </Badge>
                )}

                {/* Wishlist Button */}
                {/* <button
                    type="button"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md transition-colors hover:bg-white"
                    aria-label="Save guide"
                >
                    <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
                </button> */}
            </div>

            {/* Content */}
            <div className="flex-1 px-4 pt-4 pb-3 space-y-2">
                
                {/* Name and Rate */}
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                        {guide.name}
                    </h3>
                    {guide.guideProfile?.dailyRate && (
                        <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-xs font-bold px-3 p-1">
                            ${guide.guideProfile.dailyRate} / Day
                        </Badge>
                    )}
                </div>

                {/* Rating & Review Count */}
                <div className="flex items-center gap-2 text-sm">
                    {renderStars()}
                    <span className="text-gray-800 font-bold">
                        {avgRating.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                        ({guide.review_count || 0} reviews)
                    </span>
                </div>
                
                <Separator className="my-2" /> {/* Use a visual separator */}

                {/* Location & Languages */}
                <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <p className="truncate" title={guideLocation}>Based in <span className="font-medium">{guideLocation}</span></p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-green-600" />
                        <p className="truncate" title={languagesString}>Speaks: <span className="font-medium">{languagesString}</span></p>
                    </div>
                    
                    {/* Expertise/Skills */}
                    {guide.guideProfile?.expertise?.length && (
                        <div className="flex items-center gap-2">
                             <Users className="w-4 h-4 text-green-600" />
                             <p className="truncate">Expert in: <span className="font-medium">{guide.guideProfile.expertise.slice(0, 2).join(', ')}{guide.guideProfile.expertise.length > 2 ? '...' : ''}</span></p>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 flex items-center justify-between gap-3 border-t">
                <Link href={`/view-guide/${guide._id}`} className="flex-1">
                    <Button variant="outline" className="w-full cursor-pointer text-green-600 border-green-600 hover:bg-green-50">
                        View Profile
                    </Button>
                </Link>
                <Link href={`/message/${guide._id}`} className="flex-1">
                    <Button className="w-full cursor-pointer bg-secondary hover:bg-green-700">
                        Message
                    </Button>
                </Link>
            </div>
        </article>
    );
}

// You might need to import the Separator component from shadcn/ui
const Separator = ({ className = '' }) => <div className={`h-px bg-gray-200 ${className}`} />;

export default GuideCard;