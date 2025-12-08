'use client';

import { IGuide } from '@/types/user.interface';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { MapPin, Clock, MessageSquare, Globe } from 'lucide-react';

export default function GuideContactCard({ guide }: { guide: IGuide }) {
    // Assuming guide.address contains the primary location
    const availableAreas = guide.address || 'Various locations';
    const languagesString = guide.languages?.join(', ') || 'N/A';
    const responseTime = "4 hours on average"; // Placeholder based on your image
    
    return (
        <Card className="shadow-xl sticky top-20">
            <CardContent className="p-4 space-y-4">
                
                {/* Guide Header */}
                <div className="flex items-center space-x-4 border-b pb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-green-500">
                        <Image
                            src={guide.picture || "/default.png"}
                            alt={guide.name}
                            width={64}
                            height={64}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-800">{guide.name}</h4>
                        <p className="text-xs text-muted-foreground">Guide</p>
                    </div>
                </div>

                {/* Details List */}
                <div className="space-y-3 text-sm text-gray-700">
                    
                    {/* Available Areas */}
                    <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-900">Available Areas</p>
                            <p className="text-xs">{availableAreas}</p>
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="flex items-start gap-3">
                        <Globe className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-900">Languages</p>
                            <p className="text-xs">{languagesString}</p>
                        </div>
                    </div>
                    
                    {/* Response Time */}
                    <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-900">Response Time</p>
                            <p className="text-xs">{responseTime}</p>
                        </div>
                    </div>
                    
                    {/* Availability Update (Placeholder) */}
                    <div className="flex items-start gap-3">
                        <MessageSquare className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
                        <div>
                            <p  className="text-xs font-semibold text-gray-900">Availability Updated</p>
                            <p className="text-xs">1 day ago</p>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}