
import { formatDistance } from "date-fns";
import { Clock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Person {
  id: string;
  name: string;
  lastInteractionDate: string; // ISO format date string
  status?: "pending" | "accepted" | "rejected";
}

interface LongTimeNoInteractionProps {
  people: Person[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const LongTimeNoInteraction = ({ people, onAccept, onReject }: LongTimeNoInteractionProps) => {
  return (
    <ul className="space-y-3">
      {people.length === 0 ? (
        <li className="text-gray-500 text-center py-4">No people with long time no interaction</li>
      ) : (
        people.map((person) => {
          // Skip rendering if the status is rejected (for animation)
          if (person.status === "rejected") return null;
          
          const timeSince = formatDistance(
            new Date(person.lastInteractionDate),
            new Date(),
            { addSuffix: true }
          );
          
          return (
            <li 
              key={person.id}
              className={`flex justify-between items-center p-3 rounded-md border bg-white transition-all duration-300 ${
                person.status === "accepted" ? "bg-gray-100" : ""
              }`}
            >
              <div>
                <span className="font-medium block text-sm">{person.name}</span>
                <span className="text-xs text-gray-500 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Last interaction {timeSince}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => onReject(person.id)}
                  className="border-red-400 text-red-600 hover:bg-red-50 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Reject
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => onAccept(person.id)}
                  className="border-green-400 text-green-600 hover:bg-green-50 text-xs"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Accept
                </Button>
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default LongTimeNoInteraction;
