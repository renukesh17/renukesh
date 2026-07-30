import { useState } from 'react';
import { Search, MapPin, Navigation, Clock, Phone, Globe, Filter } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent } from '@/src/components/ui/Card';
import { RecyclingCenter, WasteCategory } from '@/src/types';
import { motion } from 'motion/react';

const MOCK_CENTERS: RecyclingCenter[] = [
  {
    id: '1',
    name: 'GreenLife Recycling Hub',
    address: '452 Eco Blvd, San Francisco',
    distance: '1.2 miles',
    acceptedWaste: [WasteCategory.PLASTIC, WasteCategory.PAPER, WasteCategory.METAL],
    hours: '8:00 AM - 6:00 PM',
    status: 'Open',
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: '2',
    name: 'TechWaste Solutions',
    address: '89 Innovation Way, San Mateo',
    distance: '3.5 miles',
    acceptedWaste: [WasteCategory.E_WASTE, WasteCategory.HAZARDOUS],
    hours: '9:00 AM - 5:00 PM',
    status: 'Open',
    lat: 37.563,
    lng: -122.3255,
  },
  {
    id: '3',
    name: 'Organic Roots Composting',
    address: '12 Garden Ln, Oakland',
    distance: '5.8 miles',
    acceptedWaste: [WasteCategory.ORGANIC],
    hours: '7:00 AM - 4:00 PM',
    status: 'Closed',
    lat: 37.8044,
    lng: -122.2712,
  },
];

export function RecyclingMap() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCenters = MOCK_CENTERS.filter(center => 
    (searchTerm === '' || center.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === null || center.acceptedWaste.includes(selectedCategory as WasteCategory))
  );

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[600px] gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-emerald-900">Find Recycling Centers</h2>
          <p className="text-emerald-600/70">Locate specialized facilities near you for proper disposal.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
            <input
              type="text"
              placeholder="Search centers..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-6 overflow-hidden">
        {/* Map Placeholder */}
        <div className="flex-1 rounded-3xl bg-emerald-50 border border-emerald-100 overflow-hidden relative min-h-[300px]">
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.4194,37.7749,12,0/800x600?access_token=pk.eyJ1IjoiYWlzdHVkaW8iLCJhIjoiY2p4eHg0eHh4eHh4eHh4eHh4eHh4eHh4In0')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl border border-emerald-100 text-center max-w-xs">
              <MapPin className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-emerald-900">Interactive Map Interface</p>
              <p className="text-xs text-emerald-600/70 mt-1">Real-time location and directions will be enabled after Google Maps API integration.</p>
            </div>
          </div>
          
          {/* Animated Pins */}
          {filteredCenters.map((center, i) => (
            <motion.div
              key={center.id}
              className="absolute h-8 w-8 -translate-x-1/2 -translate-y-full"
              style={{ 
                left: `${30 + i * 15}%`, 
                top: `${40 + i * 10}%` 
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow text-[10px] font-bold text-emerald-900 border border-emerald-50">
                  {center.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center List */}
        <div className="w-full lg:w-96 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {filteredCenters.map((center) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="hover:border-emerald-400 cursor-pointer">
                <CardContent className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-emerald-900">{center.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      center.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {center.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-emerald-600/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-400" />
                      {center.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-emerald-400" />
                      {center.hours}
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-emerald-400" />
                      {center.distance}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {center.acceptedWaste.map(type => (
                      <span key={type} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <Phone className="h-3 w-3 mr-1" /> Call
                    </Button>
                    <Button size="sm" className="flex-1 text-xs">
                      <Navigation className="h-3 w-3 mr-1" /> Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {filteredCenters.length === 0 && (
            <div className="py-20 text-center text-emerald-600/40">
              <Search className="h-10 w-10 mx-auto mb-3" />
              <p>No centers found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
