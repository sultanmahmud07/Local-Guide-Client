// components/bookings/ReviewCard.tsx
import { Star } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn components

// Assuming the structure of your review data
interface IReview {
  rating: number;
  comment: string;
  user: {
    name: string;
    email: string;
    // Assume you have an image URL for the user profile, or use a default
    profileImage?: string; 
  };
  createdAt: string; // The date the review was created
}

interface ReviewCardProps {
  review: IReview;
}

const MAX_RATING = 5;

// Helper to render star icons
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= MAX_RATING; i++) {
    // Fill the star if its index is less than or equal to the rating
    const isFilled = i <= rating;
    stars.push(
      <Star 
        key={i} 
        className={`w-5 h-5 transition-colors ${
          isFilled ? 'text-green-600 fill-green-600' : 'text-gray-300 fill-gray-200'
        }`}
      />
    );
  }
  return <div className="flex space-x-0.5">{stars}</div>;
};


export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="shadow-lg border-2 border-green-100 bg-green-50/50">
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
          <Star className="w-5 h-5 mr-2 text-green-600 fill-green-600" />
          Your Tour Review
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Reviewer Info and Date */}
        <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
                {/* Placeholder for user avatar */}
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                    {review?.user?.name?.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{review.user.name} (You)</p>
                    <p className="text-xs text-muted-foreground">{review.user.email}</p>
                </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
                Reviewed on {format(new Date(review.createdAt), "MMM dd, yyyy")}
            </p>
        </div>
        
        {/* Rating Display */}
        <div className="flex items-center space-x-3">
            {renderStars(review.rating)}
            <span className="text-lg font-bold text-gray-800">
                {review.rating}.0 / {MAX_RATING}
            </span>
        </div>

        {/* Comment */}
        <div className="p-4 bg-white border rounded-lg">
            <p className="italic text-gray-700 leading-relaxed">
                {review.comment}
            </p>
        </div>
        
      </CardContent>
    </Card>
  );
}