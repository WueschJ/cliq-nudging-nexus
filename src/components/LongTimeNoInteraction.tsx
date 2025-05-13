
import { formatDistance } from "date-fns";
import { Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Person {
  id: string;
  name: string;
  lastInteractionDate: string; // ISO format date string
}

interface LongTimeNoInteractionProps {
  people: Person[];
  onAccept: (id: string) => void;
}

const LongTimeNoInteraction = ({ people, onAccept }: LongTimeNoInteractionProps) => {
  return (
    <ul className="space-y-3">
      {people.length === 0 ? (
        <li className="text-gray-500 text-center py-4">No people with long time no interaction</li>
      ) : (
        people.map((person) => {
          const timeSince = formatDistance(
            new Date(person.lastInteractionDate),
            new Date(),
            { addSuffix: true }
          );
          
          return (
            <li 
              key={person.id}
              className="flex justify-between items-center p-3 rounded-md border bg-white transition-all duration-300"
            >
              <div>
                <span className="font-medium block">{person.name}</span>
                <span className="text-xs text-gray-500 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Last interaction {timeSince}
                </span>
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => onAccept(person.id)}
                className="border-green-400 text-green-600 hover:bg-green-50"
              >
                <Check className="h-4 w-4 mr-1" />
                Accept
              </Button>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default LongTimeNoInteraction;
