import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { MapPin, Home, Search, Phone, User } from "lucide-react";

export default function HousingPlatform() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const properties = [
    { id: 1, name: "2 Bedroom Apartment", location: "Cape Town", price: "R5,500", type: "Apartment", image: "/apartment1.jpg", contact: "082 123 4567" },
    { id: 2, name: "Townhouse in Sandton", location: "Johannesburg", price: "R8,000", type: "Townhouse", image: "/townhouse1.jpg", contact: "083 234 5678" },
    { id: 3, name: "Studio in Durban", location: "Durban", price: "R4,200", type: "Studio", image: "/studio1.jpg", contact: "084 345 6789" }
  ];

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (location === "" || property.location === location) &&
    (propertyType === "All" || property.type === propertyType)
  );

  const handleLogin = () => {
    setUser({ name: "John Doe" });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Affordable Housing & Rental Platform</h1>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <User size={20} />
            <span>{user.name}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button onClick={handleLogin}>Login</Button>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <Input 
          placeholder="Search by name..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={location} onChange={(e) => setLocation(e.target.value)}>
          <SelectItem value="">All Locations</SelectItem>
          <SelectItem value="Cape Town">Cape Town</SelectItem>
          <SelectItem value="Johannesburg">Johannesburg</SelectItem>
          <SelectItem value="Durban">Durban</SelectItem>
        </Select>
        <Select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <SelectItem value="All">All Types</SelectItem>
          <SelectItem value="Apartment">Apartment</SelectItem>
          <SelectItem value="Townhouse">Townhouse</SelectItem>
          <SelectItem value="Studio">Studio</SelectItem>
        </Select>
        <Button><Search size={20} /></Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProperties.map((property) => (
          <Card key={property.id}>
            <img src={property.image} alt={property.name} className="w-full h-40 object-cover rounded-t-2xl" />
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{property.name}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={16} /> {property.location}</p>
              <p className="font-bold mt-1">{property.price}</p>
              {isAuthenticated ? (
                <p className="text-sm text-gray-500 flex items-center gap-1"><Phone size={16} /> {property.contact}</p>
              ) : (
                <p className="text-sm text-red-500">Login to view contact details</p>
              )}
              <Button className="mt-2 w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
                                           }
    
